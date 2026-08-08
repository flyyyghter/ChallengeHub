/* ===== State ===== */
const state = {
  target: '',
  startTime: null,
  endTime: null,
  timerInterval: null,
  running: false,
  done: false,
  lastTyped: '',
};

/* ===== DOM refs ===== */
const screenSetup  = document.getElementById('screen-setup');
const screenTest   = document.getElementById('screen-test');
const screenResult = document.getElementById('screen-result');

const targetInput  = document.getElementById('target-input');
const btnClear     = document.getElementById('btn-clear');
const btnStart     = document.getElementById('btn-start');
const presetChips  = document.querySelectorAll('.preset-chip');

const typingInput  = document.getElementById('typing-input');
const targetDisplay = document.getElementById('target-display');
const progressFill  = document.getElementById('progress-fill');
const typingHint    = document.getElementById('typing-hint');
const btnRestart   = document.getElementById('btn-restart');

const statTime     = document.getElementById('stat-time');
const statWpm      = document.getElementById('stat-wpm');
const statProgress = document.getElementById('stat-progress');

const resTime   = document.getElementById('res-time');
const resCps    = document.getElementById('res-cps');
const resWpm    = document.getElementById('res-wpm');
const resChars  = document.getElementById('res-chars');
const resultIcon    = document.getElementById('result-icon');
const resultTitle   = document.getElementById('result-title');
const resultRating  = document.getElementById('result-rating');

const btnRetry  = document.getElementById('btn-retry');
const btnNew    = document.getElementById('btn-new');

/* ===== Helpers ===== */
function showScreen(name) {
  [screenSetup, screenTest, screenResult].forEach(s => s.classList.add('hidden'));
  if (name === 'setup')  screenSetup.classList.remove('hidden');
  if (name === 'test')   screenTest.classList.remove('hidden');
  if (name === 'result') screenResult.classList.remove('hidden');
}

function formatTime(ms) {
  return (ms / 1000).toFixed(3);
}

function calcCPS(chars, ms) {
  if (!ms) return 0;
  return (chars / (ms / 1000)).toFixed(2);
}

function calcWPM(chars, ms) {
  // 1 word = 5 chars convention
  if (!ms) return 0;
  const minutes = ms / 1000 / 60;
  return Math.round((chars / 5) / minutes);
}

function getRating(cps, chars) {
  // chars needed to be representative
  if (chars < 4) {
    return { icon: '🤔', title: 'Маловато символов', text: 'Попробуй что-то подлиннее — будет честнее!' };
  }
  if (cps < 2)   return { icon: '🐢', title: 'Медленно', text: 'Не спеши — главное точность. Практика сделает своё дело!' };
  if (cps < 4)   return { icon: '🚶', title: 'Средне', text: 'Неплохо для начала. Ещё немного тренировок!' };
  if (cps < 6)   return { icon: '🚴', title: 'Хорошо!', text: 'Уверенная скорость. Ты явно не новичок.' };
  if (cps < 9)   return { icon: '⚡', title: 'Быстро!', text: 'Отличный результат. Пальцы летают!' };
  return          { icon: '🚀', title: 'Реактивный!', text: 'Невероятная скорость. Ты точно практикуешься!' };
}

/* ===== Render target chars ===== */
function renderTarget(target, typed) {
  targetDisplay.innerHTML = '';
  const chars = [...target];
  const typedChars = [...typed];

  let cursorSet = false;
  chars.forEach((ch, i) => {
    const span = document.createElement('span');
    span.className = 'char';
    span.textContent = ch === ' ' ? '\u00A0' : ch;

    if (i < typedChars.length) {
      span.classList.add(typedChars[i] === ch ? 'correct' : 'wrong');
    } else {
      span.classList.add('pending');
    }

    // cursor = right after last typed char (or at 0 if nothing typed)
    if (i === typedChars.length && !cursorSet) {
      span.classList.add('cursor');
      cursorSet = true;
    }

    targetDisplay.appendChild(span);
  });
}

/* ===== Timer ===== */
function startTimer() {
  state.startTime = performance.now();
  state.running = true;
  statTime.classList.add('running');
  typingHint.style.opacity = '0';

  state.timerInterval = setInterval(() => {
    if (!state.running) return;
    const elapsed = performance.now() - state.startTime;
    statTime.textContent = formatTime(elapsed);

    const typed = typingInput.value;
    const correctLen = countCorrect(state.target, typed);
    const cps = parseFloat(calcCPS(correctLen, elapsed));
    statWpm.textContent = cps > 0 ? cps.toFixed(1) : '—';
  }, 50);
}

