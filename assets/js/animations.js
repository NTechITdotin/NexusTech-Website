/* ============================================
   NexusTech — Scroll & Intersection Animations
   ============================================ */

(function () {
  'use strict';

  // --- Scroll Reveal ---
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children');

  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(function (el) {
    revealObserver.observe(el);
  });

  // --- Counter Animation ---
  const counterElements = document.querySelectorAll('[data-count]');

  const counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counterElements.forEach(function (el) {
    counterObserver.observe(el);
  });

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const prefix = el.getAttribute('data-prefix') || '';
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);

      el.textContent = prefix + current.toLocaleString() + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // --- Cyber Bar Animation ---
  const cyberBars = document.querySelectorAll('.cyber-bar-fill');

  const barObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const width = entry.target.getAttribute('data-width');
        entry.target.style.width = width;
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  cyberBars.forEach(function (bar) {
    bar.style.width = '0';
    barObserver.observe(bar);
  });

  // --- Parallax Elements ---
  const parallaxElements = document.querySelectorAll('.parallax-layer');

  function handleParallax() {
    const scrollY = window.scrollY;

    parallaxElements.forEach(function (el) {
      const speed = parseFloat(el.getAttribute('data-speed')) || 0.1;
      const rect = el.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      const viewCenter = window.innerHeight / 2;
      const offset = (centerY - viewCenter) * speed;

      el.style.transform = 'translateY(' + offset + 'px)';
    });
  }

  let parallaxTicking = false;
  window.addEventListener('scroll', function () {
    if (!parallaxTicking) {
      requestAnimationFrame(function () {
        handleParallax();
        parallaxTicking = false;
      });
      parallaxTicking = true;
    }
  }, { passive: true });

  // --- Magnetic Buttons ---
  const magneticElements = document.querySelectorAll('.magnetic');

  magneticElements.forEach(function (el) {
    el.addEventListener('mousemove', function (e) {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      el.style.transform = 'translate(' + (x * 0.2) + 'px, ' + (y * 0.2) + 'px)';
    });

    el.addEventListener('mouseleave', function () {
      el.style.transform = 'translate(0, 0)';
    });
  });

  // --- Lazy Load Images ---
  const lazyImages = document.querySelectorAll('img[data-src]');

  const imageObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.getAttribute('data-src');
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  }, { rootMargin: '200px' });

  lazyImages.forEach(function (img) {
    imageObserver.observe(img);
  });

})();
