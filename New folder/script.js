/* =========================================================
   SIDDHI CLINIC — SCRIPT
   Vanilla JS only. No dependencies.
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. LOADER ---------- */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('loaded'), 400);
  });
  // Fallback in case 'load' already fired
  setTimeout(() => loader && loader.classList.add('loaded'), 2500);

  /* ---------- 2. SCROLL PROGRESS BAR ---------- */
  const progressBar = document.getElementById('scroll-progress');
  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  /* ---------- 3. NAVBAR SCROLLED STATE + ACTIVE LINK ---------- */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('main section[id]');

  function handleNavScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 40);

    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) current = sec.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  /* ---------- 4. MOBILE NAV ---------- */
  const navBurger = document.getElementById('navBurger');
  const navLinksList = document.getElementById('navLinks');
  navBurger.addEventListener('click', () => {
    const isOpen = navLinksList.classList.toggle('open');
    navBurger.classList.toggle('open', isOpen);
    navBurger.setAttribute('aria-expanded', isOpen);
  });
  navLinksList.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinksList.classList.remove('open');
      navBurger.classList.remove('open');
      navBurger.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- 5. SCROLL-TRIGGERED REVEAL ANIMATIONS ---------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseFloat(entry.target.dataset.delay || 0);
        entry.target.style.transitionDelay = delay + 's';
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- 6. NUMBER COUNTERS ---------- */
  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1800;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      el.textContent = Math.floor(eased * target).toLocaleString('en-IN');
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target.toLocaleString('en-IN');
    }
    requestAnimationFrame(tick);
  }
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  /* ---------- 7. TYPING EFFECT IN HERO ---------- */
  const typingText = document.getElementById('typingText');
  const phrases = ['every mother.', 'every child.', 'every family.', 'Panvel.'];
  let phraseIndex = 0, charIndex = 0, deleting = false;

  function typeLoop() {
    const current = phrases[phraseIndex];
    if (!deleting) {
      charIndex++;
      typingText.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(typeLoop, 1400);
        return;
      }
    } else {
      charIndex--;
      typingText.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }
    setTimeout(typeLoop, deleting ? 45 : 80);
  }
  typeLoop();

  /* ---------- 8. FLOATING PARTICLES IN HERO ---------- */
  const particlesEl = document.getElementById('particles');
  const PARTICLE_COUNT = 22;
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const p = document.createElement('span');
    p.className = 'particle';
    const size = 3 + Math.random() * 5;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.left = Math.random() * 100 + '%';
    p.style.bottom = -20 + 'px';
    p.style.animationDuration = (10 + Math.random() * 12) + 's';
    p.style.animationDelay = (Math.random() * 12) + 's';
    particlesEl.appendChild(p);
  }

  /* ---------- 9. MAGNETIC BUTTONS ---------- */
  const magnets = document.querySelectorAll('.magnetic');
  magnets.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.22}px, ${y * 0.35}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  /* ---------- 10. RIPPLE EFFECT ---------- */
  document.querySelectorAll('.ripple-btn, .btn-primary, .btn-ghost').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });

  /* ---------- 11. CURSOR GLOW (desktop only) ---------- */
  const cursorGlow = document.getElementById('cursor-glow');
  const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (isDesktop && cursorGlow) {
    window.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top = e.clientY + 'px';
    });
  }

  /* ---------- 12. TESTIMONIAL SLIDER (auto-sliding) ---------- */
  const track = document.getElementById('testimonialTrack');
  const dotsWrap = document.getElementById('testimonialDots');
  const slides = track ? track.children : [];
  let slideIndex = 0, slideTimer;

  if (track && slides.length) {
    for (let i = 0; i < slides.length; i++) {
      const dot = document.createElement('button');
      dot.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsWrap.appendChild(dot);
    }

    function goToSlide(i) {
      slideIndex = i;
      track.style.transform = `translateX(-${i * 100}%)`;
      [...dotsWrap.children].forEach((d, idx) => d.classList.toggle('active', idx === i));
      resetTimer();
    }
    function nextSlide() { goToSlide((slideIndex + 1) % slides.length); }
    function resetTimer() {
      clearInterval(slideTimer);
      slideTimer = setInterval(nextSlide, 5000);
    }
    resetTimer();
  }

  /* ---------- 13. GALLERY LIGHTBOX ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      lightboxImg.src = item.dataset.full;
      lightboxImg.alt = item.querySelector('img').alt;
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

  /* ---------- 14. FAQ ACCORDION ---------- */
  document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        if (openItem !== item) {
          openItem.classList.remove('open');
          openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        }
      });
      item.classList.toggle('open', !isOpen);
      question.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  /* ---------- 15. APPOINTMENT FORM VALIDATION ---------- */
  const form = document.getElementById('appointmentForm');
  const formSuccess = document.getElementById('formSuccess');

  // Set min date to today so patients can't pick the past
  const dateInput = document.getElementById('fdate');
  if (dateInput) dateInput.min = new Date().toISOString().split('T')[0];

  function validateField(field) {
    const wrapper = field.closest('.form-field');
    let valid = field.checkValidity();
    // extra 10-digit phone check
    if (field.id === 'fphone' && field.value.trim() !== '') {
      valid = /^[0-9]{10}$/.test(field.value.trim());
    }
    wrapper.classList.toggle('error', !valid);
    return valid;
  }

  if (form) {
    [...form.elements].forEach(field => {
      if (field.tagName === 'BUTTON') return;
      field.addEventListener('blur', () => validateField(field));
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let allValid = true;
      ['fname', 'fphone', 'fdept', 'fdate'].forEach(id => {
        const field = document.getElementById(id);
        if (!validateField(field)) allValid = false;
      });

      if (allValid) {
        formSuccess.classList.add('show');
        form.reset();
        setTimeout(() => formSuccess.classList.remove('show'), 6000);
      } else {
        const firstError = form.querySelector('.form-field.error');
        if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  /* ---------- 16. BACK TO TOP ---------- */
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('show', window.scrollY > 500);
  }, { passive: true });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- 17. FOOTER YEAR ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
