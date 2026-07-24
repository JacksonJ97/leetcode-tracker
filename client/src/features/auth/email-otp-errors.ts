function getSendVerificationOtpErrorMessage(status: number) {
  if (status === 429) {
    return "Too many requests. Wait a moment and try again.";
  }

  return "We couldn't send your verification code. Please try again.";
}

export { getSendVerificationOtpErrorMessage };
