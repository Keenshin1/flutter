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
