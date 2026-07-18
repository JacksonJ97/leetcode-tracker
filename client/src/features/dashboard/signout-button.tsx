"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

function SignOutButton() {
  const router = useRouter();

  const handleClick = async () => {
    await auth.signOut({
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

export { SignOutButton };
