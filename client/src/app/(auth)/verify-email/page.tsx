import { VerifyEmailForm } from "@/features/auth/verify-email-form";

type PageProps = {
  searchParams: Promise<{ email: string; origin: string }>;
};

export default async function VerifyEmailPage({ searchParams }: PageProps) {
  const { email, origin } = await searchParams;

  return (
    <section className="w-full max-w-md">
      <header className="mb-6">
        <h1 className="text-center text-3xl font-semibold">Check your email</h1>
      </header>

      <VerifyEmailForm email={email} origin={origin} />
    </section>
  );
}
