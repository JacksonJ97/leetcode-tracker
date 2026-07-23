import { VerifyEmailForm } from "@/features/auth/verify-email-form";

export default function VerifyEmailPage() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <h1 className="text-center text-3xl font-semibold tracking-tight">
        Check your email
      </h1>
      <VerifyEmailForm />
    </div>
  );
}
