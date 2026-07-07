import { Input as InputPrimitive } from "@base-ui/react/input";
import { cn } from "@/utils/functions";

// TODO: Remove autofill styles

function Input({ type, className, ...props }: InputPrimitive.Props) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "border-border bg-surface h-10 w-full rounded-md border p-2 text-base transition-colors outline-none",
        "placeholder:text-foreground-muted disabled:pointer-events-none disabled:opacity-50",
        "focus-visible:border-foreground/75 focus-visible:ring-foreground/50 focus-visible:ring-2",
        "aria-invalid:border-danger/75 aria-invalid:ring-danger/75 aria-invalid:ring-2",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
