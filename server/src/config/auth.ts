import { betterAuth } from "better-auth/minimal";
import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import { db } from "@/db/client";
import { env } from "@/config/env";
import * as schema from "@/db/schemas/auth-schema";

export const auth = betterAuth({
  baseURL: env.SERVER_ORIGIN,
  secret: env.BETTER_AUTH_SECRET,
  trustedOrigins: [env.CLIENT_ORIGIN],
  database: drizzleAdapter(db, {
    schema,
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  account: {
    accountLinking: {
      enabled: false,
    },
  },
  socialProviders: {
    github: {
      prompt: "select_account",
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
    google: {
      prompt: "select_account",
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
});
