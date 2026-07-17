import { Link } from "@/components/ui/link";
import { FieldSeparator } from "@/components/ui/field";
import GithubSSO from "@/components/GithubSSO";
import GoogleSSO from "@/components/GoogleSSO";
import LoginForm from "@/app/(auth)/login/_components/login-form";

export default function LoginPage() {
  return (
    <div className="w-full max-w-sm">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold">Welcome Back</h1>
      </header>

      <LoginForm />

      <Link href="/forgot-password" className="mt-4 block w-fit text-sm">
        Forgot password?
      </Link>

      <FieldSeparator className="my-6">or</FieldSeparator>

      <div className="mb-6 flex flex-col gap-4">
        <GithubSSO />
        <GoogleSSO />
      </div>

      <p className="text-foreground-muted text-sm">
        Don&apos;t have an account? <Link href="/signup">Sign up</Link>
      </p>
    </div>
  );
}
