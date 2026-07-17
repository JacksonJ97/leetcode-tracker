"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

export default function SignOutButton() {
  const router = useRouter();

  const handleClick = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
        onError: () => {
          console.error("Log out error");
        },
      },
    });
  };

  return (
    <Button
      size="icon-sm"
      variant="ghost"
      aria-label="Log out button"
      onClick={handleClick}
    >
      <LogOut />
    </Button>
  );
}
