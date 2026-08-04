"use client";

import { useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { toast } from "@/components/ui/toast";
import { getOAuthErrorMessage } from "@/features/auth/auth-errors";

function OAuthErrorToast() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    if (!error) return;

    const message = getOAuthErrorMessage(error);
    toast.add({ id: "oauth-error", type: "error", description: message });

    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.delete("error");

    const query = nextSearchParams.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  }, [error, pathname, router, searchParams]);

  return null;
}

export { OAuthErrorToast };
