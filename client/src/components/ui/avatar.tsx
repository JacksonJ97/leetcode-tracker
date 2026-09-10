import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import { cn } from "@/lib/utils";

function Avatar({
  size = "default",
  className,
  ...props
}: AvatarPrimitive.Root.Props & {
  size?: "sm" | "default" | "lg" | "xl";
}) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      className={cn(
        "group/avatar relative flex size-8 shrink-0 rounded-full select-none",
        "data-[size=lg]:size-12 data-[size=sm]:size-6 data-[size=xl]:size-20",
        className,
      )}
      {...props}
    />
  );
}

function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("size-full rounded-full object-cover", className)}
      {...props}
    />
  );
}

function AvatarFallback({ className, ...props }: AvatarPrimitive.Fallback.Props) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center rounded-full bg-surface text-sm text-foreground [&>svg]:size-4.5 [&>svg]:shrink-0",
        "group-data-[size=lg]/avatar:text-base group-data-[size=sm]/avatar:text-xs group-data-[size=xl]/avatar:text-xl",
        "group-data-[size=lg]/avatar:[&>svg]:size-5 group-data-[size=sm]/avatar:[&>svg]:size-4 group-data-[size=xl]/avatar:[&>svg]:size-6",
        className,
      )}
      {...props}
    />
  );
}

function AvatarBadge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        "absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-primary text-foreground ring-2 ring-background select-none [&>svg]:shrink-0",
        "group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden",
        "group-data-[size=default]/avatar:size-3 group-data-[size=default]/avatar:[&>svg]:size-2.5",
        "group-data-[size=lg]/avatar:size-4 group-data-[size=lg]/avatar:[&>svg]:size-3",
        "group-data-[size=xl]/avatar:right-0.5 group-data-[size=xl]/avatar:bottom-0.5 group-data-[size=xl]/avatar:size-5 group-data-[size=xl]/avatar:[&>svg]:size-3.5",
        className,
      )}
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback, AvatarBadge };
