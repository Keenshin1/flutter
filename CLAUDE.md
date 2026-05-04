# Flutter Course — Claude Code Guide

## Estrutura do projeto

```
src/
  base.html        # template HTML com placeholders BUILD:*
  modules/         # um arquivo por módulo (01-variaveis.html, ...)
assets/
  style.css
  script.js
build.py           # gera index.html a partir de src/
```

## index.html

`index.html` é gerado por `build.py` e está no `.gitignore`. **Não commitar este arquivo.**
O deploy do GitHub Pages roda `build.py` automaticamente — não é necessário executá-lo localmente.

## Fluxo de trabalho

1. Editar arquivos em `src/` ou `assets/`
2. Commitar apenas os arquivos fonte
3. Abrir PR — o deploy acontece após o merge na `main`

## Módulos

Cada arquivo em `src/modules/` deve começar com o comentário de metadados:

```html
<!-- module: num="01" nav="Variáveis" -->
```

Os módulos são ordenados pelo nome do arquivo (`01-`, `02-`, ...).
