import { emailOTP } from "better-auth/plugins";
import { betterAuth } from "better-auth/minimal";
import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import { db } from "@/db/client";
import { env } from "@/config/env";
import { resend } from "@/config/email";
import * as schema from "@/db/schemas/auth-schema";

export const auth = betterAuth({
  baseURL: env.SERVER_ORIGIN,
  secret: env.BETTER_AUTH_SECRET,
  trustedOrigins: [env.CLIENT_ORIGIN],
  database: drizzleAdapter(db, {
    schema,
    provider: "pg",
  }),
  plugins: [
    emailOTP({
      async sendVerificationOTP({ otp, type, email }) {
        if (type == "sign-in") {
          const { error } = await resend.emails.send({
            to: email,
            from: env.RESEND_FROM_EMAIL,
            subject: `${otp} is your Leetcode Tracker code`,
            text: `Your verification code is ${otp}. It expires shortly.`,
            html: `
            <div>
              <h2>Your verification code</h2>
              <p>Enter this code to continue:</p>
              <p style="font-size: 32px; font-weight: bold; letter-spacing: 6px;">
                ${otp}
              </p>
              <p>If you didn't request this code, you can ignore this email.</p>
            </div>
          `,
          });

          if (error) {
            console.error("Failed to send OTP email:", error);
          }
        }
      },
    }),
  ],
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
