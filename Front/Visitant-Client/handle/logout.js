document.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.getElementById('logout-btn');

  logoutBtn.addEventListener('click', async () => {
    try {
      await window.usersServices.logout();
      window.location.replace('/public/login.html'); // Corrected line
    } catch (err) {
      console.error('Erro ao fazer logout:', err);
      alert('Erro inesperado.');
    }
  });
});
