# Novos jingles

Coloque nesta pasta somente os novos jingles da campanha.

Formatos aceitos: `.m4a`, `.mp3`, `.ogg` e `.wav`.

Arquivos com extensão `.mpeg` devem ser disponibilizados também como `.mp3`. Os MPEGs originais ficam preservados localmente e ignorados pelo Git.

O site descobre os arquivos automaticamente no próximo build e os lista acima do player do jingle tema. O nome exibido vem do nome do arquivo; para controlar a ordem, comece com números:

```text
01-jingle-do-povao.mp3
02-ritmo-do-2255.mp3
```

O jingle tema atual permanece em `public/audio/jingle-campanha-2255.mp3`.
