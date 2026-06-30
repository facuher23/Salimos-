/* ══════════════════════════════════════
   ESTRELLAS ANIMADAS
══════════════════════════════════════ */
(function () {
  const canvas = document.getElementById('stars-canvas');
  const ctx    = canvas.getContext('2d');
  let W, H, stars = [];

  const CANT    = 5000;
  const COLORES = ['#2dd4bf', '#f43f5e', '#ffffff', '#7aada0'];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = document.body.scrollHeight;
  }

  function crearEstrellas() {
    stars = [];
    for (let i = 0; i < CANT; i++) {
      stars.push({
        x:      Math.random() * W,
        y:      Math.random() * H,
        r:      Math.random() * 1.4 + 0.4,
        color:  COLORES[Math.floor(Math.random() * COLORES.length)],
        alpha:  Math.random(),
        delta:  (Math.random() * 0.008 + 0.003) * (Math.random() < .5 ? 1 : -1),
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (const s of stars) {
      s.alpha += s.delta;
      if (s.alpha <= 0 || s.alpha >= 1) s.delta *= -1;
      ctx.globalAlpha = Math.max(0, Math.min(1, s.alpha));
      ctx.fillStyle   = s.color;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); crearEstrellas(); });
  resize();
  crearEstrellas();
  draw();
})();


/* ══════════════════════════════════════
   CONTADOR DE DÍAS
══════════════════════════════════════ */
(function () {
  const inicio  = new Date('2026-04-18'); // viaje a Bs As
  const hoy     = new Date();
  const diff    = Math.floor((hoy - inicio) / (1000 * 60 * 60 * 24));
  document.getElementById('dias-contador').textContent = diff;
})();


/* ══════════════════════════════════════
   BOTÓN NO — ESCAPA AL CURSOR
══════════════════════════════════════ */
const btnNo  = document.getElementById('btn-no');
const salimos = document.getElementById('salimos');

function posicionInicial() {
  // lo ponemos a la derecha del btn-si en desktop
  btnNo.style.left = '55%';
  btnNo.style.top  = '120px';
}

function escapar() {
  const rect = salimos.getBoundingClientRect();
  const bw   = btnNo.offsetWidth  + 20;
  const bh   = btnNo.offsetHeight + 20;
  const maxX = salimos.offsetWidth  - bw;
  const maxY = salimos.offsetHeight - bh;

  // posición actual del botón
  const curX = parseFloat(btnNo.style.left) || salimos.offsetWidth * 0.55;
  const curY = parseFloat(btnNo.style.top)  || 120;

  // nueva posición lejos de donde está ahora
  let nx, ny, intentos = 0;
  do {
    nx = Math.random() * maxX;
    ny = Math.random() * maxY + 60;
    intentos++;
  } while (Math.abs(nx - curX) < 80 && Math.abs(ny - curY) < 40 && intentos < 20);

  btnNo.style.left = nx + 'px';
  btnNo.style.top  = ny + 'px';
}

// En desktop escapa al acercarse
btnNo.addEventListener('mouseenter', escapar);
// En mobile escapa al tocar (no puede apretar)
btnNo.addEventListener('touchstart', (e) => { e.preventDefault(); escapar(); }, { passive: false });

window.addEventListener('load', posicionInicial);
window.addEventListener('resize', posicionInicial);


/* ══════════════════════════════════════
   BOTÓN SÍ
══════════════════════════════════════ */
function dijoBienSi() {
  document.getElementById('contenedor-btns').style.display = 'none';
  const msg = document.getElementById('msg-si');
  msg.style.display = 'flex';
}
