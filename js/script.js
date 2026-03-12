/* ============================================
   PRABHAT SHARMA — Portfolio JS
   ============================================ */

// ============ THEME TOGGLE ============
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Load saved theme
if (localStorage.getItem('theme') === 'light') {
  body.classList.add('light');
  if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('light');
    const isLight = body.classList.contains('light');
    themeToggle.innerHTML = isLight
      ? '<i class="fas fa-moon"></i>'
      : '<i class="fas fa-sun"></i>';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
}

// ============ HAMBURGER MENU ============
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    const isOpen = navMenu.classList.contains('open');
    hamburger.innerHTML = isOpen
      ? '<span></span><span></span><span></span>'
      : '<span></span><span></span><span></span>';
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close on link click
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
    });
  });
}

// ============ TYPING ANIMATION ============
function initTypingAnimation() {
  const el = document.querySelector('.typing');
  if (!el) return;

  const phrases = [
    'AI Developer',
    'ML Engineer',
    'NLP Specialist',
    'Deep Learning Researcher',
    'Python Developer'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isPausing = false;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isPausing) return;

    if (!isDeleting) {
      el.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentPhrase.length) {
        isPausing = true;
        setTimeout(() => {
          isPausing = false;
          isDeleting = true;
          type();
        }, 2000);
        return;
      }
    } else {
      el.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }

    const speed = isDeleting ? 60 : 100;
    setTimeout(type, speed);
  }

  setTimeout(type, 1000);
}

// ============ PARTICLES ============
function initParticles() {
  if (typeof particlesJS === 'undefined') return;

  particlesJS('particles-js', {
    particles: {
      number: { value: 50, density: { enable: true, value_area: 900 } },
      color: { value: '#00ffc8' },
      shape: { type: 'circle' },
      opacity: { value: 0.3, random: true, anim: { enable: true, speed: 1, opacity_min: 0.05, sync: false } },
      size: { value: 2, random: true },
      line_linked: { enable: true, distance: 130, color: '#00ffc8', opacity: 0.08, width: 1 },
      move: { enable: true, speed: 1.2, direction: 'none', random: true, out_mode: 'out' }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: { enable: true, mode: 'grab' },
        onclick: { enable: true, mode: 'push' }
      },
      modes: {
        grab: { distance: 140, line_linked: { opacity: 0.3 } },
        push: { particles_nb: 3 }
      }
    },
    retina_detect: true
  });
}

// ============ SCROLL REVEAL ============
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // For skill bars
        const fills = entry.target.querySelectorAll('.skill-bar-fill');
        fills.forEach(fill => {
          fill.style.width = fill.getAttribute('data-width') + '%';
        });
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .skill-category-card, .project-card, .blog-card').forEach(el => {
    observer.observe(el);
  });

  // For standalone skill bars in about page
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-bar-fill').forEach(fill => {
          fill.style.width = fill.getAttribute('data-width') + '%';
        });
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.skills-section, .about-skills').forEach(section => {
    skillObserver.observe(section);
  });
}

// ============ NAV SCROLL EFFECT ============
function initNavScroll() {
  const nav = document.querySelector('nav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.style.boxShadow = '0 8px 30px rgba(0,0,0,0.3)';
    } else {
      nav.style.boxShadow = 'none';
    }
  }, { passive: true });
}

// ============ COUNTER ANIMATION ============
function animateCounters() {
  const counters = document.querySelectorAll('[data-count]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = 'true';
        const target = parseInt(entry.target.getAttribute('data-count'));
        let current = 0;
        const step = Math.ceil(target / 50);
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          entry.target.textContent = current + (entry.target.dataset.suffix || '');
        }, 30);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));
}

// ============ BLOG FILTER ============
function initBlogFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const blogCards = document.querySelectorAll('.blog-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      blogCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = '';
          setTimeout(() => card.classList.add('visible'), 50);
        } else {
          card.classList.remove('visible');
          setTimeout(() => card.style.display = 'none', 300);
        }
      });
    });
  });
}

// ============ CONTACT FORM ============
function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    btn.style.background = 'linear-gradient(135deg, #00ffc8, #00a884)';
    setTimeout(() => {
      btn.innerHTML = original;
      btn.style.background = '';
      form.reset();
    }, 3000);
  });
}

// ============ ACTIVE NAV LINK ============
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav ul a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.style.color = 'var(--accent)';
    }
  });
}

// ============ SMOOTH IMAGE LOADING ============
function initImageLoading() {
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
      // Hide broken images - placeholders handle display
      this.style.display = 'none';
    });
  });
}

// ============ INIT ============
document.addEventListener('DOMContentLoaded', () => {
  initTypingAnimation();
  initParticles();
  initScrollReveal();
  initNavScroll();
  animateCounters();
  initBlogFilter();
  initContactForm();
  setActiveNavLink();
  initImageLoading();
});
