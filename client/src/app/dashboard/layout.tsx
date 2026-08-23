import Link from "next/link";
import {
  Home,
  CalendarDays,
  BookOpenText,
  NotebookTabs,
  ChartNoAxesCombined,
  ChartNoAxesColumnIncreasing,
} from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth-client";
import { SignOutButton } from "@/features/dashboard/signout-button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";

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

function AppSidebar() {
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
                <SidebarMenuButton tooltip={link.title}>
                  {link.icon && <link.icon />}
                  <Link href={link.url}>{link.title}</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SignOutButton />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { data: session } = await auth.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-svh">
      <SidebarProvider>
        <AppSidebar />
      </SidebarProvider>
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
