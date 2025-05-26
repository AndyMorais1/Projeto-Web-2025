// app/page.tsx
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Home() {
  const cookieStore = await cookies(); // Use await aqui
  const token = cookieStore.get('token');

  if (token) {
    redirect('/user'); // Redireciona para a página do usuário se o token existir
  } else {
    redirect('/visitante'); // Redireciona para a página do visitante se o token não existir
  }
}
