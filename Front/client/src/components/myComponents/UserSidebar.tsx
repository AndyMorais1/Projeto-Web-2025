"use client";
import { ChevronsUpDown, LogOut, User, MessageCircle } from "lucide-react";
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
import { usersServices } from "@/api/Users";
import { useUsers } from "@/contexts/UsersContext";
import { useHouses } from "@/contexts/HousesContext";

export function UserDropdown() {
  const router = useRouter();
  const { currentUser, resetUsers } = useUsers();
  const { resetHouses } = useHouses();

  function handleLogout() {
    usersServices.logout()
      .then(() => {
        router.replace("/visitante");
        resetHouses();
        resetUsers();
      })
      .catch((error) => {
        console.error("Erro ao fazer logout:", error);
      });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center justify-center h-12 w-12 rounded-full border-2 border-blue-600 transition focus:outline-none focus:ring-0">
          <Avatar >
            <AvatarImage src={currentUser?.photo} alt={currentUser?.name?.[0]} />
            <AvatarFallback>{currentUser?.name?.[0]}</AvatarFallback>
          </Avatar>
        </button>

      </DropdownMenuTrigger>


      <DropdownMenuContent className="min-w-56" align="end" sideOffset={4}>
        <DropdownMenuLabel>
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={currentUser?.photo} alt={currentUser?.name?.[0]} />
              <AvatarFallback>{currentUser?.name?.[0]}</AvatarFallback>
            </Avatar>
            <div className="text-sm font-semibold truncate">{currentUser?.name}</div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuGroup>
          <a href="/user/perfil">
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Perfil
            </DropdownMenuItem>
          </a>
          <a href="/user/suporte">
            <DropdownMenuItem>
              <MessageCircle className="mr-2 h-4 w-4" />
              Suporte
            </DropdownMenuItem>
          </a>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4 text-red-600" />
          <span className="text-red-600">Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
