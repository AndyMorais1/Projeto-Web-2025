"use client";
import { ChevronsUpDown, LogOut, User, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { usersServices } from "@/api/Users";
import { useUsers } from "@/contexts/UsersContext";
import { useHouses } from "@/contexts/HousesContext";

export function UserSidebar() {
  const { isMobile } = useSidebar();
  const router = useRouter();
  const { currentUser, resetUsers } = useUsers();
  const { resetHouses } = useHouses();

  function handleLogout() {
    usersServices.logout()
      .then(() => {
        // Redireciona o usuário para a página de login após o logout
        router.replace("/"); // O replace impede que o usuário volte à página anterior após o logout
        resetHouses(); // Reseta as casas após o logout
        resetUsers(); // Reseta os usuários após o logout
        
      })
      .catch((error) => {
        console.error("Erro ao fazer logout:", error);
        // Aqui você pode também mostrar uma mensagem de erro, se desejar
      });
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={currentUser?.photo || "https://avatars.githubusercontent.com/u/34351007?v=4"} alt={currentUser?.name[0]} />
                <AvatarFallback className="rounded-lg">{currentUser?.name[0]}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{currentUser?.name}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={currentUser?.photo || "https://avatars.githubusercontent.com/u/34351007?v=4"} alt={currentUser?.name[0]} />
                  <AvatarFallback className="rounded-lg">{currentUser?.name[0]}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{currentUser?.name}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuGroup>
              <a href="/dashboard/profile">
                <DropdownMenuItem>
                  <User />
                  Perfil
                </DropdownMenuItem>
              </a>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="text-red-600" />
              <p className="text-red-600">Sair</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
