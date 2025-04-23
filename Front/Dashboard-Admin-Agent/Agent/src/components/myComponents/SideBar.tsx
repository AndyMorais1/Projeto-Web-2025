import { LayoutDashboard, Home, MessageCircle, NotebookPen } from "lucide-react";
import { Separator } from "../ui/separator";
import { UserSidebar } from "./UserSideBar";
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
    title: "My Houses",
    url: "/dashboard/houses",
    icon: Home,
  },
  {
    title: "My Visits",
    url: "/dashboard/visits",
    icon: NotebookPen,
  },
  {
    title: "Support",
    url: "/dashboard/support",
    icon: MessageCircle,
  },
];

const data = {
  user: {
    name: "José Morais",
    avatar: "https://avatars.githubusercontent.com/u/34351007?v=4",
  },
};

export function AppSidebar() {
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
        <UserSidebar user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
