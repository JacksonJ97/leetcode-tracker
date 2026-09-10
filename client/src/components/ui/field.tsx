import { Field as FieldPrimitive } from "@base-ui/react/field";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

function Field({ className, ...props }: FieldPrimitive.Root.Props) {
  return <FieldPrimitive.Root className={cn("flex flex-col gap-2", className)} {...props} />;
}

function FieldLabel({ className, ...props }: FieldPrimitive.Label.Props) {
  return (
    <FieldPrimitive.Label
      className={cn(
        "text-sm font-medium text-foreground data-disabled:opacity-50 data-invalid:text-danger",
        className,
      )}
      {...props}
    />
  );
}

function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <FieldPrimitive.Description
      className={cn("text-sm text-foreground-muted data-disabled:opacity-50", className)}
      {...props}
    />
  );
}

function FieldError({ className, ...props }: FieldPrimitive.Error.Props) {
  return (
    <FieldPrimitive.Error
      className={cn("text-sm text-danger data-disabled:opacity-50", className)}
      {...props}
    />
  );
}

function FieldItem(props: FieldPrimitive.Item.Props) {
  return <FieldPrimitive.Item {...props} />;
}

function FieldSeparator({ children, className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("relative", className)} {...props}>
      <Separator className="absolute inset-0 top-1/2" />
      <span className="relative mx-auto block w-fit bg-background px-3 text-sm text-foreground">
        {children}
      </span>
    </div>
  );
}

export { Field, FieldLabel, FieldDescription, FieldError, FieldItem, FieldSeparator };
