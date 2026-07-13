/**
 * Backend do credenciamento do evento (Google Apps Script).
 *
 * Antes de publicar:
 * 1. Substitua SPREADSHEET_ID pelo ID da planilha.
 * 2. Substitua BASE_VALIDATION_URL pela URL publica de /evento/checkin.
 * 3. Em "Configuracoes do projeto" > "Propriedades do script", crie a
 *    propriedade APP_TOKEN com um valor secreto aleatorio (ex.: 32+
 *    caracteres). O mesmo valor deve ser configurado no site em
 *    VITE_EVENTO_API_TOKEN e enviado em toda chamada de consulta,
 *    validacao e dashboard.
 * 4. Sem APP_TOKEN configurado, as acoes "consulta", "validar" e
 *    "dashboard" ficam bloqueadas por padrao (fail closed). Apenas o
 *    "cadastro" continua publico, pois e o formulario que o participante
 *    preenche.
 */

const SPREADSHEET_ID = "1omMi6g2ntDj6-avj2S9PdWNBJZXXAnINoCmy1tYeprU";
const BASE_VALIDATION_URL = "https://gutembergfonseca.com.br/evento/checkin";
const INSCRITOS_SHEET = "inscritos_palestra_20260713";
const LOGS_SHEET = "logs_palestra_20260713";
const CONTROLE_MIDIA_SHEET = "controle_midia_20260713";
const APP_TOKEN_PROPERTY = "APP_TOKEN";
const SISTEMA_ATIVO_PROPERTY = "SISTEMA_ATIVO";
const CODIGO_COLUMN = 2;
const CPF_COLUMN = 4;
let spreadsheetCache_ = null;

const INSCRITOS_HEADERS = [
  "id",
  "codigo",
  "nome",
  "cpf",
  "telefone",
  "email",
  "cidade",
  "bairro",
  "categoria",
  "status",
  "qrcode_url",
  "data_cadastro",
  "hora_cadastro",
  "data_validacao",
  "hora_validacao",
  "validado_por",
  "origem",
  "observacoes",
];

const LOG_HEADERS = [
  "data",
  "hora",
  "codigo",
  "resultado",
  "nome",
  "fiscal",
  "portaria",
  "observacao",
];

const CONTROLE_MIDIA_HEADERS = [
  "id_registro",
  "participante_id",
  "codigo",
  "nome",
  "foto_realizada",
  "video_realizado",
  "status_midia",
  "data_atualizacao",
  "hora_atualizacao",
  "origem",
];

function doGet(e) {
  try {
    if (!isSistemaAtivo_()) {
      return json_({ success: false, message: "Sistema temporariamente indisponivel." });
    }
    const params = e && e.parameter ? e.parameter : {};
    const action = (params.action || "").toLowerCase();
    setupSheets_();
    if (action === "consulta") {
      if (!authorized_(params.token)) return json_(unauthorized_());
      return json_(consulta_(params.codigo));
    }
    if (action === "buscarcpf") {
      if (!authorized_(params.token)) return json_(unauthorized_());
      return json_(buscarPorCpf_(params.cpf));
    }
    if (action === "dashboard") {
      if (!authorized_(params.token)) return json_(unauthorized_());
      return json_(dashboard_());
    }
    return json_({ success: false, message: "Acao invalida." });
  } catch (err) {
    return json_({ success: false, message: String(err) });
  }
}

function doPost(e) {
  try {
    if (!isSistemaAtivo_()) {
      return json_({ success: false, message: "Sistema temporariamente indisponivel." });
    }
    setupSheets_();
    const payload = parseBody_(e);
    const action = (payload.action || "").toLowerCase();
    if (action === "cadastro") return json_(cadastro_(payload));
    if (action === "validar") {
      if (!authorized_(payload.token)) {
        log_(
          "NAO_AUTORIZADO",
          normalizeCode_(payload.codigo),
          "",
          clean_(payload.fiscal),
          clean_(payload.portaria),
          "Token invalido ou ausente",
        );
        return json_(unauthorized_());
      }
      return json_(validar_(payload));
    }
    if (action === "atualizarmidia") {
      if (!authorized_(payload.token)) return json_(unauthorized_());
      return json_(atualizarMidia_(payload));
    }
    return json_({ success: false, message: "Acao invalida." });
  } catch (err) {
    log_("ERRO", "", "", "", "", String(err));
    return json_({ success: false, resultado: "ERRO", message: String(err) });
  }
}

function isSistemaAtivo_() {
  return PropertiesService.getScriptProperties().getProperty(SISTEMA_ATIVO_PROPERTY) !== "false";
}

