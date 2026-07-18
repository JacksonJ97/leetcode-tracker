"use client";

import z from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { auth } from "@/lib/auth-client";
import { Link } from "@/components/ui/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { PasswordInput } from "@/components/ui/password-input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";

const schema = z.object({
  email: z.email(),
  password: z.string().min(1, "Password is required"),
});

function getLoginErrorMessage(status: number) {
  if (status === 429) {
    return "Too many login attempts. Please wait and try again.";
  }

  if (status >= 500) {
    return "We couldn't log you in. Please try again.";
  }

  return "Invalid email or password.";
}

function LoginForm() {
  const router = useRouter();
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    setAuthError(null);

    const { error } = await auth.signIn.email({
      email: data.email,
      password: data.password,
    });

    if (error) {
      setAuthError(getLoginErrorMessage(error.status));
      return;
    }

    router.replace("/dashboard");
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
            className="relative"
          >
            <FieldLabel>Password</FieldLabel>
            <PasswordInput
              ref={ref}
              value={value}
              onBlur={onBlur}
              onValueChange={onChange}
            />
            <FieldError match={invalid}>{error?.message}</FieldError>
            <Link
              href="/forgot-password"
              className="absolute top-0 right-0 text-sm"
            >
              Forgot password?
            </Link>
          </Field>
        )}
      />

      {authError && (
        <p role="alert" className="text-danger text-sm">
          {authError}
        </p>
      )}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting && <Spinner />}
        Log In
      </Button>
    </form>
  );
}

export { LoginForm };
