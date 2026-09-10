import { createAuthClient } from "better-auth/react";
import { emailOTPClient, inferAdditionalFields } from "better-auth/client/plugins";
import { env } from "@/lib/env";

export const auth = createAuthClient({
  baseURL: env.NEXT_PUBLIC_SERVER_ORIGIN,
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
