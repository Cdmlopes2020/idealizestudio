let translations = {};

async function setLanguage(lang) {
  const res = await fetch(`locales/${lang}.json`);
  translations = await res.json();
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
}

// Suporte para chaves aninhadas tipo "Navbar.Portuguese"
function getNestedTranslation(key) {
  return key.split('.').reduce((obj, k) => (obj && obj[k] ? obj[k] : null), translations);
}

// Carrega o idioma padrão ao entrar na página
window.addEventListener('DOMContentLoaded', () => {
  setLanguage('pt'); // ou 'en' como padrão
});