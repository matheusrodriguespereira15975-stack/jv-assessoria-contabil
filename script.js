/**
 * JV Assessoria Contábil - Interactive Experience
 * - Lightweight Golden Particle Background
 * - Contact Modal Interaction & Clipboard Support
 * - Smooth Parallax Lighting
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Year Update
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Modal Handling
  const modal = document.getElementById('contact-modal');
  const openModalBtn = document.getElementById('btn-contact-info');
  const closeModalBtn = document.getElementById('btn-close-modal');
  const emailRow = document.getElementById('contact-email');
  const copyFeedback = document.getElementById('copy-feedback-email');

  function openModal() {
    if (!modal) return;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    if (openModalBtn) openModalBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    if (openModalBtn) openModalBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (openModalBtn) {
    openModalBtn.addEventListener('click', openModal);
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Copy Email to Clipboard
  if (emailRow && copyFeedback) {
    emailRow.addEventListener('click', (e) => {
      // If user clicks directly on the link, we also copy the email for convenience
      const email = 'contato@jvacontabil.com.br';
      if (navigator.clipboard) {
        navigator.clipboard.writeText(email).then(() => {
          const originalText = copyFeedback.textContent;
          copyFeedback.textContent = 'Copiado!';
          copyFeedback.style.backgroundColor = 'rgba(37, 211, 102, 0.25)';
          copyFeedback.style.color = '#25D366';
          setTimeout(() => {
            copyFeedback.textContent = originalText;
            copyFeedback.style.backgroundColor = '';
            copyFeedback.style.color = '';
          }, 2000);
        }).catch(() => {
          // Fallback ignore
        });
      }
    });
  }

  // 3. Ambient Stardust Canvas Particles
  initParticles();

  // 4. Subtle Mouse Movement Effect on Ambient Glow
  initAmbientParallax();
});

function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particlesCount = Math.min(Math.floor(window.innerWidth / 20), 45);
  const particles = [];

  class Particle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 10;
      this.size = Math.random() * 2 + 0.6;
      this.speedY = -(Math.random() * 0.45 + 0.15);
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.55 + 0.15;
      this.goldHue = Math.random() > 0.4 ? 'rgba(212, 175, 55,' : 'rgba(247, 231, 180,';
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX;

      if (this.y < -10 || this.x < -10 || this.x > width + 10) {
        this.reset();
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `${this.goldHue} ${this.opacity})`;
      ctx.shadowBlur = this.size * 3;
      ctx.shadowColor = 'rgba(212, 175, 55, 0.4)';
      ctx.fill();
    }
  }

  for (let i = 0; i < particlesCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    requestAnimationFrame(animate);
  }

  animate();
}

function initAmbientParallax() {
  const centerGlow = document.querySelector('.ambient-glow-center');
  if (!centerGlow) return;

  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;

  window.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    mouseX = (clientX - centerX) * 0.04;
    mouseY = (clientY - centerY) * 0.04;
  });

  function renderParallax() {
    currentX += (mouseX - currentX) * 0.08;
    currentY += (mouseY - currentY) * 0.08;
    centerGlow.style.transform = `translate(calc(-50% + ${currentX}px), calc(-50% + ${currentY}px))`;
    requestAnimationFrame(renderParallax);
  }

  renderParallax();
}
