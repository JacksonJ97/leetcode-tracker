import { Link } from "@/components/ui/link";
import GithubSSO from "@/components/GithubSSO";
import GoogleSSO from "@/components/GoogleSSO";
import { FieldSeparator } from "@/components/ui/field";
import SignupForm from "@/app/(auth)/signup/_components/signup-form";

export default function SignupPage() {
  return (
    <div className="w-full max-w-sm">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold">Start Tracking</h1>
      </header>

      <SignupForm />

      <FieldSeparator className="my-6">or</FieldSeparator>

      <div className="mb-6 flex flex-col gap-4">
        <GithubSSO />
        <GoogleSSO />
      </div>

      <p className="text-foreground-muted text-sm">
        Already have an account? <Link href="/login">Log in</Link>
      </p>
    </div>
  );
}
