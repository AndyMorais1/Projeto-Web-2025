// Importando as bibliotecas necessárias
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/myComponents/AppSidebar";
import { cookies } from 'next/headers';  // Para acessar os cookies no servidor
import { redirect } from 'next/navigation';  // Para redirecionar
import { ReactNode } from 'react';

export default async function Layout({ children }: { children: ReactNode }) {
  // Verifica se o token existe nos cookies
  const cookieStore = await cookies(); // Não precisa usar "await" em "cookies()", apenas em "cookieStore"
  const token = cookieStore.get('token');

  // Se o token não existir, redireciona para a página de login
  if (!token) {
    console.log('Token não encontrado, redirecionando para login...');
    return redirect('/login'); // Redirecionamento direto para a página de login
  }

  // Se o token estiver presente, renderiza o conteúdo da página
  return (
    <SidebarProvider>
      <AppSidebar />
        <main className="flex p-4 mx-auto w-full">
          <SidebarTrigger className="sm:hidden" />
          {children}
        </main>
    </SidebarProvider>
  );
}
