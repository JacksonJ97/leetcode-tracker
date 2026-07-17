import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/classnames";

const variants = cva(
  "focus-visible:outline-focus-ring inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border border-transparent leading-none font-medium whitespace-nowrap transition-[background-color] duration-100 select-none focus-visible:outline-2 focus-visible:outline-offset-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        solid:
          "bg-primary text-foreground-on-primary hover:bg-primary-hover active:bg-primary-active",
        outline:
          "border-border text-foreground hover:bg-surface active:bg-surface-interactive bg-transparent",
        ghost:
          "text-foreground hover:bg-surface active:bg-surface-interactive bg-transparent",
        secondary:
          "bg-surface-interactive text-foreground hover:bg-surface-interactive-hover active:bg-surface-interactive-active",
        destructive:
          "bg-destructive text-foreground-on-destructive hover:bg-destructive-hover active:bg-destructive-active",
      },
      size: {
        sm: "h-8 px-3 text-sm [&_svg]:size-4",
        md: "h-10 px-4 text-sm [&_svg]:size-4",
        lg: "h-12 px-5 text-base [&_svg]:size-5",
        "icon-sm": "size-7 [&_svg]:size-4",
        icon: "size-8 [&_svg]:size-4",
        "icon-lg": "size-9 [&_svg]:size-5",
      },
    },
  },
);

function Button({
  size = "md",
  variant = "solid",
  className,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof variants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(variants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, variants };
