import { Link } from "@/components/ui/link";
import { FieldSeparator } from "@/components/ui/field";
import { SignupForm } from "@/features/auth/signup-form";
import { GithubSSO, GoogleSSO } from "@/features/auth/social-auth-buttons";

export default function SignupPage() {
  return (
    <div className="w-full max-w-sm">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold">Start Tracking</h1>
      </header>

      <div className="flex flex-col gap-4">
        <GithubSSO />
        <GoogleSSO />
      </div>

      <FieldSeparator className="my-6">or</FieldSeparator>

      <SignupForm />

      <p className="text-foreground-muted mt-6 text-sm">
        Already have an account? <Link href="/login">Log in</Link>
      </p>
    </div>
  );
}
