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

`index.html` é gerado por `build.py`. **Nunca leia nem edite este arquivo diretamente.**
O `build.yml` o reconstrói automaticamente em branches de feature quando `src/` muda.
O `deploy.yml` o reconstrói durante o deploy para GitHub Pages.

## Fluxo de trabalho

1. Editar arquivos em `src/` ou `assets/`
2. Ao fazer commit, use **sempre** `git add src/ assets/ build.py` — nunca `git add .` ou `git add index.html`
3. Abrir PR — o deploy acontece após o merge na `main`

## Módulos

Cada arquivo em `src/modules/` deve começar com o comentário de metadados:

```html
<!-- module: num="01" nav="Variáveis" -->
```

Os módulos são ordenados pelo nome do arquivo (`01-`, `02-`, ...).
