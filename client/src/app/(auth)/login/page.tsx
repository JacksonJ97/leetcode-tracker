import { Link } from "@/components/ui/link";
import { FieldSeparator } from "@/components/ui/field";
import { LoginForm } from "@/features/auth/login-form";
import { GithubSSO, GoogleSSO } from "@/features/auth/social-auth-buttons";

export default function LoginPage() {
  return (
    <div className="w-full max-w-sm">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold">Welcome Back</h1>
      </header>

      <div className="flex flex-col gap-4">
        <GoogleSSO />
        <GithubSSO />
      </div>

      <FieldSeparator className="my-6">or</FieldSeparator>

      <LoginForm />

      <p className="text-foreground-muted mt-4 text-sm">
        Don&apos;t have an account? <Link href="/signup">Sign up</Link>
      </p>
    </div>
  );
}
