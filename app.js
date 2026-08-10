/* ═══════════════════════════════════════
   PrecisionLab — app.js
   Two games: Typing Speed + Timing Challenge
═══════════════════════════════════════ */

/* ════════════════════════════════
   TAB NAVIGATION
════════════════════════════════ */
const tabBtns       = document.querySelectorAll('.tab-btn');
const tabContents   = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;
    tabBtns.forEach(b => b.classList.toggle('active', b.dataset.tab === target));
    tabContents.forEach(c => c.classList.toggle('hidden', c.id !== `tab-content-${target}`));
    // Stop timing game if switching away
    if (target !== 'timing') tmStop();
  });
});

/* ════════════════════════════════
   HELPERS
════════════════════════════════ */
function showPanel(panels, id) {
  panels.forEach(p => p.classList.toggle('hidden', p.id !== id));
}

function fmt(ms) { return (ms / 1000).toFixed(3); }

/* ════════════════════════════════════════════════════════
   TYPING SPEED GAME
════════════════════════════════════════════════════════ */

const tsState = {
  target: '',
  startTime: null,
  endTime: null,
  interval: null,
  running: false,
  done: false,
};

/* DOM */
const tsPanels      = [
  document.getElementById('ts-setup'),
  document.getElementById('ts-test'),
  document.getElementById('ts-result'),
];
const tsTargetInput = document.getElementById('target-input');
const tsBtnClear    = document.getElementById('btn-clear');
const tsBtnStart    = document.getElementById('btn-ts-start');
const tsChips       = document.querySelectorAll('.chip');
const tsTypingInput = document.getElementById('typing-input');
const tsTargetDisp  = document.getElementById('ts-target-display');
const tsProgFill    = document.getElementById('ts-progress-fill');
const tsHint        = document.getElementById('ts-hint');
const tsBtnRestart  = document.getElementById('btn-ts-restart');
const tsBtnRetry    = document.getElementById('btn-ts-retry');
const tsBtnNew      = document.getElementById('btn-ts-new');

const tsStatTime     = document.getElementById('ts-time');
const tsStatCps      = document.getElementById('ts-cps');
const tsStatProgress = document.getElementById('ts-progress');
const tsResTime      = document.getElementById('ts-r-time');
const tsResCps       = document.getElementById('ts-r-cps');
const tsResWpm       = document.getElementById('ts-r-wpm');
const tsResChars     = document.getElementById('ts-r-chars');
const tsResIcon      = document.getElementById('ts-res-icon');
const tsResTitle     = document.getElementById('ts-res-title');
const tsResSub       = document.getElementById('ts-res-sub');

/* ── Typing helpers ── */
function tsCPS(chars, ms) { return ms ? (chars / (ms / 1000)).toFixed(2) : 0; }
function tsWPM(chars, ms) { return ms ? Math.round((chars / 5) / (ms / 60000)) : 0; }

function tsCountCorrect(target, typed) {
  let n = 0;
  for (let i = 0; i < Math.min(target.length, typed.length); i++) {
    if (typed[i] === target[i]) n++; else break;
  }
  return n;
}

function tsRender(target, typed) {
  tsTargetDisp.innerHTML = '';
  let cursorSet = false;
  [...target].forEach((ch, i) => {
    const sp = document.createElement('span');
    sp.className = 'char';
    sp.textContent = ch === ' ' ? '\u00A0' : ch;
    if (i < typed.length) {
      sp.classList.add(typed[i] === ch ? 'correct' : 'wrong');
    } else {
      sp.classList.add('pending');
    }
    if (i === typed.length && !cursorSet) { sp.classList.add('cursor'); cursorSet = true; }
    tsTargetDisp.appendChild(sp);
  });
}

function tsRating(cps, chars) {
  if (chars < 4) return { icon: '🤔', title: 'Маловато символов', text: 'Попробуй текст подлиннее — будет честнее!' };
  if (cps < 2)  return { icon: '🐢', title: 'Медленно',   text: 'Практика сделает своё дело. Не сдавайся!' };
  if (cps < 4)  return { icon: '🚶', title: 'Средне',     text: 'Уже неплохо. Ещё немного тренировок!' };
  if (cps < 6)  return { icon: '🚴', title: 'Хорошо!',   text: 'Уверенная скорость. Ты явно не новичок.' };
  if (cps < 9)  return { icon: '⚡', title: 'Быстро!',   text: 'Отличный результат. Пальцы летают!' };
  return               { icon: '🚀', title: 'Реактивный!', text: 'Невероятная скорость. Ты точно практикуешься!' };
}

