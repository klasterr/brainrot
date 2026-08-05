/* ══════════════════════════════════════════════════════════════════════
   SKIBIDI CORE — BRAINROT ENGINE v9.81
   one file, zero dependencies, all aura
   ══════════════════════════════════════════════════════════════════════ */
(() => {
'use strict';

const $  = (id) => document.getElementById(id);
const R  = (a, b) => a + Math.random() * (b - a);
const RI = (a, b) => Math.floor(R(a, b + 1));
const pick = (arr) => arr[RI(0, arr.length - 1)];
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

/* ───────────────────────── LEXICON ───────────────────────── */
const WORDS = [
  'SKIBIDI','GYATT','RIZZ','SIGMA','OHIO','FANUM TAX','MEWING','LOOKSMAXXING',
  'MOGGING','AURA FARMING','NPC BEHAVIOR','GOOFY AHH','QUANDALE DINGLE',
  'DELULU','BUSSIN','NO CAP','FR FR','ON GOD','SHEESH','SKILL ISSUE',
  'TOUCH GRASS','L + RATIO','GRIMACE SHAKE','BABY GRONK','LEVEL 10 GYATT',
  'TRALALERO TRALALA','BOMBARDIRO CROCODILO','TUNG TUNG SAHUR',
  'BALLERINA CAPPUCCINA','LIRILI LARILA','CHIMPANZINI BANANINI',
  'BRR BRR PATAPIM','CAPPUCCINO ASSASSINO','SIGMA GRINDSET','ONLY IN OHIO',
  'CERTIFIED HOOD CLASSIC','BACKROOMS','ENTITY 404','GOOFY GOOBER',
  'AMOGUS','SUSSY BAKA','GLIZZY GLADIATOR','BETA MELTDOWN','ALPHA WOLF PDF',
  'CAUGHT IN 4K','RATIO + FANUM TAXED','MAX AURA','NEGATIVE AURA'
];

const DEFS = [
  'a state of being. also a verb. also illegal in 3 states.',
  'measured in kilograms per hectare of aura.',
  'scientists have stopped trying to explain this one.',
  'first documented in Ohio, 2023. never recovered.',
  'if you understand this you have already lost.',
  'certified hood classic. approved by the toilet council.',
  'this word has been fanum taxed twice.',
  'linguists cried. the algorithm rejoiced.',
  'do NOT say this out loud in front of your parents.',
  'peak Italian brainrot engineering.',
  'sigma males use this 400x per day (source: trust me).',
  'unlocks +9000 aura when whispered into a mirror.',
  'the ancient scrolls said nothing about this.',
  'your teacher confiscated three of these today.'
];

const KICKERS = [
  'CURRENTLY TRENDING IN OHIO','LIVE FROM THE BACKROOMS','SIGMA APPROVED',
  'FANUM TAX BUREAU BULLETIN','SKIBIDI TOILET HIGH COUNCIL','CERTIFIED GYATT ZONE',
  'BREAKING: AURA MARKET CRASHES','MEWING ADVISORY LEVEL: SEVERE',
  'ALGORITHM STATUS: FEEDING','ATTENTION SPAN: 0.4 SECONDS'
];

const COMBOS = [
  'W COMBO','CERTIFIED SIGMA','+500 AURA','GYATT DETECTED','WHAT THE SIGMA',
  'MOGGED','FANUM TAXED','SHEEEESH','BUSSIN BUSSIN','LOOKSMAXXED',
  'CAUGHT IN 4K','RIZZ OVERFLOW','OHIO INCIDENT','SKIBIDI CONFIRMED'
];

const NAMES = [
  'skibidi_enjoyer','ohio_final_boss','gyattmaster69','not_a_npc','mewing_24_7',
  'fanum_tax_collector','sigma_grindset_ceo','tralalero_official','baby_gronk_fan',
  'quandale.dingle','backrooms_janitor','rizzler_supreme','goofy_ahh_uncle',
  'cappuccino_assassino','toilet_cam_operator'
];

const COMMENT_TXT = [
  'bro the third pane is carrying this whole video',
  'nobody: ... this website: SKIBIDI',
  'my attention span could never',
  'why is the toilet spinning 😭😭😭',
  'this is the peak of human civilization',
  'i can hear the colors',
  'teacher walked past. cooked.',
  'the subway surfers gameplay is not even the same game',
  'chat is this real',
  'i have been mewing for 6 hours straight',
  'my dad found this open on the family computer',
  'ohio residents can confirm',
  'lost 40 aura just by reading this',
  'the algorithm sent me here and i cannot leave',
  'brb touching grass (never coming back)',
  'this cured my depression and gave me 4 new ones',
  '💀💀💀💀💀💀💀💀',
  'somebody call the fanum tax bureau',
  'sir this is a wendys',
  'i showed my grandma. she started mewing.'
];

const LORE = [
  '🚽 SKIBIDI TOILET SEASON 74 CONFIRMED','💀 OHIO DECLARED A LIQUID',
  '📈 AURA UP 4000% PREMARKET','🧴 LOOKSMAXXING NOW A COLLEGE MAJOR',
  '🍔 FANUM TAX RATE RAISED TO 91%','😤 MEWING BANNED IN 12 COUNTRIES',
  '🇮🇹 TRALALERO TRALALA SIGNS WITH REAL MADRID','🧠 ATTENTION SPAN DELISTED',
  '🎮 SUBWAY SURFERS ACHIEVES SENTIENCE','🔥 GYATT LEVELS EXCEED SAFE LIMIT',
  '👽 ENTITY 404 SPOTTED IN THE BACKROOMS','🥤 GRIMACE SHAKE RETURNS. RUN.'
];

const EMOJI = ['💀','🔥','😭','🚽','🗿','😤','🤑','👽','🤡','🥶','💯','⚡','🍌','☕','🦈','🐊','🎺','😈','🫩','🧠','📉','🥵'];

const ACHIEVEMENTS = [
  { id:'first',    at:()=>state.taps>=1,   t:'FIRST TAP',            d:'you did the little clicky thing. +100 aura.' },
  { id:'tap25',    at:()=>state.taps>=25,  t:'CERTIFIED TAPPER',     d:'25 taps. your finger is now sigma.' },
  { id:'tap100',   at:()=>state.taps>=100, t:'GYATT OF THE YEAR',    d:'100 taps. touch grass immediately.' },
  { id:'half',     at:()=>state.rot>=50,   t:'50% BRAINROT',         d:'point of no return acknowledged.' },
  { id:'full',     at:()=>state.rot>=100,  t:'TOTAL BRAINROT',       d:'your prefrontal cortex has left the chat.' },
  { id:'nuke',     at:()=>state.nukes>=1,  t:'NUCLEAR SKIBIDI',      d:'you pressed the big red one. legend.' },
  { id:'nuke3',    at:()=>state.nukes>=3,  t:'OHIO RESIDENT',        d:'three nukes. you live here now.' },
  { id:'coins',    at:()=>state.coins>=50, t:'SURFER SUPREME',       d:'the auto-player did all the work. W.' },
  { id:'kills',    at:()=>state.kills>=20, t:'TOILET SLAYER',        d:'20 toilets. the cameraman salutes you.' },
  { id:'chill',    at:()=>state.chillUsed, t:'MERCY',                d:'you enabled chill mode. respectable.' },
  { id:'idle',     at:()=>state.seconds>=90,t:'ATTENTION SPAN GOD',  d:'90 seconds on one page in 2026. unheard of.' },
  { id:'konami',   at:()=>state.konami,    t:'↑↑↓↓←→←→BA',           d:'sigma mode unlocked. the grindset is real.' }
];

/* ───────────────────────── STATE ───────────────────────── */
const state = {
  rot:0, aura:0, rizz:0, tax:0, taps:0, coins:0, kills:0,
  nukes:0, seconds:0, chaos:0.25, chill:false, muted:false,
  chillUsed:false, konami:false, running:false, nuking:false
};

const prefersCalm = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ══════════════════════════ BOOT SEQUENCE ══════════════════════════ */
const BOOT_LINES = [
  'mounting <b>/dev/toilet</b> ................ ok',
  'loading skibidi kernel modules .......... ok',
  'calibrating gyatt sensors ............... 11/10',
  'downloading 4.2 TB of subway surfers .... ok',
  'establishing uplink to <b>OHIO</b> ............ ok',
  'fanum tax handshake ..................... paid',
  'attention span ..................... NOT FOUND',
  'brainrot engine <b>ONLINE</b>'
];

(function paintBoot(){
  const log = $('bootLog');
  BOOT_LINES.forEach((line, i) => {
    const li = document.createElement('li');
    li.innerHTML = line;
    li.style.animationDelay = (i * 0.16) + 's';
    log.appendChild(li);
  });
})();

/* ══════════════════════════ AUDIO: HOMEMADE PHONK ══════════════════════════ */
const Audio_ = (() => {
  let ctx = null, master = null, timer = null, step = 0, noiseBuf = null;
  const SCALE = [55, 58.27, 65.41, 73.42, 82.41, 87.31, 98]; // A minor-ish, low
  const BASSLINE = [0,0,3,0, 5,0,3,2, 0,0,3,0, 6,5,3,2];

  function makeNoise(){
    const len = ctx.sampleRate * 0.4;
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    return buf;
  }

  function init(){
    if (ctx) return;
    const AC = window.AudioContext || window['webkitAudioContext'];
    if (!AC) return;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.22;
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -18; comp.ratio.value = 12;
    master.connect(comp).connect(ctx.destination);
    noiseBuf = makeNoise();
  }

  function env(node, t, peak, dur, curve = 0.008){
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + curve);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    node.connect(g).connect(master);
    return g;
  }

  function kick(t){
    const o = ctx.createOscillator();
    o.type = 'sine';
    o.frequency.setValueAtTime(170, t);
    o.frequency.exponentialRampToValueAtTime(42, t + 0.16);
    env(o, t, 1.0, 0.30);
    o.start(t); o.stop(t + 0.34);
  }

  function hat(t, loud){
    const s = ctx.createBufferSource(); s.buffer = noiseBuf;
    const hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 8200;
    s.connect(hp);
    env(hp, t, loud ? 0.18 : 0.08, 0.05);
    s.start(t); s.stop(t + 0.07);
  }

  function snare(t){
    const s = ctx.createBufferSource(); s.buffer = noiseBuf;
    const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 1900; bp.Q.value = 0.8;
    s.connect(bp);
    env(bp, t, 0.30, 0.16);
    s.start(t); s.stop(t + 0.2);
  }

  function bass(t, semi){
    const f = SCALE[semi % SCALE.length];
    const o = ctx.createOscillator(); o.type = 'sawtooth'; o.frequency.value = f;
    const o2 = ctx.createOscillator(); o2.type = 'square'; o2.frequency.value = f * 2.005;
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass';
    lp.frequency.setValueAtTime(900, t);
    lp.frequency.exponentialRampToValueAtTime(240, t + 0.24);
    o.connect(lp); o2.connect(lp);
    env(lp, t, 0.42, 0.26);
    o.start(t); o2.start(t); o.stop(t + 0.3); o2.stop(t + 0.3);
  }

  function blip(t){
    const o = ctx.createOscillator(); o.type = 'square';
    o.frequency.setValueAtTime(R(600, 1400), t);
    o.frequency.exponentialRampToValueAtTime(R(200, 500), t + 0.1);
    env(o, t, 0.10, 0.14);
    o.start(t); o.stop(t + 0.16);
  }

  function tick(){
    if (!ctx || state.muted) { step++; return; }
    const t = ctx.currentTime + 0.03;
    const s = step % 16;
    if (s % 4 === 0) kick(t);
    if (s === 10 || s === 14) kick(t);
    if (s === 8 || s === 12) snare(t);
    hat(t, s % 2 === 0);
    bass(t, BASSLINE[s]);
    if (state.chaos > 0.55 && Math.random() < 0.3) blip(t);
    Beat.hit(s);
    step++;
  }

  return {
    start(){
      init();
      if (!ctx) return;
      if (ctx.state === 'suspended') ctx.resume();
      if (!timer) timer = setInterval(tick, 145);
    },
    setTempo(ms){ if (timer) { clearInterval(timer); timer = setInterval(tick, ms); } },
    boom(){
      if (!ctx || state.muted) return;
      const t = ctx.currentTime;
      const o = ctx.createOscillator(); o.type = 'sine';
      o.frequency.setValueAtTime(240, t);
      o.frequency.exponentialRampToValueAtTime(22, t + 0.7);
      env(o, t, 1.4, 0.85);
      o.start(t); o.stop(t + 0.9);
      const s = ctx.createBufferSource(); s.buffer = noiseBuf;
      const lp = ctx.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value = 700;
      s.connect(lp); env(lp, t, 0.5, 0.5);
      s.start(t); s.stop(t + 0.5);
    },
    coin(){
      if (!ctx || state.muted) return;
      const t = ctx.currentTime;
      [1318, 1760].forEach((f, i) => {
        const o = ctx.createOscillator(); o.type = 'square'; o.frequency.value = f;
        env(o, t + i * 0.07, 0.12, 0.1);
        o.start(t + i * 0.07); o.stop(t + i * 0.07 + 0.12);
      });
    },
    suspend(){ if (ctx && ctx.state === 'running') ctx.suspend(); },
    resume(){ if (ctx && ctx.state === 'suspended' && state.running) ctx.resume(); }
  };
})();

/* ══════════════════════════ BEAT BUS ══════════════════════════ */
const Beat = {
  v: 0,
  hit(s){
    this.v = 1;
    if (s % 4 === 0) {
      const bt = $('beatText');
      bt.textContent = pick(['SKIBIDI DOP DOP YES YES','DOM DOM YES YES','BRR BRR PATAPIM','TUNG TUNG TUNG SAHUR','AAAAH AAAH AAAH']);
    }
    if (Math.random() < 0.5) Runner.jumpHint();
  },
  decay(dt){
    this.v = Math.max(0, this.v - dt * 4.5);
    document.documentElement.style.setProperty('--beat', state.chill ? (this.v * 0.3).toFixed(3) : this.v.toFixed(3));
  }
};

/* ══════════════════════════ FX CANVAS (particles / emoji rain) ══════════════════════════ */
const FX = (() => {
  const cv = $('fx'), ctx = cv.getContext('2d');
  let w = 0, h = 0, dpr = 1;
  const parts = [];

  function resize(){
    dpr = Math.min(2, window.devicePixelRatio || 1);
    w = cv.clientWidth; h = cv.clientHeight;
    cv.width = Math.floor(w * dpr); cv.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function spawn(x, y, n, power = 1){
    for (let i = 0; i < n; i++){
      if (parts.length > 420) break;
      parts.push({
        x, y,
        vx: R(-3, 3) * power,
        vy: R(-6, -1) * power,
        g: R(0.06, 0.2),
        s: R(16, 42),
        rot: R(0, 6.28),
        vr: R(-0.14, 0.14),
        life: 1,
        fade: R(0.004, 0.011),
        ch: pick(EMOJI)
      });
    }
  }

  function rain(n){
    for (let i = 0; i < n; i++){
      if (parts.length > 420) break;
      parts.push({
        x: R(0, w), y: -40,
        vx: R(-0.6, 0.6), vy: R(1.2, 4), g: 0.03,
        s: R(14, 34), rot: R(0, 6.28), vr: R(-0.05, 0.05),
        life: 1, fade: 0.0025, ch: pick(EMOJI)
      });
    }
  }

  function frame(){
    ctx.clearRect(0, 0, w, h);
    for (let i = parts.length - 1; i >= 0; i--){
      const p = parts[i];
      p.vy += p.g; p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.life -= p.fade;
      if (p.life <= 0 || p.y > h + 80){ parts.splice(i, 1); continue; }
      ctx.save();
      ctx.globalAlpha = clamp(p.life, 0, 1);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.font = p.s + 'px serif';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(p.ch, 0, 0);
      ctx.restore();
    }
  }

  window.addEventListener('resize', resize);
  resize();
  return { frame, spawn, rain, resize, count: () => parts.length };
})();

/* ══════════════════════════ PANE 1: ENDLESS RUNNER ══════════════════════════ */
const Runner = (() => {
  const cv = $('runner'), ctx = cv.getContext('2d');
  let w = 0, h = 0, dpr = 1, ground = 0;
  let py = 0, vy = 0, onGround = true, t = 0, speed = 3.4;
  const obs = [], coins = [], sky = [[], [], []];
  const NEON = ['#ff2bd6', '#00f0ff', '#c6ff00', '#8b5cf6', '#ffb300'];

  function resize(){
    dpr = Math.min(2, window.devicePixelRatio || 1);
    w = cv.clientWidth || 300; h = cv.clientHeight || 300;
    cv.width = Math.floor(w * dpr); cv.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ground = h * 0.78;
    sky.forEach((layer, li) => {
      layer.length = 0;
      const step = 34 + li * 26;
      for (let x = 0; x < w + step * 2; x += step){
        layer.push({ x, wd: step * R(0.5, 0.85), ht: R(0.1, 0.34 + li * 0.16) * h, c: pick(NEON) });
      }
    });
  }

  function jump(force){
    if (onGround){ vy = -(force || R(7.4, 9.2)); onGround = false; }
  }

  function update(dt){
    t += dt;
    speed = 3.2 + state.chaos * 5.5;

    // physics
    vy += 0.44 * (dt * 60) * 0.5 + 0.22;
    py += vy;
    if (py > 0){ py = 0; vy = 0; onGround = true; }

    // parallax
    sky.forEach((layer, li) => {
      const sp = speed * (0.18 + li * 0.28);
      layer.forEach(b => {
        b.x -= sp;
        if (b.x + b.wd < -10){ b.x += (w + 90); b.ht = R(0.1, 0.34 + li * 0.16) * h; }
      });
    });

    // spawn
    if (Math.random() < 0.022 + state.chaos * 0.02) obs.push({ x: w + 30, wd: R(16, 34), ht: R(22, 54) });
    if (Math.random() < 0.03) coins.push({ x: w + 20, y: ground - R(50, 130), r: 9, spin: 0 });

    // move + auto-jump AI
    for (let i = obs.length - 1; i >= 0; i--){
      const o = obs[i];
      o.x -= speed * 2.2;
      const px = w * 0.22;
      if (o.x - px < 78 && o.x - px > 10) jump(o.ht > 40 ? 9.6 : 8.2);
      if (o.x + o.wd < -20) obs.splice(i, 1);
    }
    for (let i = coins.length - 1; i >= 0; i--){
      const c = coins[i];
      c.x -= speed * 2.2; c.spin += 0.2;
      const px = w * 0.22, pyy = ground + py - 24;
      if (Math.abs(c.x - px) < 22 && Math.abs(c.y - pyy) < 34){
        coins.splice(i, 1);
        state.coins++; state.aura += 7;
        $('runScore').textContent = state.coins;
        if (Math.random() < 0.35) Audio_.coin();
        continue;
      }
      if (c.x < -30) coins.splice(i, 1);
    }
  }

  function draw(){
    // sky
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, '#1a0033'); g.addColorStop(0.6, '#3d0050'); g.addColorStop(1, '#08000f');
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);

    // sun
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = '#ff2bd6';
    ctx.beginPath(); ctx.arc(w * 0.72, ground - h * 0.32, h * 0.16, 0, 6.284); ctx.fill();
    ctx.globalAlpha = 1;

    // buildings
    sky.forEach((layer, li) => {
      ctx.globalAlpha = 0.28 + li * 0.24;
      layer.forEach(b => {
        ctx.fillStyle = li === 2 ? '#12001f' : b.c;
        ctx.fillRect(b.x, ground - b.ht, b.wd, b.ht);
        if (li === 2){
          ctx.fillStyle = '#ffb30055';
          for (let yy = ground - b.ht + 8; yy < ground - 8; yy += 12)
            for (let xx = b.x + 4; xx < b.x + b.wd - 5; xx += 10)
              if (Math.random() < 0.6) ctx.fillRect(xx, yy, 4, 5);
        }
      });
    });
    ctx.globalAlpha = 1;

    // ground + rails
    ctx.fillStyle = '#0d0018'; ctx.fillRect(0, ground, w, h - ground);
    ctx.strokeStyle = '#c6ff00'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(0, ground); ctx.lineTo(w, ground); ctx.stroke();
    ctx.strokeStyle = '#00f0ff88'; ctx.lineWidth = 3;
    const off = (t * speed * 40) % 46;
    for (let x = -off; x < w; x += 46){
      ctx.beginPath(); ctx.moveTo(x, ground + 6); ctx.lineTo(x + 22, ground + 6); ctx.stroke();
    }

    // obstacles
    obs.forEach(o => {
      ctx.fillStyle = '#ff2b4d';
      ctx.fillRect(o.x, ground - o.ht, o.wd, o.ht);
      ctx.fillStyle = '#fff';
      ctx.font = '12px serif'; ctx.textAlign = 'center';
      ctx.fillText('🚧', o.x + o.wd / 2, ground - o.ht - 3);
    });

    // coins
    coins.forEach(c => {
      ctx.save(); ctx.translate(c.x, c.y);
      ctx.scale(Math.max(0.25, Math.abs(Math.cos(c.spin))), 1);
      ctx.font = '20px serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('🪙', 0, 0);
      ctx.restore();
    });

    // player
    const px = w * 0.22, pyy = ground + py;
    ctx.save();
    ctx.globalAlpha = 0.35; ctx.fillStyle = '#000';
    ctx.beginPath(); ctx.ellipse(px, ground + 2, 16 + py * 0.06, 5, 0, 0, 6.284); ctx.fill();
    ctx.restore();
    ctx.save();
    ctx.translate(px, pyy - 22);
    ctx.rotate(Math.sin(t * 12) * 0.08 + (onGround ? 0 : -0.3));
    ctx.font = '40px serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(onGround ? '🏃' : '🕺', 0, 0);
    ctx.restore();

    // HUD-ish scanline flavour
    if (!state.chill){
      ctx.fillStyle = 'rgba(255,255,255,.04)';
      for (let y = (t * 60) % 6; y < h; y += 6) ctx.fillRect(0, y, w, 1);
    }
  }

  window.addEventListener('resize', resize);
  resize();
  return {
    update, draw, resize,
    jumpHint(){ if (Math.random() < 0.25) jump(); }
  };
})();

