import "../style/globals.css";
import { UsersProvider } from "@/contexts/UsersContext";
import { Toaster } from "sonner";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="">
        <UsersProvider>
        {children}
        <Toaster richColors />
        </UsersProvider>
        </body>
    </html>
  );
}