/* ── Typing: setup ── */
tsTargetInput.addEventListener('input', () => {
  tsBtnClear.classList.toggle('vis', tsTargetInput.value.length > 0);
});
tsBtnClear.addEventListener('click', () => {
  tsTargetInput.value = '';
  tsBtnClear.classList.remove('vis');
  tsTargetInput.focus();
});
tsChips.forEach(c => {
  c.addEventListener('click', () => {
    tsTargetInput.value = c.dataset.val;
    tsBtnClear.classList.add('vis');
    tsTargetInput.focus();
  });
});
tsBtnStart.addEventListener('click', tsStartTest);
tsTargetInput.addEventListener('keydown', e => { if (e.key === 'Enter') tsStartTest(); });

function tsStartTest() {
  const val = tsTargetInput.value.trim();
  if (!val) {
    tsTargetInput.classList.add('err');
    setTimeout(() => tsTargetInput.classList.remove('err'), 600);
    tsTargetInput.focus();
    return;
  }
  tsState.target  = val;
  tsState.startTime = null;
  tsState.endTime   = null;
  tsState.running   = false;
  tsState.done      = false;
  clearInterval(tsState.interval);

  tsStatTime.textContent     = '0.000';
  tsStatCps.textContent      = '—';
  tsStatProgress.textContent = '0%';
  tsProgFill.style.width     = '0%';
  tsTypingInput.value        = '';
  tsTypingInput.disabled     = false;
  tsTypingInput.className    = 'glass-input mono';
  tsHint.style.opacity       = '1';
  tsHint.textContent         = '⏱ Таймер стартует с первого символа';

  tsRender(val, '');
  showPanel(tsPanels, 'ts-test');
  setTimeout(() => tsTypingInput.focus(), 50);
}

/* ── Typing: timer ── */
function tsTimerStart() {
  tsState.startTime = performance.now();
  tsState.running   = true;
  tsStatTime.classList.add('running');
  tsHint.style.opacity = '0';

  tsState.interval = setInterval(() => {
    if (!tsState.running) return;
    const el = performance.now() - tsState.startTime;
    tsStatTime.textContent = fmt(el);
    const cps = parseFloat(tsCPS(tsCountCorrect(tsState.target, tsTypingInput.value), el));
    tsStatCps.textContent = cps > 0 ? cps.toFixed(1) : '—';
  }, 50);
}

function tsTimerStop() {
  tsState.endTime = performance.now();
  tsState.running = false;
  clearInterval(tsState.interval);
  tsStatTime.classList.remove('running');
}

/* ── Typing: input ── */
tsTypingInput.addEventListener('input', () => {
  if (tsState.done) return;
  const typed  = tsTypingInput.value;
  const target = tsState.target;

  if (!tsState.running && typed.length > 0) tsTimerStart();

  tsRender(target, typed);
  const correct = tsCountCorrect(target, typed);
  const pct     = Math.round((correct / target.length) * 100);
  tsStatProgress.textContent = pct + '%';
  tsProgFill.style.width     = pct + '%';

  const hasErr = typed.length > 0 && typed[typed.length - 1] !== target[typed.length - 1];
  tsTypingInput.classList.toggle('err', hasErr);

  if (correct === target.length) tsFinish();
});

function tsFinish() {
  tsState.done = true;
  tsTimerStop();
  tsTypingInput.disabled  = true;
  tsTypingInput.classList.remove('err');
  tsTypingInput.classList.add('done');

  const elapsed = tsState.endTime - tsState.startTime;
  const chars   = tsState.target.length;
  const cps     = parseFloat(tsCPS(chars, elapsed));
  const wpm     = tsWPM(chars, elapsed);
  const rating  = tsRating(cps, chars);

  tsResIcon.textContent  = rating.icon;
  tsResTitle.textContent = rating.title;
  tsResSub.textContent   = rating.text;
  tsResTime.textContent  = fmt(elapsed) + 'с';
  tsResCps.textContent   = cps;
  tsResWpm.textContent   = wpm;
  tsResChars.textContent = chars;

  setTimeout(() => showPanel(tsPanels, 'ts-result'), 350);
}

tsBtnRestart.addEventListener('click', tsStartTest);
tsBtnRetry.addEventListener('click', tsStartTest);
tsBtnNew.addEventListener('click', () => {
  clearInterval(tsState.interval);
  tsState.running = false;
  tsState.done    = false;
  showPanel(tsPanels, 'ts-setup');
  setTimeout(() => tsTargetInput.focus(), 50);
});

/* ════════════════════════════════════════════════════════
   TIMING CHALLENGE GAME
════════════════════════════════════════════════════════ */

const TM_ROUNDS    = 3;
const TM_DURATION  = 10000; // 10 seconds

const tmState = {
  round:      0,
  targetMs:   0,
  startTime:  null,
  pressedMs:  null,
  interval:   null,
  running:    false,
  rounds:     [], // [{target, pressed, diff}]
};

