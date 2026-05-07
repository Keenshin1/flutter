# Flutter Course — Claude Code Guide

## Estrutura do projeto

```
src/
  base.html          # template HTML com placeholders BUILD:*
  modules/           # um arquivo por módulo (01-variaveis.html, ...)
  modules/_template.html  # template comentado para novos módulos
assets/
  style.css
  script.js
build.py             # gera index.html a partir de src/
```

## index.html

`index.html` é gerado por `build.py`. **Nunca leia nem edite este arquivo diretamente.**
O `build.yml` o reconstrói automaticamente em branches de feature quando `src/` muda.
O `deploy.yml` o reconstrói durante o deploy para GitHub Pages.

## Fluxo de trabalho

1. Editar arquivos em `src/` ou `assets/`
2. Ao fazer commit, use **sempre** `git add src/ assets/ build.py` — nunca `git add .` ou `git add index.html`
3. Abrir PR — o deploy acontece após o merge na `main`

---

## Criando um novo módulo

1. Copie `src/modules/_template.html` para `src/modules/NN-slug.html`
   - `NN` = número com dois dígitos (`15`, `16`, ...)
   - `slug` = identificador curto em minúsculas sem acentos (`async`, `navegacao`, ...)
2. Substitua **todas** as ocorrências de `NN` pelo número real e `PREV` pelo número anterior
3. Preencha os textos marcados com `[TEXTO]`
4. Arquivos que começam com `_` são ignorados pelo `build.py` — só o template usa essa convenção

---

## Formato de módulo

### Metadados (primeira linha obrigatória)

```html
<!-- module: num="15" nav="Título na sidebar" -->
```

- `num` → número inteiro (sem zero à esquerda no valor, mas o arquivo usa `15-slug.html`)
- `nav` → texto que aparece na barra lateral (curto, sem acento problemático)

### Estrutura da div principal

```html
<div class="lesson" id="lesson-15">
```

- `class="lesson active"` apenas no módulo 1; todos os outros usam só `class="lesson"`
- `id` deve corresponder exatamente ao `num` nos metadados

### Cabeçalho do módulo

```html
<div class="lesson-header">
  <div class="lesson-badge">Módulo 15</div>
  <div class="lesson-title">Título longo do módulo</div>
  <div class="lesson-subtitle">Uma frase descrevendo o que o aluno aprende.</div>
</div>
```

### Seções de conteúdo

Cada seção segue o padrão:

```html
<div class="divider"></div>
<div class="section-title">Nome da seção</div>

<div class="explanation">Texto explicativo com <code>inline code</code>.</div>

<div class="code-block">
  <div class="code-header">
    <div class="code-dots"><div class="code-dot"></div><div class="code-dot"></div><div class="code-dot"></div></div>
    <div class="code-lang">Dart</div>
  </div>
  <pre>...código com spans de highlight...</pre>
</div>

<div class="info-box">Dica ou detalhe.</div>
```

**Variantes de `info-box`:**
- `<div class="info-box">` — azul, dica geral
- `<div class="info-box green">` — verde, output/resultado esperado
- `<div class="info-box yellow">` — amarelo, aviso ou atenção

### Highlight de código (spans dentro de `<pre>`)

| Classe   | Uso                                              | Exemplo                            |
|----------|--------------------------------------------------|------------------------------------|
| `.kw`    | Palavras-chave da linguagem                      | `void`, `var`, `if`, `class`       |
| `.type`  | Tipos                                            | `String`, `int`, `List`, `Widget`  |
| `.fn`    | Funções e métodos                                | `main`, `print`, `build`           |
| `.var`   | Variáveis e propriedades                         | `nome`, `saldo`, `child`           |
| `.str`   | Strings literais                                 | `'Olá'`, `"texto"`                 |
| `.num`   | Números literais                                 | `42`, `3.14`                       |
| `.com`   | Comentários                                      | `// comentário`                    |
| `.op`    | Operadores especiais                             | `@override`, `=>`                  |

---

## Exercícios

### IDs — regra única e obrigatória

Para o módulo `N`, exercício `E`:

| Elemento      | ID             |
|---------------|----------------|
| `textarea`    | `exN-E`        |
| `dartpad-wrap`| `dpN-E`        |
| `solution-wrap`| `solN-E`      |

Exemplos para módulo 15, exercício 2: `ex15-2`, `dp15-2`, `sol15-2`.

**IDs devem ser únicos em todo o `index.html` gerado** — nunca reutilize um ID de outro módulo.

### Dificuldades

| Dificuldade | Tag HTML                              | Classe da card              |
|-------------|---------------------------------------|-----------------------------|
| Básico      | `<span class="tag green">Básico</span>`  | `<div class="exercise-card">` |
| Médio       | `<span class="tag yellow">Médio</span>`  | `<div class="exercise-card medio">` |
| Desafio     | `<span class="tag orange">Desafio</span>`| `<div class="exercise-card desafio">` |
| Revisão     | `<span class="tag blue">Revisão</span>`  | `<div class="exercise-card">` |

### Estrutura completa de um exercício

```html
<div class="exercise-card medio">
  <div class="exercise-header">
    <div class="exercise-icon">02</div>
    <div style="flex:1">
      <div class="exercise-title">Título</div>
      <div class="exercise-sub">Subtítulo curto</div>
    </div>
    <span class="tag yellow">Médio</span>
  </div>
  <div class="exercise-body">
    <div class="exercise-desc">Enunciado com <code>code</code> e <strong>resultado esperado</strong>.</div>
    <textarea class="exercise-input" id="ex15-2" placeholder="Digite seu código Dart aqui..."></textarea>
    <div class="exercise-actions">
      <button class="btn btn-primary" onclick="runInDartPad('ex15-2', 'dp15-2')">▶ Executar</button>
      <button class="btn btn-ghost" onclick="showSolution('sol15-2')">Ver solução</button>
    </div>
    <div class="dartpad-wrap" id="dp15-2"></div>
    <div class="solution-wrap" id="sol15-2">
      <div class="code-block" style="margin-top:0">
        <div class="code-header"><div class="code-dots"><div class="code-dot"></div><div class="code-dot"></div><div class="code-dot"></div></div><div class="code-lang">Solução</div></div>
        <pre>...código da solução...</pre>
      </div>
    </div>
  </div>
</div>
```

---

## Navegação entre módulos (`lesson-nav`)

```html
<div class="lesson-nav">
  <button class="btn btn-nav" onclick="goTo(PREV)">← Voltar</button>
  <button class="btn btn-primary" onclick="completeAndNext(N)">Próximo módulo →</button>
</div>
```

- **Primeiro módulo:** botão Voltar com `style="visibility:hidden"`
- **Último módulo:** substituir botão Próximo por `onclick="completeAndNext(N)">✔ Concluir curso</button>`
- `PREV` = número do módulo anterior; `N` = número do módulo atual
