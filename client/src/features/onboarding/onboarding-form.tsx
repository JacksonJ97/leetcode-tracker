"use client";

import z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { AvatarUpload } from "@/components/ui/avatar-upload";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";

const schema = z.object({
  firstName: z.string().trim().min(1, "Enter your first name"),
  lastName: z.string().trim().min(1, "Enter your last name"),
});

function OnboardingForm({ image }: { image: string }) {
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

  const onSubmit = handleSubmit((data) => {
    console.log("data", data);
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <AvatarUpload
        className="mb-3"
        defaultImageUrl={image}
        onFileChange={(file) => {
          console.log("file", file);
        }}
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

      <Button type="submit" className="mt-3" disabled={isSubmitting}>
        {isSubmitting && <Spinner />}
        Continue
      </Button>
    </form>
  );
}

export { OnboardingForm };
