/* San's Salon Bandung — interactions (vanilla JS) */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  function renderIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons({ attrs: { 'stroke-width': 1.5 } });
    }
  }
  renderIcons();
  window.addEventListener('load', renderIcons);

  var year = $('#year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Header, progress, parallax ---------- */
  var header = $('#header');
  var progress = $('#progress');
  var heroMedia = $('#heroMedia');
  var heroSection = $('#home');
  var ticking = false;
  var canParallax = !reduceMotion && window.matchMedia('(min-width: 901px)').matches;

  function onScroll() {
    var y = window.pageYOffset || document.documentElement.scrollTop;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    header.classList.toggle('is-scrolled', y > 40);
    if (progress) progress.style.transform = 'scaleX(' + (max > 0 ? Math.min(y / max, 1) : 0) + ')';
    if (canParallax && heroMedia && y < heroSection.offsetHeight) {
      heroMedia.style.transform = 'translate3d(0,' + (y * 0.22).toFixed(1) + 'px,0)';
    }
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; window.requestAnimationFrame(onScroll); }
  }, { passive: true });
  window.addEventListener('resize', function () {
    canParallax = !reduceMotion && window.matchMedia('(min-width: 901px)').matches;
    if (!canParallax && heroMedia) heroMedia.style.transform = '';
    if (window.innerWidth > 900) closeMenu();
  });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var menuBtn = $('#menuBtn');
  var nav = $('#nav');

  function openMenu() {
    nav.classList.add('is-open');
    header.classList.add('menu-open');
    document.body.classList.add('menu-open');
    menuBtn.setAttribute('aria-expanded', 'true');
    menuBtn.setAttribute('aria-label', 'Close menu');
  }
  function closeMenu() {
    if (!nav.classList.contains('is-open')) return;
    nav.classList.remove('is-open');
    header.classList.remove('menu-open');
    document.body.classList.remove('menu-open');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'Open menu');
  }
  menuBtn.addEventListener('click', function () {
    nav.classList.contains('is-open') ? closeMenu() : openMenu();
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });

  /* ---------- Smooth scrolling ---------- */
  $$('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id.length < 2) return;
      var target = $(id);
      if (!target) return;
      e.preventDefault();
      closeMenu();
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      if (history.replaceState) history.replaceState(null, '', id);
    });
  });

  /* ---------- Scroll reveal ---------- */
  var revealEls = $$('.reveal, .reveal-img');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var revealIO = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); obs.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    revealEls.forEach(function (el, i) {
      el.style.transitionDelay = (i % 3) * 90 + 'ms';
      revealIO.observe(el);
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Active section indicator ---------- */
  var links = $$('[data-link]');
  var sections = ['home', 'services', 'gallery', 'about', 'contact']
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);
  if ('IntersectionObserver' in window) {
    var navIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          links.forEach(function (l) {
            var active = l.getAttribute('data-link') === en.target.id;
            l.classList.toggle('is-active', active);
            if (active) l.setAttribute('aria-current', 'true'); else l.removeAttribute('aria-current');
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { navIO.observe(s); });
  }

  /* ---------- Gallery lightbox ---------- */
  var items = $$('.g__btn');
  var lb = $('#lightbox');
  var lbImg = $('#lbImg');
  var lbCap = $('#lbCap');
  var lbClose = $('#lbClose');
  var lbPrev = $('#lbPrev');
  var lbNext = $('#lbNext');
  var current = 0;
  var lastFocus = null;

  function show(i) {
    current = (i + items.length) % items.length;
    var btn = items[current];
    var img = $('img', btn);
    lbImg.src = btn.getAttribute('data-full');
    lbImg.alt = img ? img.alt : '';
    lbCap.textContent = $('.g__cap', btn) ? $('.g__cap', btn).textContent : '';
  }
  function openLb(i) {
    lastFocus = document.activeElement;
    show(i);
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(function () { lb.classList.add('is-open'); lbClose.focus(); });
  }
  function closeLb() {
    lb.classList.remove('is-open');
    document.body.style.overflow = '';
    setTimeout(function () { lb.hidden = true; lbImg.src = ''; }, reduceMotion ? 0 : 350);
    if (lastFocus) lastFocus.focus();
  }
  items.forEach(function (btn, i) { btn.addEventListener('click', function () { openLb(i); }); });
  lbClose.addEventListener('click', closeLb);
  lbPrev.addEventListener('click', function () { show(current - 1); });
  lbNext.addEventListener('click', function () { show(current + 1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', function (e) {
    if (lb.hidden) return;
    if (e.key === 'Escape') closeLb();
    else if (e.key === 'ArrowLeft') show(current - 1);
    else if (e.key === 'ArrowRight') show(current + 1);
    else if (e.key === 'Tab') {
      var f = [lbClose, lbPrev, lbNext];
      var idx = f.indexOf(document.activeElement);
      e.preventDefault();
      f[(idx + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
    }
  });

  /* touch swipe in lightbox */
  var startX = null;
  lb.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', function (e) {
    if (startX === null) return;
    var dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
    startX = null;
  }, { passive: true });
})();