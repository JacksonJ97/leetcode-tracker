"use client";

import { env } from "@/lib/env";
import { auth } from "@/lib/auth-client";
import { toast } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { GitHub } from "@/components/icons/github-icon";
import { Google } from "@/components/icons/google-icon";
import { getOAuthErrorMessage } from "@/features/auth/oauth-errors";

function GithubSSO({
  origin,
  ...props
}: React.ComponentProps<typeof Button> & { origin: "login" | "signup" }) {
  const handleClick = async () => {
    const { error } = await auth.signIn.social({
      provider: "github",
      callbackURL: `${env.NEXT_PUBLIC_CLIENT_ORIGIN}/dashboard`,
      errorCallbackURL: `${env.NEXT_PUBLIC_CLIENT_ORIGIN}/${origin}`,
    });

    if (error) {
      const message = getOAuthErrorMessage(error.code);
      toast.error(message);
    }
  };

  return (
    <Button variant="outline" onClick={handleClick} {...props}>
      <GitHub />
      Continue with Github
    </Button>
  );
}

function GoogleSSO({
  origin,
  ...props
}: React.ComponentProps<typeof Button> & { origin: "login" | "signup" }) {
  const handleClick = async () => {
    const { error } = await auth.signIn.social({
      provider: "google",
      callbackURL: `${env.NEXT_PUBLIC_CLIENT_ORIGIN}/dashboard`,
      errorCallbackURL: `${env.NEXT_PUBLIC_CLIENT_ORIGIN}/${origin}`,
    });

    if (error) {
      const message = getOAuthErrorMessage(error.code);
      toast.error(message);
    }
  };

  return (
    <Button variant="outline" onClick={handleClick} {...props}>
      <Google />
      Continue with Google
    </Button>
  );
}

export { GithubSSO, GoogleSSO };
