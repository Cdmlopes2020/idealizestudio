const form = document.getElementById('contact-form');
const respostaDiv = document.getElementById('resposta');
const popup = document.getElementById('popup');
const botaoFechar = document.getElementById('fechar-popup');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = {
    nome: formData.get('name'),
    email: formData.get('email'),
    mensagem: formData.get('message'),
    recaptchaToken: grecaptcha.getResponse() // token do Google reCAPTCHA
  };

  if (!data.recaptchaToken) {
    respostaDiv.innerText = 'Por favor, confirme que não é um robô.';
    popup.classList.remove('hidden');
    return;
  }

  try {
    const response = await fetch('https://idealizestudio-server.onrender.com/enviar-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    respostaDiv.innerText = result.message;
    popup.classList.remove('hidden');

    if (response.ok) {
      form.reset();
      grecaptcha.reset(); // limpa o reCAPTCHA
    }
  } catch (error) {
    console.error('Erro ao enviar:', error);
    respostaDiv.innerText = 'Erro ao enviar o formulário.';
    popup.classList.remove('hidden');
  }
});

botaoFechar.addEventListener('click', () => {
  popup.classList.add('hidden');
});