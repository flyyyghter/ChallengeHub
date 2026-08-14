/* ═══════════════════════════════════════════════════════════
   ChallengeHub — app.js
   Mini Games: Typing Speed + Timing Challenge
   Settings, Localization (RU/EN), Liquid Sound Engine
═══════════════════════════════════════════════════════════ */

/* ════════════════════════════════
   LOCALIZATION (i18n)
════════════════════════════════ */
const i18n = {
  ru: {
    tab_typing: 'Typing',
    tab_timing: 'Timing',
    settings_title: 'Настройки',
    setting_lang_label: 'Язык интерфейса',
    setting_lang_desc: 'Русский / English',
    setting_vol_label: 'Громкость звуков',
    setting_vol_desc: 'Звуковые эффекты игры',
    btn_done: 'Готово',

    // Typing
    ts_setup_title: 'Что набираем?',
    ts_setup_desc: 'Любой текст, пароль, фраза — таймер стартует с первого символа и останавливается на последнем правильном.',
    ts_target_label: 'Целевой текст',
    ts_target_ph: 'например: 1234 или Hello World!',
    chips_quick_select: 'Быстрый выбор:',
    btn_start_test: 'Начать тест →',
    lbl_seconds: 'секунд',
    lbl_cps: 'симв/с',
    lbl_progress: 'прогресс',
    ts_typing_ph: 'Начни вводить здесь…',
    ts_hint_init: '⏱ Таймер стартует с первого символа',
    ts_paste_blocked: '⚠️ Вставка текста отключена — вводи вручную!',
    btn_restart: '↩ Начать заново',
    ts_res_title_done: 'Готово!',
    res_lbl_time: 'Время',
    res_lbl_chars: 'Символов',
    btn_retry: 'Повторить',
    btn_new_text: 'Новый текст',

    // Typing Ratings
    rate_too_short: 'Маловато символов',
    rate_too_short_desc: 'Попробуй текст подлиннее — будет точнее!',
    rate_slow: 'Медленно',
    rate_slow_desc: 'Практика сделает своё дело. Не сдавайся!',
    rate_medium: 'Средне',
    rate_medium_desc: 'Уже неплохо. Ещё немного тренировок!',
    rate_good: 'Хорошо!',
    rate_good_desc: 'Уверенная скорость. Ты явно не новичок.',
    rate_fast: 'Быстро!',
    rate_fast_desc: 'Отличный результат. Пальцы летают!',
    rate_insane: 'Реактивный!',
    rate_insane_desc: 'Невероятная скорость. Ты точно практикуешься!',

    // Timing Challenge
    tm_title: 'Timing Challenge',
    tm_desc: 'Таймер идёт от 0 до 10 секунд. Тебе покажут случайный момент — нажми кнопку точно в этот момент. Три раунда, потом аналитика.',
    tm_target_preview_lbl: 'Цель',
    tm_preview_hint: 'Нажми STOP когда таймер покажет это время',
    btn_start_game: 'Начать игру →',
    round_prefix: 'Раунд',
    tm_target_lbl: 'Попади в момент',
    tm_hint_start: 'Нажми Start (или Пробел) чтобы запустить таймер',
    tm_hint_running: 'Нажми STOP (или Пробел) в нужный момент!',
    btn_start_timer: '▶ Start',
    tm_ideal: 'Идеал',
    btn_next_round: 'Следующий раунд →',
    tm_analytics_title: 'Результаты',
    tm_rounds_done: '3 раунда завершены',
    an_avg_lbl: 'Среднее отклонение',
    an_best_lbl: 'Лучший раунд',
    an_score_lbl: 'Точность',
    btn_replay: 'Сыграть снова',
    diff_lbl: 'Отклонение',

    // Timing Ratings
    tm_r_perfect: 'Идеально!',
    tm_r_great: 'Отлично!',
    tm_r_good: 'Хорошо',
    tm_r_decent: 'Неплохо',
    tm_r_miss: 'Промах',
    tm_r_fail: 'Мимо кассы',

    // Final Ratings
    fin_legend: 'Легендарно!',
    fin_legend_desc: 'Реакция как у машины. Невероятно.',
    fin_sniper: 'Снайпер!',
    fin_sniper_desc: 'Отличная точность и чувство времени.',
    fin_good: 'Хорошо!',
    fin_good_desc: 'Стабильный результат. Можно лучше!',
    fin_medium: 'Средне',
    fin_medium_desc: 'Ещё немного практики — и будет огонь.',
    fin_train: 'Тренируйся!',
    fin_train_desc: 'Чувство ритма нарабатывается. Не сдавайся!',
  },

  en: {
    tab_typing: 'Typing',
    tab_timing: 'Timing',
    settings_title: 'Settings',
    setting_lang_label: 'Language',
    setting_lang_desc: 'Russian / English',
    setting_vol_label: 'Sound Volume',
    setting_vol_desc: 'In-game sound effects',
    btn_done: 'Done',

    // Typing
    ts_setup_title: 'What to type?',
    ts_setup_desc: 'Any text, password, or phrase — timer starts on your first keypress and stops on the last correct character.',
    ts_target_label: 'Target text',
    ts_target_ph: 'e.g. 1234 or Hello World!',
    chips_quick_select: 'Quick select:',
    btn_start_test: 'Start Test →',
    lbl_seconds: 'seconds',
    lbl_cps: 'chars/s',
    lbl_progress: 'progress',
    ts_typing_ph: 'Start typing here…',
    ts_hint_init: '⏱ Timer starts on the first character',
    ts_paste_blocked: '⚠️ Paste disabled — please type manually!',
    btn_restart: '↩ Restart',
    ts_res_title_done: 'Completed!',
    res_lbl_time: 'Time',
    res_lbl_chars: 'Characters',
    btn_retry: 'Retry',
    btn_new_text: 'New Text',

    // Typing Ratings
    rate_too_short: 'Too short',
    rate_too_short_desc: 'Try a longer text for a more accurate score!',
    rate_slow: 'Slow',
    rate_slow_desc: 'Practice makes perfect. Keep going!',
    rate_medium: 'Average',
    rate_medium_desc: 'Pretty good start. A little more practice!',
    rate_good: 'Good!',
    rate_good_desc: 'Solid typing speed. You got the rhythm.',
    rate_fast: 'Fast!',
    rate_fast_desc: 'Great score. Your fingers are flying!',
    rate_insane: 'Insane!',
    rate_insane_desc: 'Incredible speed. Pure muscle memory!',

    // Timing Challenge
    tm_title: 'Timing Challenge',
    tm_desc: 'A random timestamp from 0 to 10s is given. Hit STOP exactly when the clock reaches it. 3 rounds followed by breakdown.',
    tm_target_preview_lbl: 'Target',
    tm_preview_hint: 'Hit STOP when timer hits this exact time',
    btn_start_game: 'Start Game →',
    round_prefix: 'Round',
    tm_target_lbl: 'Hit the moment',
    tm_hint_start: 'Press Start (or Spacebar) to start the timer',
    tm_hint_running: 'Press STOP (or Spacebar) at the exact moment!',
    btn_start_timer: '▶ Start',
    tm_ideal: 'Ideal',
    btn_next_round: 'Next Round →',
    tm_analytics_title: 'Results',
    tm_rounds_done: '3 rounds completed',
    an_avg_lbl: 'Avg Deviation',
    an_best_lbl: 'Best Round',
    an_score_lbl: 'Accuracy',
    btn_replay: 'Play Again',
    diff_lbl: 'Deviation',

    // Timing Ratings
    tm_r_perfect: 'Perfect!',
    tm_r_great: 'Great!',
    tm_r_good: 'Good',
    tm_r_decent: 'Decent',
    tm_r_miss: 'Missed',
    tm_r_fail: 'Way off',

    // Final Ratings
    fin_legend: 'Legendary!',
    fin_legend_desc: 'Machine-like reaction. Incredible precision.',
    fin_sniper: 'Sniper!',
    fin_sniper_desc: 'Superb timing and rhythm feeling.',
    fin_good: 'Good!',
    fin_good_desc: 'Solid consistency. Room to sharpen up!',
    fin_medium: 'Average',
    fin_medium_desc: 'Keep training — you will get there.',
    fin_train: 'Keep Trying!',
    fin_train_desc: 'Rhythm sense takes practice. Don’t give up!',
  }
};

