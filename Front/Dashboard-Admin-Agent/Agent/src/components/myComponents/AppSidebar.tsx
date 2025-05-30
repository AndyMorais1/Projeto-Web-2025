"use client";
import { LayoutDashboard, User, Home, Check, NotebookText, MessageCircle, Rss } from "lucide-react";
import { Separator } from "../ui/separator";
import { UserSidebar } from "./UserSideBar";
import { useUsers } from "@/contexts/UsersContext"; // Importa o contexto de usuários
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Link from "next/link";
// Menu items.
const items = [
  {
    title: "Painel",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Minhas Casas",
    url: "/dashboard/houses",
    icon: Home,
  },
  {
    title: "Minhas Visitas",
    url: "/dashboard/visits",
    icon: NotebookText,
  },
  {
    title: "Rede",
    url: "/dashboard/rede",
    icon: Rss,
  },
  {
    title: "Suporte",
    url: "/dashboard/support",
    icon: MessageCircle,
  },
];

export function AppSidebar() {
  const { currentUser, users } = useUsers();


  return (
    <div>
      <Sidebar>
        <SidebarHeader className="flex mx-auto p-6">
          <h1 className="text-2xl font-bold text-blue-600">SpotHome</h1>
        </SidebarHeader>
        <Separator />
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="mb-2">Aplicação</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>

            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <Separator />
        <SidebarFooter className="p-4">
          <UserSidebar />
        </SidebarFooter>
      </Sidebar>
    </div>
  );
}
