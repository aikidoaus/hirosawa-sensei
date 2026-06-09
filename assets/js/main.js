import PhotoSwipeLightbox from 'https://cdn.jsdelivr.net/npm/photoswipe@5.4.4/dist/photoswipe-lightbox.esm.min.js';

// --- Header: solid background once scrolled past the hero top ---
const header = document.getElementById('main-header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 60);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// --- Mobile nav toggle ---
const toggle = document.querySelector('.nav-toggle');
if (toggle) {
  toggle.addEventListener('click', () => {
    const open = header.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', open);
  });
  document.querySelectorAll('.nav-menu a').forEach(a =>
    a.addEventListener('click', () => header.classList.remove('nav-open')));
}

// --- Reveal sections on scroll ---
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.section').forEach(s => io.observe(s));
} else {
  document.querySelectorAll('.section').forEach(s => s.classList.add('in-view'));
}

// --- PhotoSwipe: one lightbox per gallery (plus the collage) ---
document.querySelectorAll('.pswp-gallery, .collage').forEach((gallery, i) => {
  if (!gallery.id) gallery.id = 'pswp-gallery-' + i;
  const lightbox = new PhotoSwipeLightbox({
    gallery: '#' + gallery.id,
    children: 'a',
    pswpModule: () => import('https://cdn.jsdelivr.net/npm/photoswipe@5.4.4/dist/photoswipe.esm.min.js'),
  });
  lightbox.init();
});
