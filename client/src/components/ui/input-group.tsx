"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(
        "border-border bg-surface flex h-10 w-full min-w-0 flex-1 items-center rounded-md border",
        "has-[[data-slot=input-group-control]:focus]:outline-focus-ring has-disabled:opacity-50 has-[[data-slot=input-group-control]:focus]:outline-2 has-[[data-slot=input-group-control]:focus]:-outline-offset-1",
        "has-[[data-slot=input-group-control][data-invalid]]:outline-danger has-[[data-slot=input-group-control][data-invalid]]:outline-2 has-[[data-slot=input-group-control][data-invalid]]:-outline-offset-1",
        className,
      )}
      {...props}
    />
  );
}

function InputGroupInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="input-group-control"
      className={cn(
        "rounded-none border-0 bg-transparent focus:outline-none data-invalid:outline-none",
        className,
      )}
      {...props}
    />
  );
}

function InputGroupAddon({
  align = "inline-start",
  className,
  ...props
}: React.ComponentProps<"div"> & { align?: "inline-start" | "inline-end" }) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(
        "text-foreground-muted flex shrink-0 items-center text-sm [&>svg]:size-4",
        align === "inline-start"
          ? "order-first pl-2 has-data-[slot=button]:pl-1"
          : "order-last pr-2 has-data-[slot=button]:pr-1",
        className,
      )}
      onClick={(event) => {
        if ((event.target as HTMLElement).closest("button")) return;
        event.currentTarget.parentElement?.querySelector("input")?.focus();
      }}
      {...props}
    />
  );
}

function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return <span className={className} {...props} />;
}

function InputGroupButton({
  size = "icon",
  type = "button",
  variant = "ghost",
  ...props
}: React.ComponentProps<typeof Button>) {
  return <Button size={size} type={type} variant={variant} {...props} />;
}

export {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputGroupText,
  InputGroupButton,
};
