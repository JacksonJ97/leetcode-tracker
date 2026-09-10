import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth-client";
import { OnboardingForm } from "@/features/onboarding/onboarding-form";

export default async function OnboardingPage() {
  const { data: session } = await auth.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session) {
    redirect("/login");
  }

  if (session.user.onboardingCompletedAt) {
    redirect("/dashboard");
  }

  const image = session.user.image ?? null;

  return (
    <main className="grid min-h-svh place-items-center p-4">
      <section className="w-full max-w-sm">
        <header className="mb-8">
          <h1 className="mb-2 text-2xl font-semibold tracking-tight">
            Let&apos;s set up your profile
          </h1>

          <p className="text-foreground-muted text-sm leading-normal">
            Add a few details to personalize your experience.
          </p>
        </header>

        <OnboardingForm image={image} />
      </section>
    </main>
  );
}
