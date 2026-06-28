import Link from "next/link";

export default function LoginPage() {
  return (
    <main>
      <h1>Log in</h1>
      <p>
        Don&apos;t have an account? <Link href="/signup">Sign up</Link>
      </p>
    </main>
  );
}
