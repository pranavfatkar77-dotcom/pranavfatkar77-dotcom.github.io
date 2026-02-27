/* =============================================
   PRANAV FATKAR PORTFOLIO — script.js
   ============================================= */

/* ── CUSTOM CURSOR ────────────────────────── */
const cursor   = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mx = 0, my = 0, fx = 0, fy = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = (mx - 6) + 'px';
  cursor.style.top  = (my - 6) + 'px';
});

function animateFollower() {
  fx += (mx - fx) * 0.12;
  fy += (my - fy) * 0.12;
  follower.style.left = (fx - 18) + 'px';
  follower.style.top  = (fy - 18) + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('a, button, .tool-chip, .social-link, .project-card, .skill-category')
  .forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform   = 'scale(2.5)';
      follower.style.transform = 'scale(1.5)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform   = 'scale(1)';
      follower.style.transform = 'scale(1)';
    });
  });

/* ── SCROLL REVEAL + SKILL BARS + COUNTERS ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (!entry.isIntersecting) return;

    entry.target.style.transitionDelay = (i * 0.05) + 's';
    entry.target.classList.add('visible');

    /* animate skill bars */
    entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
      bar.style.width = (parseFloat(bar.dataset.width) * 100) + '%';
    });

    /* count-up numbers */
    entry.target.querySelectorAll('[data-count]').forEach(el => {
      const target   = parseInt(el.dataset.count);
      const isFull   = el.dataset.count === '100';
      let count      = 0;
      const step     = Math.ceil(target / 40);
      const interval = setInterval(() => {
        count = Math.min(count + step, target);
        el.textContent = count + (isFull ? '%' : '+');
        if (count >= target) clearInterval(interval);
      }, 40);
    });
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── NAV SCROLL EFFECT ───────────────────── */
window.addEventListener('scroll', () => {
  document.querySelector('nav').style.background =
    window.scrollY > 50 ? 'rgba(8,12,20,0.95)' : 'rgba(8,12,20,0.8)';
});

/* ── CONTACT FORM ────────────────────────── */
function sendMessage() {
  const name  = document.getElementById('cname').value.trim();
  const email = document.getElementById('cemail').value.trim();
  const msg   = document.getElementById('cmsg').value.trim();

  if (!name || !email || !msg) {
    alert('Please fill in all fields!');
    return;
  }

  const success = document.getElementById('form-success');
  success.style.display = 'block';
  document.getElementById('cname').value  = '';
  document.getElementById('cemail').value = '';
  document.getElementById('cmsg').value   = '';
  setTimeout(() => { success.style.display = 'none'; }, 5000);
}

/* ── HERO PARTICLE CLICK EFFECT ─────────── */
document.getElementById('hero').addEventListener('click', e => {
  const colors = ['#00f5c4', '#7b2ff7', '#ff6b35', '#ffd700'];
  for (let i = 0; i < 12; i++) {
    const p = document.createElement('div');
    p.style.cssText = `
      position:fixed; left:${e.clientX}px; top:${e.clientY}px;
      width:6px; height:6px; border-radius:50%;
      background:${colors[i % colors.length]};
      pointer-events:none; z-index:9999;
      transition:all 0.8s ease-out;
    `;
    document.body.appendChild(p);
    const angle = (i / 12) * Math.PI * 2;
    const dist  = 60 + Math.random() * 80;
    setTimeout(() => {
      p.style.transform = `translate(${Math.cos(angle)*dist}px, ${Math.sin(angle)*dist}px)`;
      p.style.opacity   = '0';
    }, 10);
    setTimeout(() => p.remove(), 900);
  }
});
