import { NavbarPublic } from "@/components/myComponents/NavbarPublic";
import { Footer } from "@/components/myComponents/Footer";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="sticky top-0 z-50">
        <NavbarPublic />
      </header>

      <main className="flex-1">{children}</main>
      <Footer/>

    </div>
  );
}
