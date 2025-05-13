document.addEventListener('DOMContentLoaded', () => {
  const loginBtn = document.getElementById('login-btn');

  loginBtn.addEventListener('click', async () => {
    const email = document.getElementById('form2Example17').value.trim();
    const password = document.getElementById('form2Example27').value;

    if (!email || !password) {
      alert('Preencha todos os campos');
      return;
    }

    try {
      const token = await window.usersServices.login(email, password);
      if (token) {
        alert('Login realizado com sucesso!');
      window.location.replace = '/public/clientHome.html';
      } else {
        alert('Email ou senha incorretos.');
      }
    } catch (err) {
      console.error('Erro ao fazer login:', err);
      alert('Erro inesperado.');
    }
  });
});
