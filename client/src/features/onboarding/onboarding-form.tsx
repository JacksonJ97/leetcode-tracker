"use client";

import z from "zod";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAvatarUpload } from "@/lib/hooks/use-avatar-upload";
import { uploadAvatar, submitOnboarding } from "@/data/user/api";
import { toast } from "@/components/ui/toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { AvatarUpload } from "@/components/ui/avatar-upload";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";

const schema = z.object({
  firstName: z.string().trim().min(1, "Enter your first name"),
  lastName: z.string().trim().min(1, "Enter your last name"),
});

function OnboardingForm({ image }: { image: string | null }) {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });

  const upload = useAvatarUpload({ disabled: isSubmitting });

  const onSubmit = handleSubmit(async (data) => {
    if (upload.isProcessing) return;

    const file = upload.file;

    try {
      if (file) {
        await uploadAvatar(file);
      }

      await submitOnboarding({
        avatarUploaded: file !== null,
        firstName: data.firstName,
        lastName: data.lastName,
      });
    } catch (error) {
      toast.add({
        type: "error",
        description:
          error instanceof Error &&
          !(error instanceof TypeError) &&
          !(error instanceof SyntaxError) &&
          error.message
            ? error.message
            : "Couldn't finish setting up your profile. Please try again.",
      });

      return;
    }

    router.replace("/dashboard");
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <AvatarUpload
        upload={upload}
        className="mb-3"
        defaultImageUrl={image ?? ""}
      />

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
            disabled={isSubmitting}
          >
            <FieldLabel>First name</FieldLabel>
            <Input
              placeholder="Ada"
              autoComplete="given-name"
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
            disabled={isSubmitting}
          >
            <FieldLabel>Last name</FieldLabel>
            <Input
              placeholder="Lovelace"
              autoComplete="family-name"
              ref={ref}
              value={value}
              onBlur={onBlur}
              onValueChange={onChange}
            />
            <FieldError match={invalid}>{error?.message}</FieldError>
          </Field>
        )}
      />

      <Button
        type="submit"
        className="mt-3"
        disabled={isSubmitting || upload.isProcessing}
      >
        {(isSubmitting || upload.isProcessing) && <Spinner />}
        {upload.isProcessing ? "Processing photo…" : "Continue"}
      </Button>
    </form>
  );
}

export { OnboardingForm };
