"use client";

import z from "zod";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import { Link } from "@/components/ui/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";

const schema = z.object({
  email: z.email(),
  password: z.string().min(1, "Password is required"),
});

function LoginForm() {
  const router = useRouter();

  const { control, handleSubmit } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    await authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          router.replace("/dashboard");
        },
        onError: () => {
          console.error("Login Error");
        },
      },
    );
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
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
            <FieldError match={invalid}>{error?.message}</FieldError>
          </Field>
        )}
      />

      <div className="flex justify-end text-sm">
        <Link href="/forgot-password">Forgot password?</Link>
      </div>

      <Button type="submit">Log In</Button>
    </form>
  );
}

export { LoginForm };
