"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  CalendarDays,
  BookOpenText,
  NotebookTabs,
  ChartNoAxesCombined,
  ChartNoAxesColumnIncreasing,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import NavUser from "@/components/dashboard/nav-user";

const links = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Tracker",
    url: "/dashboard/tracker",
    icon: ChartNoAxesColumnIncreasing,
  },
  {
    title: "Calendar",
    url: "/dashboard/calendar",
    icon: CalendarDays,
  },
  {
    title: "Analytics",
    url: "/dashboard/analytics",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Guide",
    url: "/dashboard/guide",
    icon: BookOpenText,
  },
  {
    title: "Cheatsheet",
    url: "/dashboard/cheatsheet",
    icon: NotebookTabs,
  },
];

type User = {
  name: string;
  email: string;
  image: string | null;
};

export default function AppSidebar({ user }: { user: User }) {
  const pathname = usePathname();
  const { isMobile, setOpenMobile } = useSidebar();

  const closeMobileSidebar = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {links.map((link) => (
              <SidebarMenuItem key={link.title}>
                <SidebarMenuButton
                  tooltip={link.title}
                  isActive={pathname === link.url}
                  aria-current={pathname === link.url ? "page" : undefined}
                  render={
                    <Link href={link.url} onNavigate={closeMobileSidebar}>
                      {link.icon && <link.icon />} <span>{link.title}</span>
                    </Link>
                  }
                />
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
