import { createAuthClient } from "better-auth/react";
import { env } from "@/lib/env";

export const auth = createAuthClient({
  baseURL: env.NEXT_PUBLIC_SERVER_ORIGIN,
});
