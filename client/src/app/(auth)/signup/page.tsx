import Link from "next/link";

export default function SignupPage() {
  return (
    <div>
      <h1>Sign Up</h1>
      <p>
        Already have an account?{" "}
        <Link href="/login" className="text-primary hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
