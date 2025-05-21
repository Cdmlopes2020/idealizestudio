async function setLanguage(lang) {
  const response = await fetch(`/locales/${lang}.json`);
  const translations = await response.json();

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[key]) {
      el.innerText = translations[key];
    }
  });

  // Guarda no localStorage (opcional)
  localStorage.setItem('lang', lang);
}

// Carrega idioma salvo ou padrão
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('lang') || 'pt';
  setLanguage(savedLang);
});