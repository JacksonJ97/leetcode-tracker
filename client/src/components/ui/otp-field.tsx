import { OTPField as OTPFieldPrimitive } from "@base-ui/react";
import { cn } from "@/lib/utils";

function OTPField({ className, ...props }: OTPFieldPrimitive.Root.Props) {
  return <OTPFieldPrimitive.Root className={cn("flex gap-1 sm:gap-2", className)} {...props} />;
}

function OTPFieldInput({ className, ...props }: OTPFieldPrimitive.Input.Props) {
  return (
    <OTPFieldPrimitive.Input
      className={cn(
        "size-12 rounded-lg border border-border bg-surface text-center text-base font-medium text-foreground sm:size-14",
        "selection:bg-transparent selection:text-foreground",
        "disabled:pointer-events-none disabled:opacity-50",
        "focus:outline-2 focus:-outline-offset-1 focus:outline-focus-ring",
        "data-invalid:outline-2 data-invalid:-outline-offset-1 data-invalid:outline-danger data-invalid:focus:outline-focus-ring",
        className,
      )}
      {...props}
    />
  );
}

export { OTPField, OTPFieldInput };
