document.addEventListener('DOMContentLoaded', () => {

  /* ================= HEADER SCROLL STATE ================= */
  const header = document.querySelector('header');
  const onScroll = () => {
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ================= MOBILE MENU ================= */
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileClose = document.querySelector('.mobile-close');
  const menuOverlay = document.querySelector('.menu-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-menu a');

  const openMenu = () => {
    mobileMenu.classList.add('active');
    menuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };
  const closeMenu = () => {
    mobileMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  menuToggle?.addEventListener('click', openMenu);
  mobileClose?.addEventListener('click', closeMenu);
  menuOverlay?.addEventListener('click', closeMenu);
  mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

  /* ================= ACTIVE NAV LINK ON SCROLL ================= */
  const navLinks = document.querySelectorAll('header nav a');
  const sections = Array.from(navLinks)
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const setActiveLink = () => {
    let currentId = sections[0]?.id;
    const scrollPos = window.scrollY + 140;
    sections.forEach(section => {
      if (section.offsetTop <= scrollPos) currentId = section.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
  };
  setActiveLink();
  window.addEventListener('scroll', setActiveLink, { passive: true });

  /* ================= SCROLL REVEAL ================= */
  const revealTargets = document.querySelectorAll(
    '.industry-card, .service-card, .case-card, .testimonial-card, .section-title, .feature, .contact-card, .contact-form'
  );
  revealTargets.forEach((el, i) => {
    el.setAttribute('data-reveal', '');
    el.style.transitionDelay = `${(i % 3) * 90}ms`;
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  revealTargets.forEach(el => revealObserver.observe(el));

  /* ================= HERO STAT COUNTERS ================= */
  const statEls = document.querySelectorAll('.hero-stats h2');
  const parseStat = (text) => {
    const match = text.match(/^([\d.]+)([A-Za-z%+]*)/);
    if (!match) return null;
    return { value: parseFloat(match[1]), suffix: match[2] || '' };
  };

  const animateCount = (el) => {
    const parsed = parseStat(el.textContent.trim());
    if (!parsed) return;
    const { value, suffix } = parsed;
    const duration = 1400;
    const start = performance.now();
    const isDecimal = String(value).includes('.');

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = value * eased;
      el.textContent = (isDecimal ? current.toFixed(1) : Math.round(current)) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = value + suffix;
    };
    requestAnimationFrame(tick);
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });

  statEls.forEach(el => statsObserver.observe(el));

  /* ================= CONTACT FORM ================= */
  const form = document.querySelector('.contact-form form');
  if (form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    let note = form.querySelector('.form-note');
    if (!note) {
      note = document.createElement('p');
      note.className = 'form-note';
      note.textContent = "Thanks — we'll be in touch within one business day.";
      form.appendChild(note);
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        note.classList.add('visible');
        form.reset();
        setTimeout(() => note.classList.remove('visible'), 5000);
      }, 900);
    });
  }

  /* ================= SMOOTH ANCHOR OFFSET ================= */
  const headerHeight = () => header.offsetHeight;
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight() + 1;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

});
