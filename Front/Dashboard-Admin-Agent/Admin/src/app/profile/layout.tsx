import { cookies } from 'next/headers';  // Para acessar os cookies no servidor
import { redirect } from 'next/navigation';  // Para redirecionar
export default async function Layout({ children }: { children: React.ReactNode }) {
   // Verifica se o token existe nos cookies
   const cookieStore = await cookies();
   const token = cookieStore.get('token');



   // Se o token não existir, redireciona para a página de login
   if (!token) {
       console.log('Token não encontrado, redirecionando para login...');
       redirect('/');
   }

   // Se o token estiver presente, renderiza o conteúdo da página
  return (
    <>
      <main className="flex  mx-auto w-full h-screen"> {children}</main>
    </>
  );
}
