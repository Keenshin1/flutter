const TOTAL = document.querySelectorAll('.lesson').length;
const completed = new Set();

function goTo(idx) {
  document.querySelectorAll('.lesson').forEach(l => l.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('lesson-' + idx).classList.add('active');
  document.getElementById('nav-' + idx).classList.add('active');
  window.scrollTo(0, 0);
}

function completeAndNext(idx) {
  if (idx > 0 && idx <= TOTAL) completed.add(idx);
  updateProgress();
  const navItem = document.getElementById('nav-' + idx);
  if (navItem && idx > 0) navItem.classList.add('completed');
  if (idx < TOTAL) goTo(idx + 1);
  else goTo(1);
}

function updateProgress() {
  const pct = Math.round((completed.size / TOTAL) * 100);
  document.getElementById('progress-fill').style.width = pct + '%';
  document.getElementById('progress-text').textContent = completed.size + ' / ' + TOTAL;
}

function showSolution(solId) {
  const wrap = document.getElementById(solId);
  wrap.classList.toggle('show');
}

function _wrapDartCode(code) {
  const hasImport = /import\s+['"]package:flutter/.test(code);
  const hasMain = /void\s+main\s*[\(\{]/.test(code);
  const classMatch = code.match(/class\s+(\w+)\s+extends\s+(Stateless|Stateful)Widget/);

  if (hasMain) {
    return hasImport ? code : "import 'package:flutter/material.dart';\n\n" + code;
  }
  if (classMatch) {
    const cls = classMatch[1];
    return "import 'package:flutter/material.dart';\n\nvoid main() => runApp(const MaterialApp(home: Scaffold(body: Center(child: " + cls + "()))));\n\n" + code;
  }
  return "import 'package:flutter/material.dart';\n\nvoid main() => runApp(MaterialApp(home: Scaffold(body: SafeArea(child: Center(child: " + code + ")))));\n";
}

function _sendToDartPad(iframe, code) {
  iframe.contentWindow.postMessage({ sourceCode: code, type: 'sourceCode' }, 'https://dartpad.dev');
  setTimeout(() => {
    iframe.contentWindow.postMessage({ type: 'run' }, 'https://dartpad.dev');
  }, 300);
}

function runInDartPad(codeId, dpId) {
  const raw = document.getElementById(codeId).value.trim();
  if (!raw) return;

  const code = _wrapDartCode(raw);
  const wrap = document.getElementById(dpId);
  wrap.style.display = 'block';
  wrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  let iframe = wrap.querySelector('iframe');
  if (!iframe) {
    const loading = document.createElement('div');
    loading.className = 'dartpad-loading';
    loading.textContent = 'Carregando DartPad…';
    wrap.appendChild(loading);

    iframe = document.createElement('iframe');
    iframe.src = 'https://dartpad.dev/embed-flutter.html?run=true&null_safety=true&split=0&theme=dark';
    wrap.appendChild(iframe);

    let sent = false;
    function onReady(event) {
      if (event.origin !== 'https://dartpad.dev') return;
      if (event.source !== iframe.contentWindow) return;
      if (sent || event.data.type !== 'ready') return;
      sent = true;
      window.removeEventListener('message', onReady);
      loading.remove();
      _sendToDartPad(iframe, code);
    }
    window.addEventListener('message', onReady);

    // Fallback caso o evento 'ready' não chegue
    setTimeout(() => {
      if (!sent) {
        sent = true;
        window.removeEventListener('message', onReady);
        loading.remove();
        _sendToDartPad(iframe, code);
      }
    }, 6000);

  } else {
    const loading = document.createElement('div');
    loading.className = 'dartpad-loading';
    loading.textContent = 'Executando…';
    wrap.appendChild(loading);
    _sendToDartPad(iframe, code);
    setTimeout(() => loading.remove(), 800);
  }
}
