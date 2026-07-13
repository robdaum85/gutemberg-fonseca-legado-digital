# MVP de credenciamento por QR Code

## Rotas

- `/evento`: formulario publico de cadastro.
- `/evento/sucesso`: confirmacao com codigo e QR Code.
- `/evento/checkin`: tela da portaria com camera, digitacao manual e verificacao de cadastro por CPF.
- `/evento/dashboard`: indicadores simples do evento.

## Configuracao do site

Crie um arquivo `.env` baseado em `.env.example`:

```txt
VITE_EVENTO_API_URL=https://script.google.com/macros/s/SEU_DEPLOYMENT_ID/exec
VITE_EVENTO_API_TOKEN=SUBSTITUIR_PELO_APP_TOKEN_DO_APPS_SCRIPT
VITE_EVENTO_CHECKIN_USERS=[{"login":"admin","senha":"Admin@2026","fiscal":"Administrador"},{"login":"portaria01","senha":"Gutemberg@01","fiscal":"Portaria 01"},{"login":"portaria02","senha":"Gutemberg@02","fiscal":"Portaria 02"},{"login":"portaria03","senha":"Gutemberg@03","fiscal":"Portaria 03"}]
```

Depois rode o build novamente.

## Configuracao do Google Apps Script

1. Crie uma planilha no Google Sheets.
2. Copie o ID da planilha pela URL.
3. Crie um projeto em Google Apps Script.
4. Cole o conteudo de `scripts/evento-apps-script.gs`.
5. Substitua `SPREADSHEET_ID` pelo ID da planilha.
6. Substitua `BASE_VALIDATION_URL` pelo endereco publico do site, por exemplo:

```txt
https://seudominio.com.br/evento/checkin
```

7. Em "Configuracoes do projeto" > "Propriedades do script", crie a propriedade `APP_TOKEN` com um valor secreto aleatorio (32+ caracteres). Sem isso, as acoes `consulta`, `validar` e `dashboard` ficam bloqueadas por padrao.
8. Publique como Web App com acesso para qualquer pessoa com o link.
9. Copie a URL `/exec` publicada para `VITE_EVENTO_API_URL` e o mesmo valor do `APP_TOKEN` para `VITE_EVENTO_API_TOKEN`.

O script cria automaticamente as abas `inscritos` e `logs_validacao` com os cabecalhos necessarios.

## Observacoes operacionais

- O QR Code contem somente a URL de validacao com o codigo.
- A portaria acessa a tela com login e senha. Os acessos padrao sao:
  - `admin` / `Admin@2026`
  - `portaria01` / `Gutemberg@01`
  - `portaria02` / `Gutemberg@02`
  - `portaria03` / `Gutemberg@03`
- A portaria precisa informar a entrada uma vez por aparelho; o fiscal vem do login e os dados ficam no navegador.
- Quando o participante estiver sem o QR Code, a equipe pode informar o CPF para confirmar se o cadastro online ja existe e, se estiver pendente, registrar a entrada normalmente.
- A validacao usa bloqueio no Apps Script para evitar dupla validacao simultanea.
- O indice de inscritos fica em cache por curto periodo para acelerar consultas em uma lista de milhares de pessoas.
