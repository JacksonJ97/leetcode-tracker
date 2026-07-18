"use client";

import z from "zod";
import { useRouter } from "next/navigation";
import { CheckIcon, CircleIcon } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";
import {
  Field,
  FieldLabel,
  FieldItem,
  FieldError,
} from "@/components/ui/field";

const passwordRequirements = [
  {
    label: "At least 8 characters",
    test: (value: string) => value.length >= 8,
  },
  {
    label: "At least one number",
    test: (value: string) => /[0-9]/.test(value),
  },
  {
    label: "At least one lowercase letter",
    test: (value: string) => /[a-z]/.test(value),
  },
  {
    label: "At least one uppercase letter",
    test: (value: string) => /[A-Z]/.test(value),
  },
  {
    label: "At least one special character",
    test: (value: string) => /[^A-Za-z0-9]/.test(value),
  },
];

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "This field is required")
    .max(100, "Name must be under 100 characters"),
  email: z.email().max(254, "Email must be under 254 characters"),
  password: z
    .string()
    .max(72, "Password must be under 72 characters")
    .refine((value) => passwordRequirements.every(({ test }) => test(value)), {
      error: "Password does not meet the requirements",
    }),
});

function PasswordRequirements({ password }: { password: string }) {
  return (
    <ul className="flex flex-col gap-1">
      {passwordRequirements.map(({ label, test }) => {
        const isMet = test(password);
        const Icon = isMet ? CheckIcon : CircleIcon;

        return (
          <li
            key={label}
            className={cn(
              "flex items-center gap-2 text-sm",
              isMet ? "text-success" : "text-foreground-muted",
            )}
          >
            <Icon aria-hidden="true" className="size-4 shrink-0" />
            <span>{label}</span>
          </li>
        );
      })}
    </ul>
  );
}

function SignupForm() {
  const router = useRouter();

  const { control, handleSubmit } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    await authClient.signUp.email(
      {
        name: data.name,
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          router.replace("/dashboard");
        },
        onError: () => {
          console.error("Signup Error");
        },
      },
    );
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <Controller
        name="name"
        control={control}
        render={({
          field: { ref, name, value, onBlur, onChange },
          fieldState: { error, invalid, isDirty, isTouched },
        }) => (
          <Field
            name={name}
            dirty={isDirty}
            invalid={invalid}
            touched={isTouched}
          >
            <FieldLabel>Name</FieldLabel>
            <Input
              autoComplete="name"
              placeholder="Jane Doe"
              ref={ref}
              value={value}
              onBlur={onBlur}
              onValueChange={onChange}
            />
            <FieldError match={invalid}>{error?.message}</FieldError>
          </Field>
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({
          field: { ref, name, value, onBlur, onChange },
          fieldState: { error, invalid, isDirty, isTouched },
        }) => (
          <Field
            name={name}
            dirty={isDirty}
            invalid={invalid}
            touched={isTouched}
          >
            <FieldLabel>Email</FieldLabel>
            <Input
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              ref={ref}
              value={value}
              onBlur={onBlur}
              onValueChange={onChange}
            />
            <FieldError match={invalid}>{error?.message}</FieldError>
          </Field>
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({
          field: { ref, name, value, onBlur, onChange },
          fieldState: { error, invalid, isDirty, isTouched },
        }) => (
          <Field
            name={name}
            dirty={isDirty}
            invalid={invalid}
            touched={isTouched}
          >
            <FieldLabel>Password</FieldLabel>
            <PasswordInput
              ref={ref}
              value={value}
              onBlur={onBlur}
              onValueChange={onChange}
            />
            <FieldItem className="mt-2 hidden data-focused:block data-touched:block">
              <PasswordRequirements password={value} />
            </FieldItem>
            <FieldError match={invalid}>{error?.message}</FieldError>
          </Field>
        )}
      />

      <Button type="submit">Get Started</Button>
    </form>
  );
}

export { SignupForm };
