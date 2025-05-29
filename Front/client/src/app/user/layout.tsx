import { Navbar } from "@/components/myComponents/NavBar";
import { Footer } from "@/components/myComponents/Footer";
import { cookies } from "next/headers";  
import { redirect } from "next/navigation";  


export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies(); // sem await aqui
  const token = cookieStore.get("token");

  if (!token) {
    redirect("/visitante");
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>

      <main className="flex-1">{children}</main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}
