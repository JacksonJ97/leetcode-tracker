import { Input as InputPrimitive } from "@base-ui/react/input";
import { cn } from "@/utils/functions";

function Input({ type = "text", className, ...props }: InputPrimitive.Props) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "border-border bg-surface text-foreground h-10 w-full rounded-md border p-2 text-sm",
        "placeholder:text-foreground-subtle disabled:pointer-events-none disabled:opacity-50 any-pointer-coarse:text-base",
        "focus:outline-focus-ring focus:outline-2 focus:-outline-offset-1",
        "data-invalid:outline-danger data-invalid:outline-2 data-invalid:-outline-offset-1",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
