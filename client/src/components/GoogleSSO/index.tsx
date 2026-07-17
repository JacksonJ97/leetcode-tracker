"use client";

import { Button } from "@/components/ui/button";
import { Google } from "@/components/icons/google-icon";

export default function GoogleSSO({
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button variant="outline" {...props}>
      <Google />
      Google
    </Button>
  );
}
