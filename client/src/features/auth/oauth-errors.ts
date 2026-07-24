const errorMessages: Record<string, string> = {
  access_denied: "Sign-in was cancelled.",

  account_already_linked_to_different_user:
    "This account is already being used. Try a different account.",

  account_not_linked: "Please sign in using the method you originally used.",

  email_not_found:
    "We couldn't access a verified email address from this account.",

  "email_doesn't_match": "Please use an account with the same email address.",

  signup_disabled: "New account registration is currently unavailable.",
};

const expiredErrors = new Set([
  "invalid_code",
  "state_invalid",
  "state_mismatch",
  "state_not_found",
  "state_security_mismatch",
]);

function getOAuthErrorMessage(code?: string) {
  if (!code) return "We couldn't sign you in. Please try again.";

  if (code === "no_code") {
    return "Sign-in could not be completed. Please try again.";
  }

  if (expiredErrors.has(code)) {
    return "This sign-in attempt has expired. Please try again.";
  }

  return errorMessages[code] || "We couldn't sign you in. Please try again.";
}

export { getOAuthErrorMessage };
