/* Night sky on top of the photo: a few hundred twinkling stars over the sky area, one star flaring now and then, a meteor every 6-14 s.
   Runs at 30 fps, pauses in hidden tabs, stays still for people who asked the OS for reduced motion. No dependencies. */
(function () {
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var home = document.body.classList.contains('home');
  var cv = document.createElement('canvas'); cv.className = 'field'; document.body.appendChild(cv);
  var ctx = cv.getContext('2d'), W, H, DPR, T = [], raf = null, frame = 0, meteor = null, nextMeteor = 0, nextFlare = 0;
  function rnd(a, b) { return a + Math.random() * (b - a); }
  var COLS = ['238,240,246', '238,240,246', '246,238,228', '214,224,242'];
  function halo(x, y, R, c, a) { var g = ctx.createRadialGradient(x, y, 0, x, y, R); g.addColorStop(0, 'rgba(' + c + ',' + a.toFixed(3) + ')'); g.addColorStop(1, 'rgba(' + c + ',0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, R, 0, 6.2832); ctx.fill(); }
  function build() {
    DPR = Math.min(devicePixelRatio || 1, 2); W = innerWidth; H = innerHeight;
    cv.width = W * DPR; cv.height = H * DPR; cv.style.width = W + 'px'; cv.style.height = H + 'px'; ctx.setTransform(DPR, 0, 0, DPR, 0, 0); T = [];
    var skyH = H * (home ? .52 : .6), n = Math.round(W * skyH / 6500);          // only over the sky part of the photo
    for (var i = 0; i < n; i++) { var u = Math.random(), tier = u < .6 ? 0 : u < .9 ? 1 : 2;
      T.push({ x: rnd(0, W), y: rnd(0, skyH), r: tier === 0 ? rnd(.5, .9) : tier === 1 ? rnd(.9, 1.4) : rnd(1.4, 2), a: tier === 0 ? rnd(.35, .6) : tier === 1 ? rnd(.55, .85) : rnd(.8, 1),
               col: COLS[Math.floor(Math.random() * COLS.length)], ph: rnd(0, 6.283), per: rnd(1200, 4000), amp: rnd(.55, .95), g: 0, big: tier === 2 }); }
  }
  function step(now) {
    for (var i = 0; i < T.length; i++) if (T[i].g > 0) T[i].g = Math.max(0, T[i].g - .025);
    if (now > nextFlare && T.length) { T[Math.floor(Math.random() * T.length)].g = 1; nextFlare = now + rnd(500, 1300); }
    if (!meteor && now > nextMeteor) { meteor = { x: rnd(W * .3, W * .95), y: rnd(H * .04, H * .24), vx: -rnd(7.5, 9.5), vy: rnd(3, 4.2), life: 1 }; nextMeteor = now + rnd(6000, 14000); }
    if (meteor) { meteor.x += meteor.vx; meteor.y += meteor.vy; meteor.life -= .024; if (meteor.life <= 0) meteor = null; }
  }
  function draw(now) {
    ctx.clearRect(0, 0, W, H);
    for (var i = 0; i < T.length; i++) { var p = T[i];
      var f = reduce ? 1 : Math.pow(.5 + .5 * Math.sin(now / p.per * 6.283 + p.ph), 1.6);      // 0..1, quick bright peaks
      var a = Math.min(1, p.a * (1 - p.amp + p.amp * f) * (1 + 1.2 * p.g)), r = p.r * (.85 + .15 * f) * (1 + .5 * p.g);
      if (p.big || p.g > .3) halo(p.x, p.y, r * 3 + 2, p.col, Math.min(.35, a * .18 + .2 * p.g));
      ctx.fillStyle = 'rgba(' + p.col + ',' + a.toFixed(3) + ')'; ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, 6.2832); ctx.fill();
      var gl = Math.max(p.g, (p.big && f > .9) ? (f - .9) / .1 : 0);
      if (gl > 0 && p.r > .8) { var Ln = p.r * 3 * gl + 1.5 * gl; ctx.strokeStyle = 'rgba(' + p.col + ',' + Math.min(.6, a * .45 * gl).toFixed(3) + ')'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(p.x - Ln, p.y); ctx.lineTo(p.x + Ln, p.y); ctx.moveTo(p.x, p.y - Ln); ctx.lineTo(p.x, p.y + Ln); ctx.stroke(); }
    }
    if (meteor) { var m = meteor, env = Math.min(1, m.life * 4) * Math.min(1, (1 - m.life) * 6), len = 22, x2 = m.x - m.vx * len, y2 = m.y - m.vy * len, c = COLS[0];
      var gr = ctx.createLinearGradient(m.x, m.y, x2, y2); gr.addColorStop(0, 'rgba(' + c + ',' + (.95 * env).toFixed(3) + ')'); gr.addColorStop(.35, 'rgba(' + c + ',' + (.45 * env).toFixed(3) + ')'); gr.addColorStop(1, 'rgba(' + c + ',0)');
      ctx.strokeStyle = gr; ctx.lineWidth = 1.5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(m.x, m.y); ctx.lineTo(x2, y2); ctx.stroke();
      halo(m.x, m.y, 7, c, .5 * env); ctx.fillStyle = 'rgba(' + c + ',' + env.toFixed(3) + ')'; ctx.beginPath(); ctx.arc(m.x, m.y, 1.4, 0, 6.2832); ctx.fill(); }
  }
  function loop(now) { frame++; if (frame % 2 === 0) { step(now); draw(now); } raf = requestAnimationFrame(loop); }
  build(); draw(0);
  if (!reduce) raf = requestAnimationFrame(loop);
  addEventListener('resize', function () { build(); draw(performance.now()); });
  document.addEventListener('visibilitychange', function () { if (document.hidden) { cancelAnimationFrame(raf); raf = null; } else if (!raf && !reduce) raf = requestAnimationFrame(loop); });
})();
