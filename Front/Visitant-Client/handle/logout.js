document.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.getElementById('logout-btn');

  logoutBtn.addEventListener('click', async () => {

    try {
        await window.usersServices.logout();
        alert('Logout realizado com sucesso!');
        window.location.replace = '../index.html';

        }
    catch (err) {
        console.error('Erro ao fazer logout:', err);
        alert('Erro inesperado.');
        }
  });
});
