import "../style/globals.css";
import { UsersProvider } from "@/contexts/UsersContext";
import { HousesProvider } from "@/contexts/HousesContext";
import { Toaster } from "sonner";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="">
        <UsersProvider>
        <HousesProvider>
        {children}
        <Toaster richColors />
        </HousesProvider>
        </UsersProvider>
        </body>
    </html>
  );
}
