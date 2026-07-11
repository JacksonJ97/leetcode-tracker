import { Link } from "@/components/Link";
import GithubSSO from "@/components/GithubSSO";
import GoogleSSO from "@/components/GoogleSSO";
import { FieldSeparator } from "@/components/Field";
import SignupForm from "@/app/(auth)/signup/_components/signup-form";

export default function SignupPage() {
  return (
    <div className="w-full max-w-sm">
      <h1 className="mb-4 text-2xl font-semibold">Start Tracking</h1>

      <SignupForm />

      <FieldSeparator className="my-6">or</FieldSeparator>

      <div className="mb-6 flex flex-col items-center gap-4">
        <GithubSSO className="w-full" />
        <GoogleSSO className="w-full" />
      </div>

      <p className="text-foreground-muted text-sm">
        Already have an account? <Link href="/login">Log in</Link>
      </p>
    </div>
  );
}
