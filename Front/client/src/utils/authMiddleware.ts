import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import Cookie from 'js-cookie'; // Importar a biblioteca js-cookie para manipulação de cookies

export function middleware(req: NextRequest) {
  // Verificar se o token está presente nos cookies
  const token = Cookie.get('token'); // Aqui usamos Cookie.get() para acessar o token nos cookies

  // Se não houver token, redireciona para a página de login
  if (!token) {
    return NextResponse.redirect(new URL('/', req.url));  // Redireciona para a página de login
  }

  // Caso o token exista, continua a requisição normalmente
  return NextResponse.next();
}

// Configuração do middleware, que define as rotas protegidas
export const config = {
  matcher: [
    
  ], // Aqui você pode adicionar mais rotas que precisam de autenticação
};