function authorized_(token) {
  const expected = getAppToken_();
  if (!expected) return false;
  return clean_(token) === expected;
}

function getAppToken_() {
  return PropertiesService.getScriptProperties().getProperty(APP_TOKEN_PROPERTY) || "";
}

function unauthorized_() {
  return {
    success: false,
    resultado: "NAO_AUTORIZADO",
    message: "Acesso nao autorizado.",
  };
}

function cadastro_(payload) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const nome = clean_(payload.nome);
    const cpf = onlyDigits_(payload.cpf);
    const telefone = clean_(payload.telefone);
    const email = clean_(payload.email);

    if (!nome || cpf.length !== 11 || !telefone || !email) {
      return { success: false, message: "Dados obrigatorios ausentes ou invalidos." };
    }
    if (payload.lgpd !== true && payload.lgpd !== "true") {
      return { success: false, message: "E necessario autorizar o uso dos dados (LGPD)." };
    }

    const existente = findByCpf_(cpf);
    if (existente) {
      return {
        success: true,
        codigo: existente.row.codigo,
        qrcodeUrl: existente.row.qrcode_url,
        nome: existente.row.nome,
        message: "CPF ja cadastrado. Reutilizando a credencial existente.",
      };
    }

    const sheet = getSheet_(INSCRITOS_SHEET);
    let codigo = "";
    do {
      codigo = generateCode_();
    } while (findByCode_(codigo));

    const now = new Date();
    const qrcodeUrl = BASE_VALIDATION_URL + "?codigo=" + encodeURIComponent(codigo);
    sheet.appendRow([
      Utilities.getUuid(),
      codigo,
      nome,
      cpf,
      telefone,
      email,
      clean_(payload.cidade),
      clean_(payload.bairro),
      clean_(payload.categoria || "Lideranca/Coordenador"),
      "PENDENTE",
      qrcodeUrl,
      date_(now),
      time_(now),
      "",
      "",
      "",
      "SITE",
      clean_(payload.observacoes),
    ]);
    return { success: true, codigo: codigo, qrcodeUrl: qrcodeUrl, nome: nome };
  } finally {
    lock.releaseLock();
  }
}

function consulta_(codigo) {
  const record = findByCode_(codigo);
  if (!record) {
    log_("CODIGO_NAO_ENCONTRADO", normalizeCode_(codigo), "", "", "", "Consulta sem resultado");
    return { success: false, message: "Codigo nao encontrado." };
  }
  return {
    success: true,
    status: record.row.status,
    nome: record.row.nome,
    codigo: record.row.codigo,
    dataValidacao: record.row.data_validacao,
    horaValidacao: record.row.hora_validacao,
    validadoPor: record.row.validado_por,
  };
}

function buscarPorCpf_(cpf) {
  const record = findByCpf_(cpf);
  if (!record) {
    return { success: false, message: "CPF nao encontrado." };
  }
  return {
    success: true,
    status: record.row.status,
    nome: record.row.nome,
    codigo: record.row.codigo,
    dataValidacao: record.row.data_validacao,
    horaValidacao: record.row.hora_validacao,
    validadoPor: record.row.validado_por,
  };
}

function validar_(payload) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const codigo = normalizeCode_(payload.codigo);
    const fiscal = clean_(payload.fiscal);
    const portaria = clean_(payload.portaria);
    const record = findByCode_(codigo);

    if (!record) {
      log_("CODIGO_NAO_ENCONTRADO", codigo, "", fiscal, portaria, "Validacao sem resultado");
      return { success: false, resultado: "CODIGO_NAO_ENCONTRADO", message: "Codigo nao encontrado." };
    }

    if (record.row.status === "VALIDADO") {
      log_("JA_VALIDADO", codigo, record.row.nome, fiscal, portaria, "Tentativa de reuso");
      return {
        success: true,
        resultado: "JA_VALIDADO",
        nome: record.row.nome,
        codigo: codigo,
        status: record.row.status,
        dataValidacao: record.row.data_validacao,
        horaValidacao: record.row.hora_validacao,
        validadoPor: record.row.validado_por,
      };
    }

    const now = new Date();
    const sheet = getSheet_(INSCRITOS_SHEET);
    sheet.getRange(record.rowNumber, 10).setValue("VALIDADO");
    sheet.getRange(record.rowNumber, 14).setValue(date_(now));
    sheet.getRange(record.rowNumber, 15).setValue(time_(now));
    sheet.getRange(record.rowNumber, 16).setValue(fiscal + " - " + portaria);

    log_("VALIDADO_COM_SUCESSO", codigo, record.row.nome, fiscal, portaria, "");

    return {
      success: true,
      resultado: "VALIDADO_COM_SUCESSO",
      nome: record.row.nome,
      codigo: codigo,
      status: "VALIDADO",
      dataValidacao: date_(now),
      horaValidacao: time_(now),
      validadoPor: fiscal + " - " + portaria,
    };
  } catch (err) {
    log_("ERRO", normalizeCode_(payload.codigo), "", clean_(payload.fiscal), clean_(payload.portaria), String(err));
    return { success: false, resultado: "ERRO", message: String(err) };
  } finally {
    lock.releaseLock();
  }
}

