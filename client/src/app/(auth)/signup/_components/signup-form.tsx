"use client";

import z from "zod";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";

const passwordRequirements = [
  /.{8,}/, // At least 8 characters
  /[0-9]/, // At least 1 number
  /[a-z]/, // At least 1 lowercase letter
  /[A-Z]/, // At least 1 uppercase letter
  /[^A-Za-z0-9]/, // At least 1 special character
];

const schema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "This field is required")
    .max(50, "First name must be under 50 characters"),
  lastName: z
    .string()
    .trim()
    .min(1, "This field is required")
    .max(50, "Last name must be under 50 characters"),
  email: z.email().max(254, "Email must be under 254 characters"),
  password: z
    .string()
    .max(72, "Password must be under 72 characters")
    .refine(
      (value) => passwordRequirements.every((regex) => regex.test(value)),
      { error: "Invalid password" },
    ),
});

export default function SignupForm() {
  const router = useRouter();

  const { control, handleSubmit } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    await authClient.signUp.email(
      {
        email: data.email,
        password: data.password,
        name: `${data.firstName} ${data.lastName}`,
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
        name="firstName"
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
            <FieldLabel>First Name</FieldLabel>
            <Input
              autoComplete="First Name"
              placeholder="John"
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
        name="lastName"
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
            <FieldLabel>Last Name</FieldLabel>
            <Input
              autoComplete="Last Name"
              placeholder="Smith"
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
              placeholder="john.smith@example.com"
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
            <Input
              type="password"
              placeholder="••••••••"
              ref={ref}
              value={value}
              onBlur={onBlur}
              onValueChange={onChange}
            />
            <FieldError match={invalid}>{error?.message}</FieldError>
          </Field>
        )}
      />

      <Button type="submit">Create Account</Button>
    </form>
  );
}
