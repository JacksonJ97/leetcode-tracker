"use client";

import Link from "next/link";
import { Bell, LogOut, BadgeCheck } from "lucide-react";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLinkItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useLogout } from "@/features/auth/helpers";

type User = {
  name: string;
  email: string;
  image: string | null;
};

export default function NavUser({ user }: { user: User }) {
  const { logout } = useLogout();

  const names = user.name.trim().split(/\s+/);

  const initials = names.length === 1 ? names[0][0] : names[0][0] + names[names.length - 1][0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <SidebarMenuButton
            tooltip={user.name}
            className="h-14 group-data-[collapsible=icon]:p-1.5"
          >
            <Avatar size="sm">
              <AvatarImage src={user.image ? user.image : ""} alt={user.name} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="grid gap-px truncate text-left text-sm font-normal">
              <span>{user.name}</span>
              <span className="text-xs text-foreground-muted">{user.email}</span>
            </div>
          </SidebarMenuButton>
        }
      />
      <DropdownMenuContent
        side="top"
        sideOffset={12}
        align="start"
        className="w-(--anchor-width) min-w-56"
      >
        <DropdownMenuGroup>
          <DropdownMenuLinkItem
            closeOnClick={true}
            render={
              <Link href="/dashboard/account">
                <BadgeCheck />
                <span>Account</span>
              </Link>
            }
          />

          <DropdownMenuLinkItem
            closeOnClick={true}
            render={
              <Link href="/dashboard/notifications">
                <Bell />
                <span>Notifications</span>
              </Link>
            }
          />
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem variant="destructive" onClick={logout}>
            <LogOut />
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
