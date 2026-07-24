import { VerifyEmailForm } from "@/features/auth/verify-email-form";

type PageProps = {
  searchParams: Promise<{ email: string; origin: string }>;
};

export default async function VerifyEmailPage({ searchParams }: PageProps) {
  const { email, origin } = await searchParams;

  return (
    <div className="w-full max-w-md">
      <h1 className="mb-6 text-center text-3xl font-semibold">
        Check your email
      </h1>
      <VerifyEmailForm email={email} origin={origin} />
    </div>
  );
}
