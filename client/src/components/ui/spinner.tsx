import { Loader2Icon } from "lucide-react";
import { cn } from "@/lib/utils";

function Spinner({
  className,
  "aria-label": label = "Loading",
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <output aria-label={label} className="inline-flex shrink-0">
      <Loader2Icon
        data-slot="spinner"
        className={cn("size-4 animate-spin", className)}
        {...props}
        focusable="false"
        aria-hidden="true"
      />
    </output>
  );
}

export { Spinner };
