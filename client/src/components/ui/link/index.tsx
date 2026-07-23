import LinkPrimitive from "next/link";
import { cn } from "@/lib/utils";

function Link({
  className,
  ...props
}: React.ComponentProps<typeof LinkPrimitive>) {
  return (
    <LinkPrimitive
      className={cn(
        "text-link hover:text-link-hover focus-visible:outline-focus-ring inline-flex items-center gap-1.5 hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 [&_svg]:size-4 [&_svg]:shrink-0",
        className,
      )}
      {...props}
    />
  );
}

export { Link };
