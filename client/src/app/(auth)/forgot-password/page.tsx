import { Link } from "@/components/Link";
import ForgotPasswordForm from "@/app/(auth)/forgot-password/_components/forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <div className="w-full max-w-sm">
      <h1 className="mb-2 text-3xl font-semibold">Forgot your password?</h1>
      <p className="text-foreground-muted mb-6 text-sm">
        Enter your email to receive a password reset code
      </p>

      <ForgotPasswordForm />

      <p className="text-foreground-muted mt-6 text-sm">
        Already have an account? <Link href="/login">Log in</Link>
      </p>
    </div>
  );
}