/* ══════════════════════════ WORD CANNON ══════════════════════════ */
const Cannon = (() => {
  const el = $('word'), sub = $('wordSub'), kick = $('kicker');
  let last = '';
  function fire(){
    let word = pick(WORDS);
    while (word === last) word = pick(WORDS);
    last = word;
    el.textContent = word;
    el.dataset.text = word;
    el.classList.remove('pop');
    void el.offsetWidth;
    el.classList.add('pop');
    sub.textContent = 'definition: ' + pick(DEFS);
    if (Math.random() < 0.34) kick.textContent = pick(KICKERS);
    document.title = (Math.random() < 0.5 ? '🚽 ' : '💀 ') + word + ' — SKIBIDI CORE';
  }
  return { fire };
})();

/* ══════════════════════════ MARQUEE ══════════════════════════ */
(function buildMarquee(){
  const track = $('marqueeTrack');
  const chunk = LORE.map(s => `<b>${s}</b>`).join('<i> ✦ </i>');
  track.innerHTML = chunk + '<i> ✦ </i>' + chunk + '<i> ✦ </i>';
})();

/* ══════════════════════════ COMMENTS ══════════════════════════ */
function spawnComment(){
  const box = $('comments');
  const d = document.createElement('div');
  d.className = 'cmt';
  d.innerHTML =
    `<span class="av">${pick(EMOJI)}</span>` +
    `<span><span class="who">@${pick(NAMES)}</span><br><span class="txt">${pick(COMMENT_TXT)}</span></span>` +
    `<span class="lk">♥ ${RI(1, 99)}.${RI(0, 9)}K</span>`;
  box.appendChild(d);
  setTimeout(() => d.remove(), 5200);
  while (box.children.length > 5) box.firstChild.remove();
}