/* DOM */
const tmPanels       = [
  document.getElementById('tm-intro'),
  document.getElementById('tm-round'),
  document.getElementById('tm-round-result'),
  document.getElementById('tm-analytics'),
];
const tmRoundBadge   = document.getElementById('tm-round-badge');
const tmTargetTime   = document.getElementById('tm-target-time');
const tmClock        = document.getElementById('tm-clock');
const tmBarFill      = document.getElementById('tm-bar-fill');
const tmBarTarget    = document.getElementById('tm-bar-target');
const btnTmStart     = document.getElementById('btn-tm-start');
const btnTmGo        = document.getElementById('btn-tm-go');
const btnTmStop      = document.getElementById('btn-tm-stop');
const tmHint         = document.getElementById('tm-hint');

const tmRrIcon       = document.getElementById('tm-rr-icon');
const tmRrTitle      = document.getElementById('tm-rr-title');
const tmRrDiff       = document.getElementById('tm-rr-diff');
const tmRrBar        = document.getElementById('tm-rr-bar');
const btnTmNext      = document.getElementById('btn-tm-next');

const anRounds       = document.getElementById('analytics-rounds');
const anAvg          = document.getElementById('an-avg');
const anBest         = document.getElementById('an-best');
const anScore        = document.getElementById('an-score');
const anRating       = document.getElementById('an-rating');
const tmFinalIcon    = document.getElementById('tm-final-icon');
const btnTmReplay    = document.getElementById('btn-tm-replay');

/* ── Format for timing display: "s:cc" (centiseconds) ── */
function tmFmt(ms) {
  const s  = Math.floor(ms / 1000);
  const cc = Math.floor((ms % 1000) / 10);
  return `${s}:${String(cc).padStart(2, '0')}`;
}

/* ── Generate random target (1s .. 8.99s) ── */
function tmRandomTarget() {
  // avoid the very start/end so it's fair
  return 1000 + Math.floor(Math.random() * 7990);
}

/* ── Stop/cleanup interval ── */
function tmStop() {
  clearInterval(tmState.interval);
  tmState.running = false;
}

/* ── Start sequence ── */
btnTmStart.addEventListener('click', tmBeginGame);
btnTmReplay.addEventListener('click', tmBeginGame);

function tmBeginGame() {
  tmState.round  = 0;
  tmState.rounds = [];
  tmBeginRound();
}

function tmBeginRound() {
  tmStop();
  tmState.round++;
  tmState.targetMs  = tmRandomTarget();
  tmState.startTime = null;
  tmState.pressedMs = null;
  tmState.running   = false;

  tmRoundBadge.textContent = `Раунд ${tmState.round} / ${TM_ROUNDS}`;
  tmTargetTime.textContent = tmFmt(tmState.targetMs);
  tmClock.textContent      = '0:00';
  tmBarFill.style.width    = '0%';

  // Position the target marker
  tmBarTarget.style.left = ((tmState.targetMs / TM_DURATION) * 100) + '%';

  btnTmGo.style.display   = '';
  btnTmStop.disabled      = true;
  btnTmStop.classList.remove('active');
  tmHint.textContent      = 'Нажми Start чтобы запустить таймер';

  showPanel(tmPanels, 'tm-round');
}

btnTmGo.addEventListener('click', tmLaunch);

function tmLaunch() {
  btnTmGo.style.display = 'none';
  btnTmStop.disabled    = false;
  btnTmStop.classList.add('active');
  tmHint.textContent    = 'Нажми STOP в нужный момент!';

  tmState.startTime = performance.now();
  tmState.running   = true;

  tmState.interval = setInterval(() => {
    if (!tmState.running) return;
    const elapsed = performance.now() - tmState.startTime;

    if (elapsed >= TM_DURATION) {
      // Missed — treat as pressing at 10s
      tmRegisterPress(TM_DURATION);
      return;
    }

    const pct = (elapsed / TM_DURATION) * 100;
    tmBarFill.style.width = pct + '%';
    tmClock.textContent   = tmFmt(elapsed);
  }, 20);
}

btnTmStop.addEventListener('click', () => {
  if (!tmState.running || btnTmStop.disabled) return;
  const elapsed = performance.now() - tmState.startTime;
  tmRegisterPress(elapsed);
});

function tmRegisterPress(elapsed) {
  tmStop();
  btnTmStop.disabled = true;
  btnTmStop.classList.remove('active');

  // Freeze bar at press moment
  const clampedElapsed = Math.min(elapsed, TM_DURATION);
  tmBarFill.style.width = ((clampedElapsed / TM_DURATION) * 100) + '%';
  tmClock.textContent   = tmFmt(clampedElapsed);

  const diff = Math.round(elapsed - tmState.targetMs); // positive = late, negative = early
  const absDiff = Math.abs(diff);

  tmState.rounds.push({
    round:    tmState.round,
    targetMs: tmState.targetMs,
    pressedMs: clampedElapsed,
    diff:      diff,
    absDiff:   absDiff,
  });

  // Show round result
  setTimeout(() => tmShowRoundResult(diff, absDiff), 250);
}

