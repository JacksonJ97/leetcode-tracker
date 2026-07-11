import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/functions";

const variants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border border-transparent leading-none font-medium whitespace-nowrap transition-[background-color] select-none focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-white disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        solid:
          "bg-primary hover:bg-primary-hover active:bg-primary-active text-foreground-inverse border-primary",
        outline:
          "border-border text-foreground hover:bg-surface active:bg-background bg-transparent",
        // default: "bg-primary text-primary-foreground hover:bg-primary/80",
        // outline:
        //   "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        // secondary:
        //   "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        // ghost:
        //   "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        // destructive:
        //   "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        // link: "text-primary underline-offset-4 hover:underline",
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
