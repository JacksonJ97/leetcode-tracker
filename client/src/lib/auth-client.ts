import { createAuthClient } from "better-auth/react";
import { emailOTPClient, inferAdditionalFields } from "better-auth/client/plugins";
import { env } from "@/lib/env";

export const auth = createAuthClient({
  // Browser requests use the frontend proxy so session cookies belong to the frontend.
  // Server components call the API directly and forward the incoming cookies.
  baseURL:
    typeof window === "undefined" ? env.NEXT_PUBLIC_SERVER_ORIGIN : env.NEXT_PUBLIC_CLIENT_ORIGIN,
  fetchOptions: {
    credentials: "include",
  },
  plugins: [
    emailOTPClient(),
    inferAdditionalFields({
      user: {
        firstName: {
          type: "string",
          input: false,
          required: false,
        },
        lastName: {
          type: "string",
          input: false,
          required: false,
        },
        onboardingCompletedAt: {
          type: "date",
          input: false,
          required: false,
        },
      },
    }),
  ],
});