function tmRoundRating(absDiff) {
  if (absDiff < 30)  return { icon: '🎯', title: 'Идеально!',   color: 'var(--green)' };
  if (absDiff < 80)  return { icon: '✨', title: 'Отлично!',    color: 'var(--green)' };
  if (absDiff < 160) return { icon: '👍', title: 'Хорошо',      color: 'var(--ac)' };
  if (absDiff < 300) return { icon: '😐', title: 'Неплохо',     color: 'var(--yellow)' };
  if (absDiff < 500) return { icon: '😬', title: 'Промах',      color: 'var(--yellow)' };
  return                    { icon: '💀', title: 'Мимо кассы',  color: 'var(--red)' };
}

function tmShowRoundResult(diff, absDiff) {
  const r = tmRoundRating(absDiff);
  tmRrIcon.textContent  = r.icon;
  tmRrTitle.textContent = r.title;

  const sign = diff > 0 ? '+' : '';
  tmRrDiff.textContent  = `Отклонение: ${sign}${diff} мс`;

  // Accuracy bar: center = perfect. Range ±500ms
  const MAX = 500;
  const clamped = Math.max(-MAX, Math.min(MAX, diff));
  // Fill from center outward
  const center   = 50; // %
  const fillPct  = (Math.abs(clamped) / MAX) * 50;
  if (diff < 0) {
    // Early — fill from (center-fillPct) to center
    tmRrBar.style.left   = (center - fillPct) + '%';
    tmRrBar.style.width  = fillPct + '%';
  } else {
    // Late — fill from center to (center+fillPct)
    tmRrBar.style.left   = center + '%';
    tmRrBar.style.width  = fillPct + '%';
  }
  tmRrBar.style.background = r.color;

  showPanel(tmPanels, 'tm-round-result');
}

btnTmNext.addEventListener('click', () => {
  if (tmState.round < TM_ROUNDS) {
    tmBeginRound();
  } else {
    tmShowAnalytics();
  }
});

/* ── Analytics ── */
function tmShowAnalytics() {
  const rounds = tmState.rounds;

  // Build round rows
  anRounds.innerHTML = '';
  const maxDiff = Math.max(...rounds.map(r => r.absDiff), 1);

  rounds.forEach(r => {
    const rating = tmRoundRating(r.absDiff);
    const pct    = Math.max(2, 100 - Math.round((r.absDiff / 500) * 100));
    const sign   = r.diff > 0 ? '+' : '';

    const row = document.createElement('div');
    row.className = 'analytics-row';
    row.innerHTML = `
      <span class="an-round-num">R${r.round}</span>
      <div class="an-bar-mini-wrap">
        <div class="an-bar-mini" style="width:${pct}%;background:${rating.color}"></div>
      </div>
      <span class="an-diff" style="color:${rating.color}">${sign}${r.diff}мс</span>
      <span class="an-pct">${pct}%</span>
    `;
    anRounds.appendChild(row);
  });

  // Summary
  const avgDiff  = Math.round(rounds.reduce((s, r) => s + r.absDiff, 0) / rounds.length);
  const bestDiff = Math.min(...rounds.map(r => r.absDiff));
  const accuracy = Math.max(0, Math.round(100 - (avgDiff / 500) * 100));

  anAvg.textContent   = avgDiff + 'мс';
  anBest.textContent  = bestDiff + 'мс';
  anScore.textContent = accuracy + '%';

  // Overall rating
  let finalRating;
  if (accuracy >= 94)      finalRating = { icon: '🏆', title: 'Легендарно!',  text: 'Реакция как у машины. Невероятно.' };
  else if (accuracy >= 85) finalRating = { icon: '🎯', title: 'Снайпер!',     text: 'Отличная точность и чувство времени.' };
  else if (accuracy >= 70) finalRating = { icon: '✨', title: 'Хорошо!',      text: 'Стабильный результат. Можно лучше!' };
  else if (accuracy >= 50) finalRating = { icon: '👀', title: 'Средне',       text: 'Ещё немного практики — и будет огонь.' };
  else                     finalRating = { icon: '🐢', title: 'Тренируйся!',  text: 'Чувство ритма нарабатывается. Не сдавайся!' };

  tmFinalIcon.textContent = finalRating.icon;
  anRating.innerHTML = `<strong>${finalRating.title}</strong> — ${finalRating.text}`;

  showPanel(tmPanels, 'tm-analytics');
}

/* ════════════════════════════════
   INIT
════════════════════════════════ */
showPanel(tsPanels, 'ts-setup');
showPanel(tmPanels, 'tm-intro');
