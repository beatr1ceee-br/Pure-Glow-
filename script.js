const toggleBtn = document.getElementById('theme-toggle');
const body = document.body;

toggleBtn.addEventListener('click', () => {
  body.classList.toggle('dark');
  toggleBtn.textContent = body.classList.contains('dark') ? '☀️' : '🌙';
});

async function loadConfig() {
  try {

    const response = await fetch('config.json');
    const data = await response.json();

    const heroImg = document.getElementById('hero-img');
    const heroTitle = document.getElementById('hero-title');
    const heroDesc = document.getElementById('hero-desc');

    if (heroImg) heroImg.src = data.hero.image;
    if (heroTitle) heroTitle.textContent = data.hero.title;
    if (heroDesc) heroDesc.textContent = data.hero.description;

    const titleElement = document.getElementById('main-title');
    if (titleElement) {
      titleElement.textContent = data.sections.newProducts;
    }

    console.log("Configurația a fost încărcată cu succes!");
  } catch (error) {
    console.error("Nu am putut încărca fișierul JSON:", error);
  }
}

loadConfig();