/* ══════════════════════════ TOASTS / ACHIEVEMENTS ══════════════════════════ */
const unlocked = new Set();
function toast(title, body){
  const box = $('toasts');
  const d = document.createElement('div');
  d.className = 'toast';
  d.innerHTML = `<b>🏆 ${title}</b><span>${body}</span>`;
  box.appendChild(d);
  setTimeout(() => d.remove(), 4700);
  while (box.children.length > 4) box.firstChild.remove();
}
function checkAchievements(){
  ACHIEVEMENTS.forEach(a => {
    if (!unlocked.has(a.id) && a.at()){
      unlocked.add(a.id);
      toast(a.t, a.d);
      state.aura += 250;
    }
  });
}

/* ══════════════════════════ SCREEN EFFECTS ══════════════════════════ */
let shakeUntil = 0, shakeMag = 0;
function shake(mag, ms){
  if (state.chill) return;
  shakeMag = Math.max(shakeMag, mag);
  shakeUntil = Math.max(shakeUntil, performance.now() + ms);
}
function flash(){
  if (state.chill) return;
  const f = $('flash');
  f.classList.remove('go'); void f.offsetWidth; f.classList.add('go');
}
function bigWord(txt){
  const b = $('bigword');
  b.textContent = txt;
  b.classList.remove('go'); void b.offsetWidth; b.classList.add('go');
}