/* ════════════════════════════════
   SETTINGS STATE & AUDIO ENGINE
════════════════════════════════ */
const settings = {
  lang: localStorage.getItem('ch_lang') || 'ru',
  volume: parseInt(localStorage.getItem('ch_volume') || '80', 10),
  muted: localStorage.getItem('ch_muted') === 'true',
};

// Web Audio Liquid Synthesizer & Sound File Loader
let audioCtx = null;
let clickAudioBuffer = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (AudioCtx) audioCtx = new AudioCtx();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Preload sound.wav into memory for zero-latency button clicks
async function loadClickSound() {
  try {
    const response = await fetch('sound.wav');
    const arrayBuffer = await response.arrayBuffer();
    const ctx = getAudioContext();
    if (ctx) {
      ctx.decodeAudioData(arrayBuffer, (decoded) => {
        clickAudioBuffer = decoded;
      }, (err) => {
        // decoding error fallback
      });
    }
  } catch (e) {
    // Audio element fallback handles file:// or offline protocols
  }
}
loadClickSound();

function playSound(type) {
  if (settings.muted || settings.volume <= 0) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const gain = ctx.createGain();
    const now = ctx.currentTime;
    const vol = (settings.volume / 100) * 0.35;
    gain.gain.setValueAtTime(vol, now);
    gain.connect(ctx.destination);

    if (type === 'click') {
      // Use uploaded sound.wav for button clicks
      if (clickAudioBuffer) {
        const source = ctx.createBufferSource();
        source.buffer = clickAudioBuffer;
        source.connect(gain);
        source.start(now);
      } else {
        // Instant HTML5 Audio fallback
        const audio = new Audio('sound.wav');
        audio.volume = Math.min(1, Math.max(0, (settings.volume / 100)));
        audio.play().catch(() => {});
      }
      return;
    }

    const osc = ctx.createOscillator();
    osc.connect(gain);

    if (type === 'bubble') {
      // Soft water droplet blip
      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
      osc.start(now);
      osc.stop(now + 0.09);
    } else if (type === 'stop') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(260, now + 0.14);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    } else if (type === 'win') {
      // Harmonic liquid chime
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.setValueAtTime(880, now + 0.08); // A5
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    }
  } catch (e) {
    // Ignore audio restrictions
  }
}

