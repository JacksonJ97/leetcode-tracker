"use client";

import { Button } from "@/components/ui/button";
import { GitHub } from "@/components/icons/github-icon";

export default function GithubSSO({
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button variant="outline" {...props}>
      <GitHub />
      Github
    </Button>
  );
}