/* ══════════════════════════ DVD LOGO ══════════════════════════ */
const DVD = (() => {
  const el = $('dvd');
  let x = 80, y = 200, vx = 2.3, vy = 1.7;
  const words = ['GYATT','SKIBIDI','SIGMA','RIZZ','OHIO','+AURA','FANUM'];
  function step(){
    const w = innerWidth - el.offsetWidth, h = innerHeight - el.offsetHeight;
    x += vx; y += vy;
    let bounced = false;
    if (x <= 0){ x = 0; vx = Math.abs(vx); bounced = true; }
    if (x >= w){ x = w; vx = -Math.abs(vx); bounced = true; }
    if (y <= 0){ y = 0; vy = Math.abs(vy); bounced = true; }
    if (y >= h){ y = h; vy = -Math.abs(vy); bounced = true; }
    if (bounced){
      el.textContent = pick(words);
      el.style.color = pick(['#fff', '#c6ff00', '#00f0ff', '#ffb300']);
      state.aura += 25;
      if (!state.chill) FX.spawn(x + 40, y + 20, 5, 0.7);
    }
    el.style.transform = `translate(${x}px,${y}px)`;
  }
  return { step };
})();

/* ══════════════════════════ NUKE ══════════════════════════ */
function nuke(){
  if (state.nuking) return;
  state.nuking = true;
  state.nukes++;
  state.rot = clamp(state.rot + 34, 0, 100);
  state.aura += 9999;
  document.body.classList.add('nuking');
  $('nukeBtn').disabled = true;
  Audio_.boom();
  Audio_.setTempo(105);
  flash();
  bigWord(pick(['SKIBIDI', 'WHAT THE SIGMA', 'OHIO', 'GYATT', '💀💀💀']));
  shake(14, 5200);
  state.chaos = 1;

  const burst = setInterval(() => {
    FX.spawn(R(0, innerWidth), R(innerHeight * 0.3, innerHeight), 12, 1.6);
    FX.rain(6);
    if (Math.random() < 0.5) bigWord(pick(['SKIBIDI', 'DOP DOP', 'YES YES', 'AAAAH', 'BRAINROT']));
  }, 420);

  setTimeout(() => {
    clearInterval(burst);
    document.body.classList.remove('nuking');
    document.body.style.filter = '';
    Audio_.setTempo(145);
    $('nukeBtn').disabled = false;
    state.nuking = false;
    toast('NUKE COOLED DOWN', 'the toilets are regrouping. go again.');
  }, 7000);
}

