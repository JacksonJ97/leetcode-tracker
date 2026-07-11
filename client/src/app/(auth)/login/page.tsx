import { Link } from "@/components/Link";
import { FieldSeparator } from "@/components/Field";
import GithubSSO from "@/components/GithubSSO";
import GoogleSSO from "@/components/GoogleSSO";
import LoginForm from "@/app/(auth)/login/_components/login-form";

export default function LoginPage() {
  return (
    <div className="w-full max-w-sm">
      <h1 className="mb-4 text-2xl font-semibold">Welcome Back</h1>

      <LoginForm />

      <Link href="/forgot-password" className="mt-4 block w-fit text-sm">
        Forgot password?
      </Link>

      <FieldSeparator className="my-6">or</FieldSeparator>

      <div className="mb-6 flex flex-col items-center gap-4">
        <GithubSSO className="w-full" />
        <GoogleSSO className="w-full" />
      </div>

      <p className="text-foreground-muted text-sm">
        Don&apos;t have an account? <Link href="/signup">Sign up</Link>
      </p>
    </div>
  );
}
