import { EMAIL_OTP_ERROR_CODES } from "better-auth/client/plugins";

const TOO_MANY_REQUESTS_MESSAGE =
  "Too many requests. Wait a moment and try again.";
const VERIFY_EMAIL_ERROR_MESSAGE =
  "We couldn't verify your code. Please try again.";
const DEFAULT_OAUTH_ERROR_MESSAGE =
  "We couldn't sign you in. Please try again.";

const EXPIRED_OAUTH_ERRORS = new Set([
  "invalid_code",
  "state_invalid",
  "state_mismatch",
  "state_not_found",
  "state_security_mismatch",
]);

const OAUTH_ERROR_MESSAGES: Record<string, string> = {
  access_denied: "Sign-in was cancelled.",
  no_code: "Sign-in could not be completed. Please try again.",
  account_already_linked_to_different_user:
    "This account is already being used. Try a different account.",
  account_not_linked: "Please sign in using the method you originally used.",
  email_not_found:
    "We couldn't access a verified email address from this account.",
  "email_doesn't_match": "Please use an account with the same email address.",
  signup_disabled: "New account registration is currently unavailable.",
};

function getOAuthErrorMessage(code?: string) {
  if (!code) return DEFAULT_OAUTH_ERROR_MESSAGE;

  if (EXPIRED_OAUTH_ERRORS.has(code)) {
    return "This sign-in attempt has expired. Please try again.";
  }

  return OAUTH_ERROR_MESSAGES[code] ?? DEFAULT_OAUTH_ERROR_MESSAGE;
}

function getSendOTPErrorMessage(status: number) {
  if (status === 429) {
    return TOO_MANY_REQUESTS_MESSAGE;
  }

  return "We couldn't send your verification code. Please try again.";
}

const OTP_ERROR_MESSAGES: Record<string, string> = {
  [EMAIL_OTP_ERROR_CODES.INVALID_OTP.code]:
    "That verification code is incorrect. Try again.",
  [EMAIL_OTP_ERROR_CODES.OTP_EXPIRED.code]:
    "That verification code has expired. Go back to request a new code.",
  [EMAIL_OTP_ERROR_CODES.TOO_MANY_ATTEMPTS.code]:
    "Too many incorrect attempts. Go back to request a new code.",
};

function getVerifyOTPErrorMessage(code?: string) {
  return code ? OTP_ERROR_MESSAGES[code] : undefined;
}

export {
  TOO_MANY_REQUESTS_MESSAGE,
  VERIFY_EMAIL_ERROR_MESSAGE,
  getOAuthErrorMessage,
  getSendOTPErrorMessage,
  getVerifyOTPErrorMessage,
};