/* ══════════════════════════ TAP ══════════════════════════ */
function tap(x, y){
  state.taps++;
  state.aura += RI(20, 140);
  state.rizz += RI(1, 6);
  state.tax += RI(3, 40);
  state.rot = clamp(state.rot + 1.1, 0, 100);
  state.kills += Math.random() < 0.4 ? 1 : 0;
  FX.spawn(x, y, RI(6, 14), 1.1);
  const c = $('combo');
  c.textContent = pick(COMBOS) + ' ×' + state.taps;
  c.style.color = pick(['#ffb300', '#c6ff00', '#00f0ff', '#ff2bd6']);
  shake(4, 160);
  Cannon.fire();
  if (state.taps % 10 === 0){ Audio_.boom(); bigWord('+' + state.taps * 100 + ' AURA'); }
  checkAchievements();
}

/* ══════════════════════════ CONTROLS ══════════════════════════ */
function setChill(on){
  state.chill = on;
  if (on) state.chillUsed = true;
  document.body.classList.toggle('chill', on);
  const b = $('chillBtn');
  b.setAttribute('aria-pressed', String(on));
  b.textContent = on ? '🧘 CHILL: ON' : '🧘 CHILL MODE';
  checkAchievements();
}
function setMute(on){
  state.muted = on;
  const b = $('muteBtn');
  b.setAttribute('aria-pressed', String(on));
  b.textContent = on ? '🔇 MUTED' : '🔊 PHONK';
}

