# Abastecimento de fotos e jingles

## Pastas de entrada

- Fotos vindas do Google Drive: `src/assets/fotos/`
- Novos jingles: `src/assets/jingles/`
- Jingle tema atual: `public/audio/jingle-campanha-2255.mp3`
- Efeito de confirmação da urna: `public/audio/confirma-urna.mp3`

As fotos e os novos jingles são descobertos automaticamente pelo Vite durante o build. Não é necessário editar o componente para cadastrar cada arquivo.

## Fluxo recomendado

1. Baixe ou sincronize os arquivos da pasta compartilhada do Google Drive.
2. Copie as imagens para `src/assets/fotos/`.
3. Copie os novos áudios para `src/assets/jingles/`.
4. Use nomes iniciados por `01-`, `02-`, `03-` para definir a ordem.
5. Execute `npm run build` para validar e publicar os arquivos.

O link ou o acesso à pasta do Google Drive ainda é necessário para realizar a primeira importação dos arquivos remotos.
