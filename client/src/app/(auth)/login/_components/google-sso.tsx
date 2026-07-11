"use client";

import { Button } from "@/components/Button";
import { Google } from "@/components/Icon/google";

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