$('chillBtn').addEventListener('click', () => setChill(!state.chill));
$('muteBtn').addEventListener('click', () => setMute(!state.muted));
$('nukeBtn').addEventListener('click', (e) => { e.stopPropagation(); nuke(); });
$('tapBtn').addEventListener('click', (e) => { e.stopPropagation(); tap(e.clientX, e.clientY); });

$('app').addEventListener('pointerdown', (e) => {
  if (e.target.closest('button')) return;
  tap(e.clientX, e.clientY);
});

let lastMove = 0;
window.addEventListener('pointermove', (e) => {
  if (!state.running || state.chill) return;
  const now = performance.now();
  if (now - lastMove < 42) return;
  lastMove = now;
  FX.spawn(e.clientX, e.clientY, 1, 0.35);
});

/* konami */
const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let kIdx = 0;
window.addEventListener('keydown', (e) => {
  const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
  kIdx = (k === KONAMI[kIdx]) ? kIdx + 1 : (k === KONAMI[0] ? 1 : 0);
  if (kIdx === KONAMI.length){
    kIdx = 0; state.konami = true;
    document.body.style.filter = 'invert(1) hue-rotate(90deg)';
    setTimeout(() => { if (!state.nuking) document.body.style.filter = ''; }, 4000);
    bigWord('SIGMA MODE');
    Audio_.boom(); shake(10, 900);
    checkAchievements();
  }
  if (e.code === 'Space' && state.running){ e.preventDefault(); tap(innerWidth / 2, innerHeight / 2); }
  if (k === 'n' && state.running) nuke();
});

