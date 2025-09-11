// ======================
// HAMBURGER TOGGLE
// ======================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  const expanded = hamburger.classList.toggle('open');
  navLinks.classList.toggle('active');
  hamburger.setAttribute('aria-expanded', expanded);
});

// Chiudi il menu quando clicchi un link (mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    if (navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
});

// ======================
// SCROLL EFFECTS
// ======================

// Navbar shadow on scroll e animazioni
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');

  animateOnScroll();
});

// Animate elements on scroll (service cards, about, contact)
function animateOnScroll() {
  const elements = document.querySelectorAll('.service-card, .about-content, .contact-cards-grid a.contact-card');
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top <= (window.innerHeight - 100)) {
      el.classList.add('visible');
    }
  });
}

// Initial call
animateOnScroll();

// ======================
// CONTINUOUS ATHLETES SLIDER
// ======================
const sliderTrack = document.querySelector('.slider-track');
let pos = 0;
let speed = 0.6; // px per frame
let blockWidth = 0;
let cloneTrack = null;

function setupSlider() {
  if (!sliderTrack) return;

  // Clono tutto il blocco originale
  cloneTrack = sliderTrack.cloneNode(true);
  sliderTrack.parentElement.appendChild(cloneTrack);

  // Larghezza del blocco originale
  blockWidth = sliderTrack.scrollWidth;

  // Posizionamento iniziale del clone subito dopo l’originale
  cloneTrack.style.position = "absolute";
  cloneTrack.style.left = blockWidth + "px";
  cloneTrack.style.top = "0";
  cloneTrack.style.display = "flex";
}

function animateSlider() {
  pos -= speed;

  // Reset quando un intero blocco è uscito
  if (Math.abs(pos) >= blockWidth) {
    pos = 0;
  }

  sliderTrack.style.transform = `translateX(${pos}px)`;
  cloneTrack.style.transform = `translateX(${pos}px)`;

  requestAnimationFrame(animateSlider);
}

// Setup e animazione al load
window.addEventListener('load', () => {
  setupSlider();
  requestAnimationFrame(animateSlider);
});

// Pause slider on hover
const athleteSlider = document.querySelector('.athlete-slider');
if (athleteSlider) {
  athleteSlider.addEventListener('mouseenter', () => { speed = 0; });
  athleteSlider.addEventListener('mouseleave', () => { speed = 0.6; });
}

// ======================
// RESPONSIVE RESIZE
// ======================
window.addEventListener('resize', () => {
  if (!sliderTrack || !cloneTrack) return;
  blockWidth = sliderTrack.scrollWidth;
  cloneTrack.style.left = blockWidth + "px";
});

// ======================
// HERO BACKGROUND SLIDER
// ======================
const heroBg = document.querySelector('.hero-bg-slider');
const heroImages = [
  'image/hero1.png',
  'image/hero2.png',
  'image/hero3.png'
];
let currentHeroIndex = 0;

function changeHeroBg() {
  if (!heroBg) return;
  heroBg.style.backgroundImage = `url(${heroImages[currentHeroIndex]})`;
  currentHeroIndex = (currentHeroIndex + 1) % heroImages.length;
}

// Cambia immagine ogni 5 secondi
setInterval(changeHeroBg, 5000);
window.addEventListener('load', changeHeroBg);

// Assicura che l'immagine copra correttamente la sezione anche al resize
window.addEventListener('resize', () => {
  if (heroBg) {
    heroBg.style.backgroundSize = 'cover';
    heroBg.style.backgroundPosition = 'center';
  }
});
