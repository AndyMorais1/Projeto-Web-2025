"use client";
import { LayoutDashboard, User, Home, Check } from "lucide-react";
import { Separator } from "../ui/separator";
import { UserSidebar } from "./UserSidebar";
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
    title: "Usuários",
    url: "/dashboard/users",
    icon: User,
  },
  {
    title: "Imóveis",
    url: "/dashboard/houses",
    icon: Home,
  },
  {
    title: "Requisições de Agentes",
    url: "/dashboard/requests",
    icon: Check,
  },
];

export function AppSidebar() {
  const { currentUser, users } = useUsers();

  return (
    <Sidebar>
      <SidebarHeader className="flex mx-auto p-6">
        <h1 className="text-2xl font-bold text-blue-600">SpotHome</h1>
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="mb-2">Applicação</SidebarGroupLabel>
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
  );
}