document.addEventListener('visibilitychange', () => {
  if (document.hidden) Audio_.suspend(); else Audio_.resume();
});

/* ══════════════════════════ HUD PAINT ══════════════════════════ */
function paintHUD(){
  $('meterFill').style.width = state.rot.toFixed(1) + '%';
  $('meterPct').textContent = Math.round(state.rot) + '%' +
    (state.rot >= 100 ? ' — TOTAL BRAINROT' : '');
  $('statAura').textContent = (state.aura >= 0 ? '+' : '') + Math.round(state.aura).toLocaleString();
  $('statRizz').textContent = state.rizz.toLocaleString();
  $('statTax').textContent = '$' + Math.round(state.tax).toLocaleString();

  const mins = Math.floor(state.seconds * 7);
  $('statMew').textContent = `${Math.floor(mins / 1440)}d ${Math.floor(mins % 1440 / 60)}h ${mins % 60}m`;
  $('statOhio').textContent = Math.max(0, Math.round(2400 - state.rot * 24)) + 'km';
  $('toiletKills').textContent = state.kills;
  $('hpFill').style.width = clamp(100 - (state.kills % 12) * 8.5, 8, 100) + '%';
}

/* ══════════════════════════ MAIN LOOP ══════════════════════════ */
let prev = performance.now(), wordAcc = 0, cmtAcc = 0, rainAcc = 0, secAcc = 0;