/* ════════════════════════════════
   APPLY LANGUAGE TO DOM
════════════════════════════════ */
function t(key) {
  const dict = i18n[settings.lang] || i18n.ru;
  return dict[key] || key;
}

function updateLanguage(lang) {
  settings.lang = lang;
  localStorage.setItem('ch_lang', lang);

  // Update active state on lang buttons
  document.getElementById('lang-ru').classList.toggle('active', lang === 'ru');
  document.getElementById('lang-en').classList.toggle('active', lang === 'en');

  // Update all [data-i18n] text nodes
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t(key)) el.textContent = t(key);
  });

  // Update placeholders [data-i18n-ph]
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.dataset.i18nPh;
    if (t(key)) el.placeholder = t(key);
  });

  // Update dynamic round badge if on timing screen
  if (tmState.round > 0) {
    tmRoundBadge.textContent = `${t('round_prefix')} ${tmState.round} / ${TM_ROUNDS}`;
  }
}

/* ════════════════════════════════
   SETTINGS MODAL LOGIC
════════════════════════════════ */
const btnSettings       = document.getElementById('btn-settings');
const modalBackdrop     = document.getElementById('modal-settings-backdrop');
const btnCloseSettings  = document.getElementById('btn-close-settings');
const btnSaveSettings   = document.getElementById('btn-save-settings');
const btnLangRu         = document.getElementById('lang-ru');
const btnLangEn         = document.getElementById('lang-en');
const volSlider         = document.getElementById('vol-slider');
const volValueDisplay   = document.getElementById('vol-value-display');
const btnMute           = document.getElementById('btn-mute');
const volIcon           = document.getElementById('vol-icon');

function openSettings() {
  modalBackdrop.classList.remove('hidden');
  playSound('click');
}

function closeSettings() {
  modalBackdrop.classList.add('hidden');
  playSound('click');
}

btnSettings.addEventListener('click', openSettings);
btnCloseSettings.addEventListener('click', closeSettings);
btnSaveSettings.addEventListener('click', closeSettings);

modalBackdrop.addEventListener('click', (e) => {
  if (e.target === modalBackdrop) closeSettings();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modalBackdrop.classList.contains('hidden')) {
    closeSettings();
  }
});

btnLangRu.addEventListener('click', () => {
  updateLanguage('ru');
  playSound('bubble');
});

btnLangEn.addEventListener('click', () => {
  updateLanguage('en');
  playSound('bubble');
});