function stopTimer() {
  state.endTime = performance.now();
  state.running = false;
  clearInterval(state.timerInterval);
  statTime.classList.remove('running');
}

function countCorrect(target, typed) {
  let count = 0;
  for (let i = 0; i < Math.min(target.length, typed.length); i++) {
    if (typed[i] === target[i]) count++;
    else break; // stop at first mismatch for sequential correctness
  }
  return count;
}

/* ===== Setup screen logic ===== */
targetInput.addEventListener('input', () => {
  btnClear.classList.toggle('visible', targetInput.value.length > 0);
});

btnClear.addEventListener('click', () => {
  targetInput.value = '';
  btnClear.classList.remove('visible');
  targetInput.focus();
});

presetChips.forEach(chip => {
  chip.addEventListener('click', () => {
    targetInput.value = chip.dataset.val;
    btnClear.classList.add('visible');
    targetInput.focus();
  });
});

btnStart.addEventListener('click', startTest);
targetInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') startTest();
});

function startTest() {
  const val = targetInput.value.trim();
  if (!val) {
    targetInput.focus();
    targetInput.style.borderColor = 'var(--red)';
    setTimeout(() => targetInput.style.borderColor = '', 600);
    return;
  }
  state.target = val;
  state.startTime = null;
  state.endTime = null;
  state.running = false;
  state.done = false;
  clearInterval(state.timerInterval);

  // Reset UI
  statTime.textContent = '0.000';
  statWpm.textContent = '—';
  statProgress.textContent = '0%';
  progressFill.style.width = '0%';
  typingInput.value = '';
  typingInput.disabled = false;
  typingInput.className = 'typing-input';
  typingHint.style.opacity = '1';
  typingHint.textContent = '⏱ Таймер стартует с первого символа';

  renderTarget(state.target, '');
  showScreen('test');
  setTimeout(() => typingInput.focus(), 50);
}

/* ===== Test screen logic ===== */
typingInput.addEventListener('input', onTypingInput);

function onTypingInput() {
  if (state.done) return;

  const typed = typingInput.value;
  const target = state.target;

  // Start timer on first character
  if (!state.running && typed.length > 0) {
    startTimer();
  }

  // Render
  renderTarget(target, typed);

  // Count sequential correct chars from start
  const correctLen = countCorrect(target, typed);
  const pct = Math.round((correctLen / target.length) * 100);
  statProgress.textContent = pct + '%';
  progressFill.style.width = pct + '%';

  // Error state
  if (typed.length > 0 && typed[typed.length - 1] !== target[typed.length - 1]) {
    typingInput.classList.add('state-error');
  } else {
    typingInput.classList.remove('state-error');
  }

  // Completion: all chars correct in order
  if (correctLen === target.length) {
    finishTest(typed);
  }
}

function finishTest(typed) {
  state.done = true;
  stopTimer();

  typingInput.classList.remove('state-error');
  typingInput.classList.add('state-done');
  typingInput.disabled = true;

  const elapsed = state.endTime - state.startTime;
  const chars = state.target.length;
  const cps = parseFloat(calcCPS(chars, elapsed));
  const wpm = calcWPM(chars, elapsed);
  const rating = getRating(cps, chars);

  // Populate result screen
  resTime.textContent = formatTime(elapsed) + 'с';
  resCps.textContent = cps;
  resWpm.textContent = wpm;
  resChars.textContent = chars;

  resultIcon.textContent = rating.icon;
  resultTitle.textContent = rating.title;
  resultRating.innerHTML = `<strong>${rating.title}:</strong> ${rating.text}`;

  // Small delay for polish
  setTimeout(() => showScreen('result'), 350);
}

/* ===== Restart / New ===== */
btnRestart.addEventListener('click', () => {
  startTest();
});

btnRetry.addEventListener('click', () => {
  startTest();
});

btnNew.addEventListener('click', () => {
  clearInterval(state.timerInterval);
  state.running = false;
  state.done = false;
  showScreen('setup');
  setTimeout(() => targetInput.focus(), 50);
});

/* ===== Init ===== */
showScreen('setup');
