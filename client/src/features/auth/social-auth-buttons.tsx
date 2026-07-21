"use client";

import { toast } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { GitHub } from "@/components/icons/github-icon";
import { Google } from "@/components/icons/google-icon";
import { env } from "@/lib/env";
import { auth } from "@/lib/auth-client";

function GithubSSO({ ...props }: React.ComponentProps<typeof Button>) {
  const handleClick = async () => {
    const { error } = await auth.signIn.social({
      provider: "github",
      callbackURL: `${env.NEXT_PUBLIC_CLIENT_ORIGIN}/dashboard`,
      errorCallbackURL: `${env.NEXT_PUBLIC_CLIENT_ORIGIN}/login`,
    });

    if (error) {
      toast.error("Couldn't sign in with GitHub. Please try again.");
    }
  };

  return (
    <Button variant="outline" onClick={handleClick} {...props}>
      <GitHub />
      Continue with Github
    </Button>
  );
}

function GoogleSSO({ ...props }: React.ComponentProps<typeof Button>) {
  const handleClick = async () => {
    const { error } = await auth.signIn.social({
      provider: "google",
      callbackURL: `${env.NEXT_PUBLIC_CLIENT_ORIGIN}/dashboard`,
      errorCallbackURL: `${env.NEXT_PUBLIC_CLIENT_ORIGIN}/login`,
    });

    if (error) {
      toast.error("Couldn't sign in with Google. Please try again.");
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
