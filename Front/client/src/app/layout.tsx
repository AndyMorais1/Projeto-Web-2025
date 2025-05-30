// app/layout.tsx
import "../style/globals.css";
import { UsersProvider } from "@/contexts/UsersContext";
import { HousesProvider } from "@/contexts/HousesContext";
import { HouseTypesProvider } from "@/contexts/HouseTypesContext";
import { Toaster } from "sonner";
import "leaflet/dist/leaflet.css";
import Initializer from "@/components/myComponents/Init"; // 👈 import

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="">
        <UsersProvider>
          <HousesProvider>
            <HouseTypesProvider>
              <Initializer /> {/* 👈 roda ao iniciar o app */}
              {children}
              <Toaster richColors />
            </HouseTypesProvider>
          </HousesProvider>
        </UsersProvider>
      </body>
    </html>
  );
}
