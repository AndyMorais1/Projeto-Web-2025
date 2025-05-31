// app/layout.tsx
import "../style/globals.css";
import { UsersProvider } from "@/contexts/UsersContext";
import { HousesProvider } from "@/contexts/HousesContext";
import { HouseTypesProvider } from "@/contexts/HouseTypesContext";
import { VisitsProvider } from "@/contexts/VisitsContext"; // 👈 Novo
import { Toaster } from "sonner";
import "leaflet/dist/leaflet.css";
import Initializer from "@/components/myComponents/Init";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <UsersProvider>
          <HousesProvider>
            <HouseTypesProvider>
              <VisitsProvider> {/* 👈 Novo wrapper */}
                <Initializer />
                {children}
                <Toaster richColors />
              </VisitsProvider>
            </HouseTypesProvider>
          </HousesProvider>
        </UsersProvider>
      </body>
    </html>
  );
}
