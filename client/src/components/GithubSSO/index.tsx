"use client";

import { Button } from "@/components/Button";
import { GitHub } from "@/components/Icon/github";

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
