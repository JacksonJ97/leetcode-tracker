"use client";

import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { auth } from "@/lib/auth-client";
import { Link } from "@/components/ui/link";
import { OTPField, OTPFieldInput } from "@/components/ui/otp-field";
import {
  getVerifyOTPErrorMessage,
  TOO_MANY_REQUESTS_MESSAGE,
  VERIFY_EMAIL_ERROR_MESSAGE,
} from "@/features/auth/auth-errors";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";

const OTP_LENGTH = 6;

function VerifyEmailForm({ email, origin }: { email: string; origin: string }) {
  const router = useRouter();

  const {
    control,
    setError,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    const { error } = await auth.signIn.emailOtp({
      email,
      otp: data.code,
    });

    if (error) {
      const message = getVerifyOTPErrorMessage(error.code);

      if (message) {
        setError("code", { type: "server", message });
      } else if (error.status === 429) {
        toast.error(TOO_MANY_REQUESTS_MESSAGE);
      } else {
        toast.error(VERIFY_EMAIL_ERROR_MESSAGE);
      }

      return;
    }

    router.replace("/dashboard");
    router.refresh();
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col items-center gap-6">
      <Controller
        name="code"
        control={control}
        render={({
          field: { ref, name, value, onBlur, onChange },
          fieldState: { error, invalid },
        }) => (
          <Field name={name} invalid={invalid} className="items-center gap-4">
            <FieldLabel className="sr-only">Verification code</FieldLabel>

            <FieldDescription className="text-center">
              Enter the code we sent to{" "}
              <span className="text-foreground">{email}</span>.
            </FieldDescription>

            <OTPField
              autoSubmit
              length={OTP_LENGTH}
              readOnly={isSubmitting}
              ref={ref}
              value={value}
              onBlur={onBlur}
              onValueChange={onChange}
            >
              {Array.from({ length: OTP_LENGTH }, (_, index) => (
                <OTPFieldInput
                  autoFocus={index === 0}
                  aria-label={`Character ${index + 1} of ${OTP_LENGTH}`}
                  key={index}
                />
              ))}
            </OTPField>

            <FieldError match={invalid}>{error?.message}</FieldError>

            <p role="status" className="sr-only">
              {isSubmitting ? "Verifying code…" : ""}
            </p>
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
