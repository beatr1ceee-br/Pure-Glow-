const toggleBtn = document.getElementById('theme-toggle');
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  toggleBtn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

async function loadSite() {
  try {
    const response = await fetch('config.json');
    const data = await response.json();

    // 1. HERO SECTION
    document.getElementById('hero-id').innerHTML = `
      <div class="hero-image">
        <img src="${data.hero.image}" alt="Hero Image">
        <div class="hero-text">
          <h1>${data.hero.title}</h1>
          <p>${data.hero.description}</p>
          <a href="#" class="btn">Shop Now</a>
        </div>
      </div>`;

    // 2. NEW PRODUCTS
    document.getElementById('products-title').textContent = data.newProducts.sectionTitle;
    const productsList = document.getElementById('products-list');
    data.newProducts.items.forEach(p => {
      productsList.innerHTML += `
        <div class="product-card">
          <img src="${p.img}" alt="${p.name}">
          <h3>${p.name}</h3>
          <p>${p.price}</p>
          <a href="#" class="btn">Shop Now</a>
        </div>`;
    });

    // 3. CATEGORIES
    document.getElementById('categories-title').textContent = data.categories.sectionTitle;
    const categoriesList = document.getElementById('categories-list');
    data.categories.items.forEach(c => {
      categoriesList.innerHTML += `
        <div class="category-box">
          <img src="${c.img}" alt="${c.name}">
          <p>${c.name}</p>
        </div>`;
    });

    // 4. ABOUT SECTION
    const aboutSection = document.getElementById('about');
    aboutSection.innerHTML = `
      <div class="about-content">
        <h2>${data.about.title}</h2>
        ${data.about.paragraphs.map(p => `<p>${p}</p>`).join('')}
      </div>`;

  } catch (err) {
    console.error("Nu am putut încărca datele:", err);
  }
}

loadSite();
// Așteptăm ca DOM-ul să fie încărcat
document.addEventListener('submit', function(e) {
  if (e.target.classList.contains('contact-form')) {
    e.preventDefault(); // Oprește reîncărcarea paginii

    // Creăm elementul pentru alertă
    const alertOverlay = document.createElement('div');
    alertOverlay.className = 'custom-alert-overlay';
    alertOverlay.innerHTML = `
      <div class="custom-alert-box">
        <h3>Message Sent!</h3>
        <p>Thank you for reaching out to Pure Glow. We will get back to you soon.</p>
        <button class="btn" onclick="this.parentElement.parentElement.remove()">Close</button>
      </div>
    `;

    document.body.appendChild(alertOverlay);
    
    // Resetăm formularul
    e.target.reset();
  }
});