import LinkPrimitive from "next/link";
import { cn } from "@/lib/utils";

function Link({
  className,
  ...props
}: React.ComponentProps<typeof LinkPrimitive>) {
  return (
    <LinkPrimitive
      className={cn(
        "text-link hover:text-link-hover focus-visible:outline-focus-ring hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2",
        className,
      )}
      {...props}
    />
  );
}

export { Link };
