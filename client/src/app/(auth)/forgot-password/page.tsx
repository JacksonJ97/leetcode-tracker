import { Link } from "@/components/ui/link";
import { ForgotPasswordForm } from "@/features/auth/forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <div className="w-full max-w-sm">
      <header className="mb-6 flex flex-col gap-2">
        <h1 className="text-3xl font-semibold">Forgot your password?</h1>
        <p className="text-foreground-muted text-sm">
          Enter your email to receive a password reset code
        </p>
      </header>

      <ForgotPasswordForm />

      <p className="text-foreground-muted mt-6 text-sm">
        Already have an account? <Link href="/login">Log in</Link>
      </p>
    </div>
  );
}
