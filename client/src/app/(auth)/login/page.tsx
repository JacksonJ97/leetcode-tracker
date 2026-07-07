import Link from "next/link";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Checkbox } from "@/components/Checkbox";

export default function LoginPage() {
  return (
    <div className="w-full max-w-sm">
      <h1 className="mb-6 text-2xl font-semibold">
        Log in to Leetcode Tracker
      </h1>

      <div className="flex flex-col gap-6">
        <Input type="email" placeholder="you@example.com" />
        <Input type="password" placeholder="••••••••" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Checkbox id="keep-signed-in" />
            <label htmlFor="keep-signed-in" className="text-sm">
              Keep me signed in
            </label>
          </div>
          <Link
            href="/forgot-password"
            className="text-primary hover:text-primary-hover text-sm"
          >
            Forgot password?
          </Link>
        </div>
        <Button>Log In</Button>
      </div>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="border-border w-full border-t" />
        </div>
        <div className="relative flex justify-center">
          <span className="text-foreground bg-background px-3 text-sm">or</span>
        </div>
      </div>

      <div className="mb-6 flex items-center gap-4">
        <Button className="flex-1">Github</Button>
        <Button className="flex-1">Google</Button>
      </div>

      <p className="text-foreground-muted text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-primary hover:text-primary-hover">
          Sign up
        </Link>
      </p>
    </div>
  );
}
