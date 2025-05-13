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
// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    url: "/dashboard/users",
    icon: User,
  },
  {
    title: "Houses",
    url: "/dashboard/houses",
    icon: Home,
  },
  {
    title: "Agents Requests",
    url: "/dashboard/requests",
    icon: Check,
  },
];

export function AppSidebar() {
  const { currentUser, users } = useUsers();

  if (!currentUser) {
    return <div>Carregando usuário...</div>; 
  }

  return (
    <Sidebar>
      <SidebarHeader className="flex mx-auto p-6">
        <h1 className="text-2xl font-extralight">SpotHome</h1>
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="mb-2">Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
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
