import { Field as FieldPrimitive } from "@base-ui/react/field";
import { cn } from "@/utils/functions";
import { Separator } from "@/components/Separator";

function Field({ className, ...props }: FieldPrimitive.Root.Props) {
  return (
    <FieldPrimitive.Root
      className={cn("flex flex-col gap-1.5", className)}
      {...props}
    />
  );
}

function FieldLabel({ className, ...props }: FieldPrimitive.Label.Props) {
  return (
    <FieldPrimitive.Label
      className={cn(
        "text-foreground data-invalid:text-danger text-sm font-semibold data-disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <FieldPrimitive.Description
      className={cn(
        "text-foreground-muted text-sm data-disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

function FieldError({ className, ...props }: FieldPrimitive.Error.Props) {
  return (
    <FieldPrimitive.Error
      className={cn("text-danger text-sm data-disabled:opacity-50", className)}
      {...props}
    />
  );
}

function FieldItem(props: FieldPrimitive.Item.Props) {
  return <FieldPrimitive.Item {...props} />;
}

function FieldSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("relative", className)} {...props}>
      <Separator className="absolute inset-0 top-1/2" />
      <span className="bg-background text-foreground relative mx-auto block w-fit px-3 text-sm">
        {children}
      </span>
    </div>
  );
}

export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldItem,
  FieldSeparator,
};
