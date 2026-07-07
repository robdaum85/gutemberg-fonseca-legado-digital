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
const INSCRITOS_SHEET = "inscritos";
const LOGS_SHEET = "logs_validacao";
const CACHE_SECONDS = 120;
const APP_TOKEN_PROPERTY = "APP_TOKEN";

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

function doGet(e) {
  const action = (e.parameter.action || "").toLowerCase();
  try {
    setupSheets_();
    if (action === "consulta") {
      if (!authorized_(e.parameter.token)) return json_(unauthorized_());
      return json_(consulta_(e.parameter.codigo));
    }
    if (action === "buscarcpf") {
      if (!authorized_(e.parameter.token)) return json_(unauthorized_());
      return json_(buscarPorCpf_(e.parameter.cpf));
    }
    if (action === "dashboard") {
      if (!authorized_(e.parameter.token)) return json_(unauthorized_());
      return json_(dashboard_());
    }
    return json_({ success: false, message: "Acao invalida." });
  } catch (err) {
    return json_({ success: false, message: String(err) });
  }
}

function doPost(e) {
  try {
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
    return json_({ success: false, message: "Acao invalida." });
  } catch (err) {
    log_("ERRO", "", "", "", "", String(err));
    return json_({ success: false, resultado: "ERRO", message: String(err) });
  }
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
    const index = getIndex_();
    let codigo = "";
    do {
      codigo = generateCode_();
    } while (index[codigo]);

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
      clean_(payload.categoria || "Convidado"),
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
    CacheService.getScriptCache().remove("inscritos_index");
    CacheService.getScriptCache().remove("inscritos_index_cpf");
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

    CacheService.getScriptCache().remove("inscritos_index");
    CacheService.getScriptCache().remove("inscritos_index_cpf");
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
  const logs = readRows_(LOGS_SHEET, LOG_HEADERS);
  const totalInscritos = rows.length;
  const totalValidados = rows.filter(function(row) { return row.status === "VALIDADO"; }).length;
  const totalPendentes = rows.filter(function(row) { return row.status === "PENDENTE"; }).length;
  const ultimasValidacoes = logs.slice(-20).reverse();

  return {
    success: true,
    totalInscritos: totalInscritos,
    totalValidados: totalValidados,
    totalPendentes: totalPendentes,
    percentualComparecimento: totalInscritos ? Math.round((totalValidados / totalInscritos) * 1000) / 10 : 0,
    ultimasValidacoes: ultimasValidacoes,
    tentativasInvalidas: logs.filter(function(log) { return log.resultado === "CODIGO_NAO_ENCONTRADO"; }).length,
    convitesReutilizados: logs.filter(function(log) { return log.resultado === "JA_VALIDADO"; }).length,
  };
}

function setupSheets_() {
  ensureSheet_(INSCRITOS_SHEET, INSCRITOS_HEADERS);
  ensureSheet_(LOGS_SHEET, LOG_HEADERS);
}

function ensureSheet_(name, headers) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(name);
  if (!sheet) sheet = ss.insertSheet(name);
  const current = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
  if (current.join("") !== headers.join("")) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.setFrozenRows(1);
  }
}

function getSheet_(name) {
  return SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(name);
}

function getIndex_() {
  const cache = CacheService.getScriptCache();
  const cached = cache.get("inscritos_index");
  if (cached) return JSON.parse(cached);

  const rows = readRows_(INSCRITOS_SHEET, INSCRITOS_HEADERS);
  const index = {};
  rows.forEach(function(row, i) {
    if (row.codigo) index[row.codigo] = { rowNumber: i + 2, row: row };
  });
  cache.put("inscritos_index", JSON.stringify(index), CACHE_SECONDS);
  return index;
}

function getIndexByCpf_() {
  const cache = CacheService.getScriptCache();
  const cached = cache.get("inscritos_index_cpf");
  if (cached) return JSON.parse(cached);

  const rows = readRows_(INSCRITOS_SHEET, INSCRITOS_HEADERS);
  const index = {};
  rows.forEach(function(row, i) {
    const cpf = onlyDigits_(row.cpf);
    if (cpf) index[cpf] = { rowNumber: i + 2, row: row };
  });
  cache.put("inscritos_index_cpf", JSON.stringify(index), CACHE_SECONDS);
  return index;
}

function findByCode_(codigo) {
  return getIndex_()[normalizeCode_(codigo)] || null;
}

function findByCpf_(cpf) {
  return getIndexByCpf_()[onlyDigits_(cpf)] || null;
}

function readRows_(sheetName, headers) {
  const sheet = getSheet_(sheetName);
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];
  const values = sheet.getRange(2, 1, lastRow - 1, headers.length).getValues();
  return values.map(function(row) {
    const obj = {};
    headers.forEach(function(header, index) {
      const cell = row[index];
      if (cell instanceof Date) {
        obj[header] = header.indexOf("hora") !== -1 ? time_(cell) : date_(cell);
      } else {
        obj[header] = cell;
      }
    });
    return obj;
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
  return "GTB26-" + suffix;
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
