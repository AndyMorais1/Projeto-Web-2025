import "../style/globals.css";
import { UsersProvider } from "@/contexts/UsersContext";
import { HousesProvider } from "@/contexts/HousesContext";
import { HouseTypesProvider } from "@/contexts/HouseTypesContext";
import { Toaster } from "sonner";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <UsersProvider>
          <HouseTypesProvider> {/* Adicionado aqui */}
            <HousesProvider>
              {children}
              <Toaster richColors />
            </HousesProvider>
          </HouseTypesProvider>
        </UsersProvider>
      </body>
    </html>
  );
}