function loop(now){
  const dt = Math.min(0.05, (now - prev) / 1000);
  prev = now;

  if (state.running){
    // clocks
    wordAcc += dt; cmtAcc += dt; rainAcc += dt; secAcc += dt;

    if (wordAcc > (state.chill ? 2.4 : 1.05 - state.chaos * 0.55)){ wordAcc = 0; Cannon.fire(); }
    if (cmtAcc > (state.chill ? 3.4 : 1.5)){ cmtAcc = 0; spawnComment(); }
    if (rainAcc > 0.4){
      rainAcc = 0;
      FX.rain(state.chill ? 1 : Math.round(1 + state.chaos * 5));
    }
    if (secAcc >= 1){
      secAcc = 0; state.seconds++;
      state.rot = clamp(state.rot + 0.55, 0, 100);
      state.chaos = clamp(0.25 + state.rot / 140 + (state.nuking ? 0.4 : 0), 0, 1);
      document.documentElement.style.setProperty('--chaos', state.chill ? '0.1' : state.chaos.toFixed(2));
      state.aura += 3; state.tax += 7;
      if (state.rot >= 100 && !unlocked.has('full')) { flash(); bigWord('TOTAL BRAINROT'); }
      checkAchievements();
      paintHUD();
    }

    Beat.decay(dt);
    Runner.update(dt);
    Runner.draw();
    FX.frame();
    DVD.step();

    // shake
    if (now < shakeUntil){
      const m = shakeMag * (state.nuking ? 1 : 0.6);
      document.documentElement.style.setProperty('--shake', R(-m, m).toFixed(2) + 'px');
    } else if (shakeMag !== 0){
      shakeMag = 0;
      document.documentElement.style.setProperty('--shake', '0px');
    }
  }

  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

/* ══════════════════════════ START ══════════════════════════ */
$('startBtn').addEventListener('click', () => {
  const boot = $('boot');
  boot.classList.add('gone');
  setTimeout(() => boot.remove(), 600);
  document.body.classList.remove('booting');
  document.body.classList.add('live');
  $('app').setAttribute('aria-hidden', 'false');
  state.running = true;

  if (prefersCalm){
    setChill(true);
    toast('CHILL MODE AUTO-ON', 'your OS asked for reduced motion. toggle it off up top if you dare.');
  }

  Audio_.start();
  FX.resize(); Runner.resize();
  Cannon.fire();
  paintHUD();
  bigWord('SKIBIDI');
  flash();
  shake(10, 700);
  for (let i = 0; i < 5; i++) setTimeout(() => FX.spawn(R(0, innerWidth), innerHeight * 0.7, 14, 1.4), i * 130);
  setTimeout(() => toast('WELCOME TO OHIO', 'click anywhere for aura · N = nuke · space = tap · ↑↑↓↓←→←→BA'), 900);
});
})();
