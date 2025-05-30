let translations = {};

async function setLanguage(lang) {
  const res = await fetch(`locales/${lang}.json`);
  translations = await res.json();
  localStorage.setItem('lang', lang);
  translatePage();
}

function translatePage() {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    const value = getNestedTranslation(key);
    if (value) {
      el.innerText = value;
    }
  });

  const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
  placeholders.forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const value = getNestedTranslation(key);
    if (value) {
      el.placeholder = value;
    }
  });
}

// Suporte para chaves aninhadas tipo "Navbar.Portuguese"
function getNestedTranslation(key) {
  return key.split('.').reduce((obj, k) => (obj && obj[k] ? obj[k] : null), translations);
}

// Carrega idioma salvo ou padrão
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('lang') || 'pt';
  setLanguage(savedLang);
});