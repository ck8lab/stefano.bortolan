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
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');

  animateOnScroll();
});

function animateOnScroll() {
  const elements = document.querySelectorAll('.service-card, .about-content, .contact-cards-grid a.contact-card');
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top <= (window.innerHeight - 100)) {
      el.classList.add('visible');
    }
  });
}

animateOnScroll();

// ======================
// HERO BACKGROUND SLIDER
// ======================
const heroBg = document.querySelector('.hero-bg-slider');
const heroImages = [
  'image/hero/hero1.png',
  'image/hero/hero2.png',
  'image/hero/hero3.png'
];
let currentHeroIndex = 0;

function changeHeroBg() {
  if (!heroBg) return;
  heroBg.style.backgroundImage = `url(${heroImages[currentHeroIndex]})`;
  currentHeroIndex = (currentHeroIndex + 1) % heroImages.length;
}

setInterval(changeHeroBg, 5000);
window.addEventListener('load', changeHeroBg);
window.addEventListener('resize', () => {
  if (heroBg) {
    heroBg.style.backgroundSize = 'cover';
    heroBg.style.backgroundPosition = 'center';
  }
});

// ======================
// ATHLETES SLIDER (AUTO + DRAG + RIPARTO DOPO 7s + LOOP INFINITO)
// ======================
const sliderContainer = document.querySelector('.athlete-slider');
const sliderTrack = document.querySelector('.slider-track');

if (sliderContainer && sliderTrack) {
  // Clono la track per creare loop infinito
  const cloneTrack = sliderTrack.cloneNode(true);
  sliderTrack.parentElement.appendChild(cloneTrack);
  cloneTrack.style.position = "absolute";
  cloneTrack.style.left = sliderTrack.scrollWidth + "px";
  cloneTrack.style.top = "0";
  cloneTrack.style.display = "flex";

  let pos = 0;
  let speed = 0.6;
  let isDragging = false;
  let autoScroll = true;
  let startX, currentPos;
  let pauseTimeout;

  const trackWidth = sliderTrack.scrollWidth;

  function animate() {
    if (!isDragging && autoScroll) {
      pos -= speed;

      // Loop infinito
      if (Math.abs(pos) >= trackWidth) pos = 0;

      sliderTrack.style.transform = `translateX(${pos}px)`;
      cloneTrack.style.transform = `translateX(${pos}px)`;
    }
    requestAnimationFrame(animate);
  }

  animate();

  // Funzioni drag
  function startDrag(e) {
    isDragging = true;
    autoScroll = false;
    clearTimeout(pauseTimeout);

    startX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    currentPos = pos;
  }

  function drag(e) {
    if (!isDragging) return;
    const x = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const walk = x - startX;
    pos = currentPos + walk;

    sliderTrack.style.transform = `translateX(${pos}px)`;
    cloneTrack.style.transform = `translateX(${pos}px)`;
  }

  function endDrag() {
    isDragging = false;

    // Riparte auto-scroll dopo 7 secondi dall'ultimo drag
    clearTimeout(pauseTimeout);
    pauseTimeout = setTimeout(() => {
      autoScroll = true;
    }, 7000);
  }

  // Event listeners drag e touch
  sliderContainer.addEventListener('mousedown', startDrag);
  sliderContainer.addEventListener('touchstart', startDrag);
  sliderContainer.addEventListener('mousemove', drag);
  sliderContainer.addEventListener('touchmove', drag);
  sliderContainer.addEventListener('mouseup', endDrag);
  sliderContainer.addEventListener('mouseleave', endDrag);
  sliderContainer.addEventListener('touchend', endDrag);

  // Resize
  window.addEventListener('resize', () => {
    cloneTrack.style.left = sliderTrack.scrollWidth + "px";
  });
}
