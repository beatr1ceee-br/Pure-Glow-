// --- 1. DARK MODE TOGGLE ---
const toggleBtn = document.getElementById('theme-toggle');
const body = document.body;

toggleBtn.addEventListener('click', () => {
  body.classList.toggle('dark');
  console.log('Sunt aici');

  if (body.classList.contains('dark')) {
    toggleBtn.textContent = '☀️';
  } else {
    toggleBtn.textContent = '🌙';
  }
});


const titleElement = document.getElementById('main-title');

if (titleElement) {
    titleElement.textContent = 'New Products';
}

const heroImg = document.getElementById('hero-img');
const heroTitle = document.getElementById('hero-title');
const heroDesc = document.getElementById('hero-desc');

if (heroImg) heroImg.src = 'makeup-artist.webp';
if (heroTitle) heroTitle.textContent = 'Beauty Made Easy';
if (heroDesc) heroDesc.textContent = 'Discover our collection of skincare and makeup products designed to make you glow naturally every day.';