function dashboard_() {
  const rows = readRows_(INSCRITOS_SHEET, INSCRITOS_HEADERS);
  const controles = readRows_(CONTROLE_MIDIA_SHEET, CONTROLE_MIDIA_HEADERS);
  const controlePorParticipante = {};

  controles.forEach(function(controle) {
    controlePorParticipante[clean_(controle.participante_id)] = controle;
  });

  const participantes = rows.map(function(row) {
    const controle = controlePorParticipante[clean_(row.id)] || {};
    const fotoRealizada = bool_(controle.foto_realizada);
    const videoRealizado = bool_(controle.video_realizado);
    return {
      id: clean_(row.id),
      nome: clean_(row.nome),
      categoria: clean_(row.categoria),
      convidadoPor: clean_(row.observacoes),
      fotoRealizada: fotoRealizada,
      videoRealizado: videoRealizado,
      statusMidia: fotoRealizada && videoRealizado ? "VALIDADO" : "PENDENTE",
      dataAtualizacao: clean_(controle.data_atualizacao),
      horaAtualizacao: clean_(controle.hora_atualizacao),
    };
  });

  const totalInscritos = rows.length;
  const totalFotos = participantes.filter(function(item) { return item.fotoRealizada; }).length;
  const totalVideos = participantes.filter(function(item) { return item.videoRealizado; }).length;
  const totalValidados = participantes.filter(function(item) { return item.statusMidia === "VALIDADO"; }).length;
  const totalPendentes = totalInscritos - totalValidados;

  return {
    success: true,
    totalInscritos: totalInscritos,
    totalFotos: totalFotos,
    totalVideos: totalVideos,
    totalValidados: totalValidados,
    totalPendentes: totalPendentes,
    percentualConcluido: totalInscritos ? Math.round((totalValidados / totalInscritos) * 1000) / 10 : 0,
    participantes: participantes,
  };
}

function atualizarMidia_(payload) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  let response;
  try {
    const participanteId = clean_(payload.participanteId);
    const participante = findById_(participanteId);
    if (!participante) {
      return { success: false, message: "Participante nao encontrado." };
    }

    const controleAtual = findLatestMediaControl_(participanteId);
    let fotoRealizada = controleAtual ? bool_(controleAtual.foto_realizada) : false;
    let videoRealizado = controleAtual ? bool_(controleAtual.video_realizado) : false;

    if (hasOwn_(payload, "fotoRealizada")) fotoRealizada = bool_(payload.fotoRealizada);
    if (hasOwn_(payload, "videoRealizado")) videoRealizado = bool_(payload.videoRealizado);

    if (!hasOwn_(payload, "fotoRealizada") && !hasOwn_(payload, "videoRealizado")) {
      return { success: false, message: "Nenhuma alteracao de midia foi informada." };
    }

    const now = new Date();

    getSheet_(CONTROLE_MIDIA_SHEET).appendRow([
      Utilities.getUuid(),
      participanteId,
      clean_(participante.row.codigo),
      clean_(participante.row.nome),
      fotoRealizada ? "SIM" : "NAO",
      videoRealizado ? "SIM" : "NAO",
      fotoRealizada && videoRealizado ? "VALIDADO" : "PENDENTE",
      date_(now),
      time_(now),
      "DASHBOARD",
    ]);

    SpreadsheetApp.flush();
    response = {
      success: true,
      participanteId: participanteId,
      fotoRealizada: fotoRealizada,
      videoRealizado: videoRealizado,
      statusMidia: fotoRealizada && videoRealizado ? "VALIDADO" : "PENDENTE",
      dataAtualizacao: date_(now),
      horaAtualizacao: time_(now),
    };

  } finally {
    lock.releaseLock();
  }

  return response;
}

