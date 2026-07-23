import { createAuthClient } from "better-auth/react";
import { emailOTPClient } from "better-auth/client/plugins";
import { env } from "@/lib/env";

export const auth = createAuthClient({
  plugins: [emailOTPClient()],
  baseURL: env.NEXT_PUBLIC_SERVER_ORIGIN,
  fetchOptions: {
    credentials: "include",
  },
});
