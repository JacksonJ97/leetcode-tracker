import { VerifyEmailForm } from "@/features/auth/verify-email-form";

type PageProps = {
  searchParams: Promise<{ email: string; origin: string }>;
};

export default async function VerifyEmailPage({ searchParams }: PageProps) {
  const { email, origin } = await searchParams;

  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <h1 className="text-center text-3xl font-semibold tracking-tight">
        Check your email
      </h1>
      <VerifyEmailForm email={email} origin={origin} />
    </div>
  );
}