function setupSheets_() {
  ensureSheet_(INSCRITOS_SHEET, INSCRITOS_HEADERS);
  ensureSheet_(LOGS_SHEET, LOG_HEADERS);
  ensureSheet_(CONTROLE_MIDIA_SHEET, CONTROLE_MIDIA_HEADERS);
}

function ensureSheet_(name, headers) {
  const ss = getSpreadsheet_();
  let sheet = ss.getSheetByName(name);
  if (!sheet) sheet = ss.insertSheet(name);
  const current = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
  if (current.join("") !== headers.join("")) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.setFrozenRows(1);
  }
}

function getSheet_(name) {
  return getSpreadsheet_().getSheetByName(name);
}

function getSpreadsheet_() {
  if (!spreadsheetCache_) spreadsheetCache_ = SpreadsheetApp.openById(SPREADSHEET_ID);
  return spreadsheetCache_;
}

function findByCode_(codigo) {
  const normalized = normalizeCode_(codigo);
  if (!normalized) return null;
  return findRowByColumnValue_(CODIGO_COLUMN, normalized);
}

function findByCpf_(cpf) {
  const digits = onlyDigits_(cpf);
  if (!digits) return null;
  return findRowByColumnValue_(CPF_COLUMN, digits);
}

function findById_(id) {
  const normalized = clean_(id);
  if (!normalized) return null;
  return findRowByColumnValue_(1, normalized);
}

function findLatestMediaControl_(participanteId) {
  const sheet = getSheet_(CONTROLE_MIDIA_SHEET);
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return null;

  const values = sheet.getRange(2, 1, lastRow - 1, CONTROLE_MIDIA_HEADERS.length).getValues();
  for (let index = values.length - 1; index >= 0; index--) {
    if (clean_(values[index][1]) === participanteId) {
      return rowToObject_(CONTROLE_MIDIA_HEADERS, values[index]);
    }
  }
  return null;
}

function findRowByColumnValue_(column, value) {
  const sheet = getSheet_(INSCRITOS_SHEET);
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return null;

  const range = sheet.getRange(2, column, lastRow - 1, 1);
  const cell = range.createTextFinder(value).matchEntireCell(true).findNext();
  if (!cell) return null;

  const rowNumber = cell.getRow();
  const values = sheet.getRange(rowNumber, 1, 1, INSCRITOS_HEADERS.length).getValues()[0];
  return { rowNumber: rowNumber, row: rowToObject_(INSCRITOS_HEADERS, values) };
}

function rowToObject_(headers, values) {
  const obj = {};
  headers.forEach(function(header, index) {
    const cell = values[index];
    if (cell instanceof Date) {
      obj[header] = header.indexOf("hora") !== -1 ? time_(cell) : date_(cell);
    } else {
      obj[header] = cell;
    }
  });
  return obj;
}

function readRows_(sheetName, headers) {
  const sheet = getSheet_(sheetName);
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];
  const values = sheet.getRange(2, 1, lastRow - 1, headers.length).getValues();
  return values.map(function(row) {
    return rowToObject_(headers, row);
  });
}

function log_(resultado, codigo, nome, fiscal, portaria, observacao) {
  const now = new Date();
  getSheet_(LOGS_SHEET).appendRow([
    date_(now),
    time_(now),
    normalizeCode_(codigo),
    resultado,
    clean_(nome),
    clean_(fiscal),
    clean_(portaria),
    clean_(observacao),
  ]);
}

function parseBody_(e) {
  if (!e || !e.postData || !e.postData.contents) return {};
  try {
    return JSON.parse(e.postData.contents);
  } catch (err) {
    return e.parameter || {};
  }
}

function generateCode_() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let suffix = "";
  for (let i = 0; i < 6; i++) {
    suffix += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }
  return "GTBPAL-" + suffix;
}

function normalizeCode_(value) {
  return clean_(value).toUpperCase();
}

function clean_(value) {
  return String(value || "").trim();
}

function onlyDigits_(value) {
  return String(value || "").replace(/\D/g, "");
}

function bool_(value) {
  if (value === true) return true;
  const normalized = clean_(value).toUpperCase();
  return normalized === "TRUE" || normalized === "SIM" || normalized === "1";
}

function hasOwn_(object, property) {
  return Object.prototype.hasOwnProperty.call(object || {}, property);
}

function date_(date) {
  return Utilities.formatDate(date, "America/Sao_Paulo", "dd/MM/yyyy");
}

function time_(date) {
  return Utilities.formatDate(date, "America/Sao_Paulo", "HH:mm:ss");
}

function json_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
