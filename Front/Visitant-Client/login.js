import axios from 'axios';
import Cookie from 'js-cookie';

/**
 
Faz login com email e senha.
@param {string} email - O email do usuário.
@param {string} password - A senha do usuário.
@returns {Promise<string|null>} - Retorna o token se o login for bem-sucedido, ou null em caso de erro.*/
async function login(email, password) {
  try {
    const response = await axios.post('http://localhost:3000/users/login/admin', {
      email,
      password,
    });

    const token = response.data?.token;

    if (!token) {
      console.error('Token não encontrado na resposta');
      return null;
    }

    // Armazena no localStorage
    localStorage.setItem('token', token);

    // Armazena no cookie
    Cookie.set('token', token, {
      expires: 7, // 7 dias
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
    });

    console.log('Login bem-sucedido!');
    return token;
  } catch (error) {
    console.error('Erro no login:', error.response?.data || error.message);
    return null;
  }
}