// Volume Slider Sync
function updateVolumeUI() {
  volSlider.value = settings.volume;
  volValueDisplay.textContent = settings.muted ? '0%' : `${settings.volume}%`;
  
  if (settings.muted || settings.volume === 0) {
    volIcon.textContent = '🔇';
  } else if (settings.volume < 40) {
    volIcon.textContent = '🔉';
  } else {
    volIcon.textContent = '🔊';
  }
}

volSlider.addEventListener('input', (e) => {
  settings.volume = parseInt(e.target.value, 10);
  settings.muted = settings.volume === 0;
  localStorage.setItem('ch_volume', settings.volume);
  localStorage.setItem('ch_muted', settings.muted);
  updateVolumeUI();
  playSound('bubble');
});

btnMute.addEventListener('click', () => {
  settings.muted = !settings.muted;
  localStorage.setItem('ch_muted', settings.muted);
  updateVolumeUI();
  if (!settings.muted) playSound('bubble');
});

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
    playSound('click');

    // Stop timing game and reset active round UI if leaving tab during a run
    if (target !== 'timing') {
      if (tmState.running) {
        tmStop();
        btnTmGo.style.display = '';
        btnTmStop.disabled = true;
        btnTmStop.classList.remove('active');
        tmHint.textContent = t('tm_hint_start');
        tmClock.textContent = '0:00';
        tmBarFill.style.width = '0%';
      }
    }
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
  [...target].forEach((ch, i) => {
    const sp = document.createElement('span');
    sp.className = 'char';
    sp.textContent = ch === ' ' ? '\u00A0' : ch;
    
    if (i < typed.length) {
      sp.classList.add(typed[i] === ch ? 'correct' : 'wrong');
    } else {
      sp.classList.add('pending');
    }

    if (typed.length === 0 && i === 0) {
      sp.classList.add('cursor-before');
    } else if (typed.length > 0 && i === typed.length - 1) {
      sp.classList.add('cursor-after');
    }

    tsTargetDisp.appendChild(sp);
  });
}

function tsRating(cps, chars) {
  if (chars < 4) return { icon: '🤔', title: t('rate_too_short'), text: t('rate_too_short_desc') };
  if (cps < 2)  return { icon: '🐢', title: t('rate_slow'),      text: t('rate_slow_desc') };
  if (cps < 4)  return { icon: '🚶', title: t('rate_medium'),    text: t('rate_medium_desc') };
  if (cps < 6)  return { icon: '🚴', title: t('rate_good'),      text: t('rate_good_desc') };
  if (cps < 9)  return { icon: '⚡', title: t('rate_fast'),      text: t('rate_fast_desc') };
  return               { icon: '🚀', title: t('rate_insane'),    text: t('rate_insane_desc') };
}

/* ── Typing: setup ── */
tsTargetInput.addEventListener('input', () => {
  tsBtnClear.classList.toggle('vis', tsTargetInput.value.length > 0);
});
tsBtnClear.addEventListener('click', () => {
  tsTargetInput.value = '';
  tsBtnClear.classList.remove('vis');
  tsTargetInput.focus();
  playSound('click');
});
tsChips.forEach(c => {
  c.addEventListener('click', () => {
    tsTargetInput.value = c.dataset.val;
    tsBtnClear.classList.add('vis');
    tsTargetInput.focus();
    playSound('bubble');
  });
});
tsBtnStart.addEventListener('click', tsStartTest);
tsTargetInput.addEventListener('keydown', e => { if (e.key === 'Enter') tsStartTest(); });

function tsStartTest() {
  const val = tsTargetInput.value.trim();
  if (!val || val.length < 2) {
    tsTargetInput.classList.add('err');
    setTimeout(() => tsTargetInput.classList.remove('err'), 600);
    tsTargetInput.focus();
    return;
  }
  playSound('click');
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
  tsHint.textContent         = t('ts_hint_init');

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

/* ── Typing: input & paste protection ── */
tsTypingInput.addEventListener('paste', (e) => {
  e.preventDefault();
  tsHint.textContent = t('ts_paste_blocked');
  tsHint.style.opacity = '1';
  setTimeout(() => {
    if (tsState.running) tsHint.style.opacity = '0';
    else tsHint.textContent = t('ts_hint_init');
  }, 1500);
});

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

  const hasErr = !target.startsWith(typed);
  tsTypingInput.classList.toggle('err', hasErr);

  playSound(hasErr ? 'click' : 'bubble');

  if (correct === target.length) tsFinish();
});

