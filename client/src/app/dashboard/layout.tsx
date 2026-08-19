import Link from "next/link";
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
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";

function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <Link href="/dashboard">Home</Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/dashboard/tracker">Tracker</Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/dashboard/calendar">Calendar</Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/dashboard/analytics">Analytics</Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/dashboard/cheatsheet">Cheatsheet</Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/dashboard/guide">Guide</Link>
            </SidebarMenuItem>
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
    <div className="flex min-h-screen">
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1 p-4">{children}</main>
      </SidebarProvider>
    </div>
  );
}
