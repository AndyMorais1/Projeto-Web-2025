import "../style/globals.css";
import { UsersProvider } from "@/contexts/UsersContext";
import { HousesProvider } from "@/contexts/HousesContext";
import { HouseTypesProvider } from "@/contexts/HouseTypesContext"; // ✅ importar
import { Toaster } from "sonner";
import "leaflet/dist/leaflet.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="">
        <UsersProvider>
          <HousesProvider>
            <HouseTypesProvider> {/* ✅ incluir aqui */}
              {children}
              <Toaster richColors />
            </HouseTypesProvider>
          </HousesProvider>
        </UsersProvider>
      </body>
    </html>
  );
}
