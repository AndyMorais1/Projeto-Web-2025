// utils/authMiddleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import Cookies from 'js-cookie';

export function middleware(req: NextRequest) {
    // Verifica o token no localStorage ou nos cookies
    const token = Cookies.get('token') || localStorage.getItem('token');

    // Se não houver token, redireciona o usuário para a página de login
    if (!token) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    // Se houver token, a requisição segue normalmente
    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard',
        '/profile',
        '/settings',
        '/dashboard/users',
        '/dashboard/houses',
        '/dashboard/requests',
    ], // Defina as rotas que você deseja proteger
};
