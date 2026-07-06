import { Input as InputPrimitive } from "@base-ui/react/input";
import { cn } from "@/utils/functions";

// TODO: Remove autofill styles

function Input({ type, className, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "border-border bg-surface h-10 w-full rounded border p-2 text-base transition-colors outline-none",
        "placeholder:text-foreground-muted aria-invalid:border-danger/75 aria-invalid:ring-danger/75 focus-visible:ring-primary/75 focus-visible:border-primary/75 focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-invalid:ring-2",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
