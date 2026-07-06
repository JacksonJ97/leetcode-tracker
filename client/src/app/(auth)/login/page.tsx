import Link from "next/link";
import { Input } from "@/components/Input";

export default function LoginPage() {
  return (
    <div>
      <h1>Log in to Leetcode Tracker</h1>
      <div className="flex flex-col gap-2">
        <Input type="email" placeholder="you@example.com" />
        <Input type="password" placeholder="••••••••" />
      </div>

      <p>
        Don&apos;t have an account? <Link href="/signup">Sign up</Link>
      </p>
    </div>
  );
}
