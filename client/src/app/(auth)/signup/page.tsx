import Link from "next/link";

export default function Signup() {
  return (
    <main>
      <h1>Sign Up</h1>
      <p>
        Already have an account? <Link href="/login">Log in</Link>
      </p>
    </main>
  );
}
