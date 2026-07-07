import { CheckIcon } from "lucide-react";
import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { cn } from "@/utils/functions";

function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer border-border bg-surface flex size-4 shrink-0 items-center justify-center rounded border outline-none group-has-disabled/field:opacity-50",
        "data-checked:bg-foreground data-checked:border-foreground data-checked:text-foreground-inverse data-disabled:opacity-50",
        "focus-visible:border-foreground/75 focus-visible:ring-foreground/50 focus-visible:ring-2",
        "aria-invalid:border-danger/75 aria-invalid:ring-danger/75 aria-invalid:ring-2",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator data-slot="checkbox-indicator">
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
