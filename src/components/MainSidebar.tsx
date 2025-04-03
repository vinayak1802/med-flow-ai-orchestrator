
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  BarChart3,
  BedDouble,
  Calendar,
  Home,
  MessageSquare,
  Settings,
  Users,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const menuItems = [
  {
    title: "Dashboard",
    path: "/",
    icon: Home,
  },
  {
    title: "Appointments",
    path: "/appointments",
    icon: Calendar,
  },
  {
    title: "Bed Management",
    path: "/beds",
    icon: BedDouble,
  },
  {
    title: "Patients",
    path: "/patients",
    icon: Users,
  },
  {
    title: "Analytics",
    path: "/analytics",
    icon: BarChart3,
  },
  {
    title: "AI Assistant",
    path: "/assistant",
    icon: MessageSquare,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

export function MainSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="flex items-center px-4 h-14">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center rounded-md bg-primary text-primary-foreground font-bold">
            H+
          </div>
          <span className="font-bold text-lg">MedFlow AI</span>
        </div>
        <div className="ml-auto md:hidden">
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Hospital Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="px-4 py-3 flex items-center gap-2">
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">
          DR
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium">Dr. Rebecca White</span>
          <span className="text-xs text-muted-foreground">Head of Cardiology</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