function tsFinish() {
  tsState.done = true;
  tsTimerStop();
  tsTypingInput.disabled  = true;
  tsTypingInput.classList.remove('err');
  tsTypingInput.classList.add('done');
  playSound('win');

  const elapsed = Math.max(10, tsState.endTime - tsState.startTime);
  const chars   = tsState.target.length;
  const cps     = parseFloat(tsCPS(chars, elapsed));
  const wpm     = tsWPM(chars, elapsed);
  const rating  = tsRating(cps, chars);

  tsResIcon.textContent  = rating.icon;
  tsResTitle.textContent = rating.title;
  tsResSub.textContent   = rating.text;
  tsResTime.textContent  = fmt(elapsed) + (settings.lang === 'ru' ? 'с' : 's');
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
  playSound('click');
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

/* Format for timing display: "s:cc" (centiseconds) */
function tmFmt(ms) {
  const s  = Math.floor(ms / 1000);
  const cc = Math.floor((ms % 1000) / 10);
  return `${s}:${String(cc).padStart(2, '0')}`;
}

/* Generate random target in exact 10ms steps (1.00s .. 8.99s) */
function tmRandomTarget() {
  return 1000 + Math.floor(Math.random() * 800) * 10;
}

function tmStop() {
  clearInterval(tmState.interval);
  tmState.running = false;
}

btnTmStart.addEventListener('click', tmBeginGame);
btnTmReplay.addEventListener('click', tmBeginGame);

function tmBeginGame() {
  playSound('click');
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

  tmRoundBadge.textContent = `${t('round_prefix')} ${tmState.round} / ${TM_ROUNDS}`;
  tmTargetTime.textContent = tmFmt(tmState.targetMs);
  tmClock.textContent      = '0:00';
  tmBarFill.style.width    = '0%';

  btnTmGo.style.display   = '';
  btnTmStop.disabled      = true;
  btnTmStop.classList.remove('active');
  tmHint.textContent      = t('tm_hint_start');

  showPanel(tmPanels, 'tm-round');
}

btnTmGo.addEventListener('click', tmLaunch);

function tmLaunch() {
  playSound('bubble');
  btnTmGo.style.display = 'none';
  btnTmStop.disabled    = false;
  btnTmStop.classList.add('active');
  tmHint.textContent    = t('tm_hint_running');

  tmState.startTime = performance.now();
  tmState.running   = true;

  tmState.interval = setInterval(() => {
    if (!tmState.running) return;
    const elapsed = performance.now() - tmState.startTime;

    if (elapsed >= TM_DURATION) {
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

/* Keyboard controls (Space / Enter) for Timing game */
document.addEventListener('keydown', (e) => {
  const isTimingTab = !document.getElementById('tab-content-timing').classList.contains('hidden');
  if (!isTimingTab) return;

  if (e.code === 'Space' || e.key === ' ' || e.key === 'Enter') {
    const roundPanel = document.getElementById('tm-round');
    const roundResultPanel = document.getElementById('tm-round-result');
    const introPanel = document.getElementById('tm-intro');
    const analyticsPanel = document.getElementById('tm-analytics');

    if (!roundPanel.classList.contains('hidden')) {
      e.preventDefault();
      if (!tmState.running && btnTmGo.style.display !== 'none') {
        tmLaunch();
      } else if (tmState.running && !btnTmStop.disabled) {
        const elapsed = performance.now() - tmState.startTime;
        tmRegisterPress(elapsed);
      }
    } else if (!roundResultPanel.classList.contains('hidden')) {
      e.preventDefault();
      btnTmNext.click();
    } else if (!introPanel.classList.contains('hidden')) {
      e.preventDefault();
      btnTmStart.click();
    } else if (!analyticsPanel.classList.contains('hidden')) {
      e.preventDefault();
      btnTmReplay.click();
    }
  }
});

function tmRegisterPress(elapsed) {
  tmStop();
  playSound('stop');
  btnTmStop.disabled = true;
  btnTmStop.classList.remove('active');

  const clampedElapsed = Math.min(elapsed, TM_DURATION);
  tmBarFill.style.width = ((clampedElapsed / TM_DURATION) * 100) + '%';
  tmClock.textContent   = tmFmt(clampedElapsed);

  const diff = Math.round(elapsed - tmState.targetMs);
  const absDiff = Math.abs(diff);

  tmState.rounds.push({
    round:    tmState.round,
    targetMs: tmState.targetMs,
    pressedMs: clampedElapsed,
    diff:      diff,
    absDiff:   absDiff,
  });

  setTimeout(() => tmShowRoundResult(diff, absDiff), 250);
}

function tmRoundRating(absDiff) {
  if (absDiff < 30)  return { icon: '🎯', title: t('tm_r_perfect'), color: 'var(--green)' };
  if (absDiff < 80)  return { icon: '✨', title: t('tm_r_great'),   color: 'var(--green)' };
  if (absDiff < 160) return { icon: '👍', title: t('tm_r_good'),    color: 'var(--ac-vibrant)' };
  if (absDiff < 300) return { icon: '😐', title: t('tm_r_decent'),  color: 'var(--yellow)' };
  if (absDiff < 500) return { icon: '😬', title: t('tm_r_miss'),    color: 'var(--yellow)' };
  return                    { icon: '💀', title: t('tm_r_fail'),    color: 'var(--red)' };
}

function tmShowRoundResult(diff, absDiff) {
  const r = tmRoundRating(absDiff);
  tmRrIcon.textContent  = r.icon;
  tmRrTitle.textContent = r.title;

  const sign = diff > 0 ? '+' : '';
  const msUnit = settings.lang === 'ru' ? 'мс' : 'ms';
  tmRrDiff.textContent  = `${t('diff_lbl')}: ${sign}${diff} ${msUnit}`;

  const MAX = 500;
  const clamped = Math.max(-MAX, Math.min(MAX, diff));
  const center   = 50;
  const fillPct  = (Math.abs(clamped) / MAX) * 50;
  if (diff < 0) {
    tmRrBar.style.left   = (center - fillPct) + '%';
    tmRrBar.style.width  = fillPct + '%';
  } else {
    tmRrBar.style.left   = center + '%';
    tmRrBar.style.width  = fillPct + '%';
  }
  tmRrBar.style.background = r.color;

  showPanel(tmPanels, 'tm-round-result');
}

btnTmNext.addEventListener('click', () => {
  playSound('click');
  if (tmState.round < TM_ROUNDS) {
    tmBeginRound();
  } else {
    tmShowAnalytics();
  }
});

/* ── Analytics ── */
function tmShowAnalytics() {
  playSound('win');
  const rounds = tmState.rounds;
  anRounds.innerHTML = '';
  const msUnit = settings.lang === 'ru' ? 'мс' : 'ms';

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
      <span class="an-diff" style="color:${rating.color}">${sign}${r.diff}${msUnit}</span>
      <span class="an-pct">${pct}%</span>
    `;
    anRounds.appendChild(row);
  });

  const avgDiff  = Math.round(rounds.reduce((s, r) => s + r.absDiff, 0) / rounds.length);
  const bestDiff = Math.min(...rounds.map(r => r.absDiff));
  const accuracy = Math.max(0, Math.round(100 - (avgDiff / 500) * 100));

  anAvg.textContent   = avgDiff + msUnit;
  anBest.textContent  = bestDiff + msUnit;
  anScore.textContent = accuracy + '%';

  let finalRating;
  if (accuracy >= 94)      finalRating = { icon: '🏆', title: t('fin_legend'), text: t('fin_legend_desc') };
  else if (accuracy >= 85) finalRating = { icon: '🎯', title: t('fin_sniper'), text: t('fin_sniper_desc') };
  else if (accuracy >= 70) finalRating = { icon: '✨', title: t('fin_good'),   text: t('fin_good_desc') };
  else if (accuracy >= 50) finalRating = { icon: '👀', title: t('fin_medium'), text: t('fin_medium_desc') };
  else                     finalRating = { icon: '🐢', title: t('fin_train'),  text: t('fin_train_desc') };

  tmFinalIcon.textContent = finalRating.icon;
  anRating.innerHTML = `<strong>${finalRating.title}</strong> — ${finalRating.text}`;

  showPanel(tmPanels, 'tm-analytics');
}

/* ════════════════════════════════
   INITIALIZATION
════════════════════════════════ */
updateLanguage(settings.lang);
updateVolumeUI();
showPanel(tsPanels, 'ts-setup');
showPanel(tmPanels, 'tm-intro');
