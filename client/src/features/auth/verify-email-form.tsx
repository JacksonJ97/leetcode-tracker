"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { auth } from "@/lib/auth-client";
import { Link } from "@/components/ui/link";
import { OTPField, OTPFieldInput } from "@/components/ui/otp-field";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";

function VerifyEmailForm({ email, origin }: { email: string; origin: string }) {
  const router = useRouter();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    const { error } = await auth.signIn.emailOtp({
      email,
      otp: data.code,
    });

    // TODO: Handle Errors
    if (error) return;

    router.replace("/dashboard");
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col items-center gap-6">
      <Controller
        name="code"
        control={control}
        render={({ field: { ref, name, value, onBlur, onChange } }) => (
          <Field name={name} className="items-center gap-4">
            <FieldLabel className="sr-only">Verification code</FieldLabel>
            <FieldDescription className="text-center">
              Enter the code we sent to{" "}
              <span className="text-foreground">{email}</span>.
            </FieldDescription>
            <OTPField
              autoSubmit
              length={6}
              ref={ref}
              value={value}
              onBlur={onBlur}
              onValueChange={onChange}
            >
              <OTPFieldInput />
              <OTPFieldInput aria-label="Character 2 of 6" />
              <OTPFieldInput aria-label="Character 3 of 6" />
              <OTPFieldInput aria-label="Character 4 of 6" />
              <OTPFieldInput aria-label="Character 5 of 6" />
              <OTPFieldInput aria-label="Character 6 of 6" />
            </OTPField>
          </Field>
        )}
      />

      <Link
        href={`/${origin}`}
        className="text-foreground-muted hover:text-foreground"
      >
        <ArrowLeft aria-hidden="true" />
        Use a different email
      </Link>
    </form>
  );
}

export { VerifyEmailForm };
