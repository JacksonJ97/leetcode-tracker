import Link from "next/link";
import { Button } from "@/components/Button";
import { FieldSeparator } from "@/components/Field";
import LoginForm from "@/app/(auth)/login/_components/LoginForm";

export default function LoginPage() {
  return (
    <div className="w-full max-w-sm">
      <h1 className="mb-6 text-2xl font-semibold">
        Log in to Leetcode Tracker
      </h1>

      <LoginForm />

      <Link
        href="/forgot-password"
        className="text-primary hover:text-primary-hover mt-4 block w-fit text-sm"
      >
        Forgot password?
      </Link>

      <FieldSeparator className="my-6">or</FieldSeparator>

      <div className="mb-6 flex items-center gap-4">
        <Button className="flex-1">Github</Button>
        <Button className="flex-1">Google</Button>
      </div>

      <p className="text-foreground-muted text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-primary hover:text-primary-hover">
          Sign up
        </Link>
      </p>
    </div>
  );
}
