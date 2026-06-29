/* ============================================
   NexusTech — Main Application
   ============================================ */

(function () {
  'use strict';

  // --- Loading Screen ---
  window.addEventListener('load', function () {
    var loader = document.querySelector('.loader');
    if (loader) {
      setTimeout(function () {
        loader.classList.add('hidden');
        document.body.style.overflow = '';
      }, 1800);
    }
  });

  document.body.style.overflow = 'hidden';

  // --- Navbar ---
  var navbar = document.querySelector('.navbar');
  var scrollTop = document.querySelector('.scroll-top');
  var lastScroll = 0;

  window.addEventListener('scroll', function () {
    var currentScroll = window.scrollY;

    if (currentScroll > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    if (scrollTop) {
      if (currentScroll > 600) {
        scrollTop.classList.add('visible');
      } else {
        scrollTop.classList.remove('visible');
      }
    }

    lastScroll = currentScroll;
  }, { passive: true });

  if (scrollTop) {
    scrollTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Mobile Navigation ---
  var navToggle = document.querySelector('.nav-toggle');
  var navOverlay = document.querySelector('.nav-overlay');

  if (navToggle && navOverlay) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('active');
      navOverlay.classList.toggle('active');
      document.body.style.overflow = navOverlay.classList.contains('active') ? 'hidden' : '';
    });

    var mobileLinks = navOverlay.querySelectorAll('.nav-link');
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Smooth Scroll ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var offset = navbar ? navbar.offsetHeight + 20 : 80;
        var top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // --- Cursor Glow ---
  var cursorGlow = document.querySelector('.cursor-glow');

  if (cursorGlow && window.innerWidth > 768) {
    var glowX = 0, glowY = 0;
    var currentX = 0, currentY = 0;

    document.addEventListener('mousemove', function (e) {
      glowX = e.clientX;
      glowY = e.clientY;
    });

    function updateGlow() {
      currentX += (glowX - currentX) * 0.08;
      currentY += (glowY - currentY) * 0.08;
      cursorGlow.style.left = currentX + 'px';
      cursorGlow.style.top = currentY + 'px';
      requestAnimationFrame(updateGlow);
    }

    updateGlow();
  } else if (cursorGlow) {
    cursorGlow.style.display = 'none';
  }

  // --- Active Nav Link ---
  var sections = document.querySelectorAll('section[id]');

  function updateActiveNav() {
    var scrollY = window.scrollY + 200;

    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');
      var link = document.querySelector('.nav-link[href="#' + id + '"]');

      if (link) {
        if (scrollY >= top && scrollY < top + height) {
          link.style.color = 'var(--white)';
        } else {
          link.style.color = '';
        }
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // --- Contact Form ---
  var contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var btn = contactForm.querySelector('.btn-primary');
      var originalText = btn.innerHTML;

      btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg> Message Sent';
      btn.style.background = 'linear-gradient(135deg, #14F195, #0AAF6B)';

      setTimeout(function () {
        btn.innerHTML = originalText;
        btn.style.background = '';
        contactForm.reset();
      }, 3000);
    });
  }

  // --- Typing Effect ---
  var typingElements = document.querySelectorAll('[data-typing]');

  typingElements.forEach(function (el) {
    var text = el.getAttribute('data-typing');
    var speed = parseInt(el.getAttribute('data-typing-speed') || '80', 10);
    el.textContent = '';
    el.style.borderRight = '2px solid var(--accent)';

    var observer = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        var i = 0;
        var interval = setInterval(function () {
          el.textContent += text.charAt(i);
          i++;
          if (i >= text.length) {
            clearInterval(interval);
            setTimeout(function () {
              el.style.borderRight = 'none';
            }, 1000);
          }
        }, speed);
        observer.unobserve(el);
      }
    }, { threshold: 0.5 });

    observer.observe(el);
  });

  // --- Marquee Duplicate ---
  var marqueeTracks = document.querySelectorAll('.marquee-track');

  marqueeTracks.forEach(function (track) {
    var clone = track.innerHTML;
    track.innerHTML += clone;
  });

  // --- Transform Flow Scroll ---
  var transformFlow = document.querySelector('.transform-flow');

  if (transformFlow) {
    var flowObserver = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        var steps = transformFlow.querySelectorAll('.transform-step');
        steps.forEach(function (step, i) {
          step.style.opacity = '0';
          step.style.transform = 'translateY(20px)';
          step.style.transition = 'all 0.5s ease ' + (i * 0.15) + 's';

          setTimeout(function () {
            step.style.opacity = '1';
            step.style.transform = 'translateY(0)';
          }, 100);
        });
        flowObserver.unobserve(transformFlow);
      }
    }, { threshold: 0.3 });

    flowObserver.observe(transformFlow);
  }

})();
