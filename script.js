/* ============================================
   Simple Portfolio - Script
   ============================================ */

(function () {
  'use strict';

  // --- Navigation scroll effect ---
  const nav = document.getElementById('nav');

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, { passive: true });

  // --- Mobile menu toggle ---
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close on link click
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const pos = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: pos, behavior: 'smooth' });
      }
    });
  });

  // --- Scroll-triggered reveal animations ---
  const revealElements = document.querySelectorAll(
    '.section-label, .about-content, .work-card, .writing-intro, .post-item, .connect-links, .about-tags'
  );

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal', 'visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${i * 0.06}s`;
    revealObserver.observe(el);
  });

  // --- Terminal typing effect ---
  const terminalBody = document.querySelector('.terminal-body');
  if (terminalBody) {
    const lines = terminalBody.children;
    Array.from(lines).forEach((line, i) => {
      line.style.opacity = '0';
      line.style.transform = 'translateY(8px)';
      line.style.transition = `opacity 0.4s ease ${i * 0.12 + 0.8}s, transform 0.4s ease ${i * 0.12 + 0.8}s`;
      // Trigger after a small delay
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          line.style.opacity = '1';
          line.style.transform = 'translateY(0)';
        });
      });
    });
  }

})();
