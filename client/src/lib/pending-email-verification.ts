import z from "zod";

const PENDING_EMAIL_VERIFICATION_KEY = "pending-email-verification";

const schema = z.object({
  email: z.email(),
  returnTo: z.enum(["/login", "/signup"]),
});

function storePendingEmailVerification(data: z.infer<typeof schema>) {
  sessionStorage.setItem(PENDING_EMAIL_VERIFICATION_KEY, JSON.stringify(data));
}

function getPendingEmailVerification() {
  const data = sessionStorage.getItem(PENDING_EMAIL_VERIFICATION_KEY);

  if (!data) return null;

  try {
    const result = schema.safeParse(JSON.parse(data));

    if (result.success) return result.data;
  } catch {
    // Cleanup happens below
  }

  sessionStorage.removeItem(PENDING_EMAIL_VERIFICATION_KEY);
  return null;
}

function clearPendingEmailVerification() {
  sessionStorage.removeItem(PENDING_EMAIL_VERIFICATION_KEY);
}

export {
  storePendingEmailVerification,
  getPendingEmailVerification,
  clearPendingEmailVerification,
};
