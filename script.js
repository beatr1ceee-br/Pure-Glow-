// 1. Selectăm butonul folosind ID-ul tău din HTML
const toggleBtn = document.getElementById('theme-toggle');

/**
 * LOGICĂ PENTRU DARK MODE (PERSISTENTĂ)
 * Această secțiune se asigură că tema nu se pierde la refresh
 */
window.addEventListener("load", () => {
  // Verificăm dacă utilizatorul a setat anterior tema "dark"
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    toggleBtn.textContent = '☀️'; // Schimbăm iconița în soare pentru dark mode
  } else {
    document.body.classList.remove('dark');
    toggleBtn.textContent = '🌙'; // Rămâne lună pentru light mode
  }
});

// Event listener pentru click pe butonul de toggle
toggleBtn.addEventListener('click', () => {
  // Toggle pe clasa .dark (pe care o ai deja definită în CSS)
  document.body.classList.toggle('dark');

  // Verificăm starea actuală după click
  const isDark = document.body.classList.contains('dark');
  
  // Actualizăm iconița
  toggleBtn.textContent = isDark ? '☀️' : '🌙';

  // Salvăm preferința în localStorage ca să rămână și după refresh
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

/**
 * ÎNCĂRCAREA CONȚINUTULUI DIN JSON
 */
async function loadSite() {
  try {
    const response = await fetch('config.json');
    const data = await response.json();

    // 1. HERO SECTION
    const heroId = document.getElementById('hero-id');
    if (heroId) {
      heroId.innerHTML = `
        <div class="hero-image">
          <img src="${data.hero.image}" alt="Hero Image">
          <div class="hero-text">
            <h1>${data.hero.title}</h1>
            <p>${data.hero.description}</p>
            <a href="#" class="btn">Shop Now</a>
          </div>
        </div>`;
    }

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
    if (aboutSection) {
      aboutSection.innerHTML = `
        <div class="about-content">
          <h2>${data.about.title}</h2>
          ${data.about.paragraphs.map(p => `<p>${p}</p>`).join('')}
        </div>`;
    }

  } catch (err) {
    console.error("Nu am putut încărca datele:", err);
  }
}

// Apelăm funcția de încărcare a site-ului
loadSite();

document.addEventListener('submit', function(e) {
  if (e.target.classList.contains('contact-form')) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const name = formData.get('user_name');
    const email = formData.get('user_email'); 

    // --- LOGICA DE SALVARE ÎN LOCAL STORAGE ---
    // Creăm un obiect cu datele transmise
    const contactData = {
      nume: name,
      email: email,
      dataTrimitere: new Date().toLocaleString()
    };

    // Salvăm obiectul sub cheia "last_contact"
    // Folosim JSON.stringify pentru că LocalStorage știe să salveze doar text
    localStorage.setItem("last_contact", JSON.stringify(contactData));
    // ------------------------------------------

    const alertOverlay = document.createElement('div');
    alertOverlay.className = 'custom-alert-overlay';
    alertOverlay.innerHTML = `
      <div class="custom-alert-box">
        <h3>Message Sent!</h3>
        <p>Hello <strong>${name}</strong>,</p>
        <p>We've sent a confirmation to: <br> 
           <span style="color: #d4a373;">${email}</span></p>
        <p style="font-size: 12px; color: #888; margin-top: 10px;">Datele tale au fost salvate local în browser.</p>
        <button class="btn" onclick="this.parentElement.parentElement.remove()">Close</button>
      </div>
    `;

    document.body.appendChild(alertOverlay);
    e.target.reset();
  }
});