import { env } from "@/lib/env";
import type { OnboardingSubmission } from "@/data/user/types";

async function getResponseError(response: Response, action: string) {
  const body = await response.text().catch(() => "");
  const contentType = response.headers.get("Content-Type") ?? "";
  let message = response.statusText || "Request failed. Please try again.";

  try {
    const error: unknown = JSON.parse(body);
    if (
      typeof error === "object" &&
      error !== null &&
      "message" in error &&
      typeof error.message === "string" &&
      error.message.trim()
    ) {
      message = error.message.trim();
    }
  } catch {
    // Use plain-text errors, but don't display HTML error pages in a toast.
    if (contentType.startsWith("text/plain") && body.trim()) {
      message = body.trim();
    }
  }

  return new Error(`${action} (${response.status}): ${message}`);
}

export const uploadAvatar = async (file: File) => {
  const response = await fetch(`${env.NEXT_PUBLIC_SERVER_ORIGIN}/api/avatar`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": file.type,
    },
    body: file,
  });

  if (!response.ok) {
    throw await getResponseError(response, "Failed to upload avatar");
  }
};

export const submitOnboarding = async ({
  avatarUploaded,
  firstName,
  lastName,
}: OnboardingSubmission) => {
  const response = await fetch(
    `${env.NEXT_PUBLIC_SERVER_ORIGIN}/api/onboarding`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatarUploaded,
        firstName,
        lastName,
      }),
    },
  );

  if (!response.ok) {
    throw await getResponseError(response, "Failed to submit onboarding");
  }
};
