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
            text: `Your verification code is ${otp}. It expires in 5 minutes.`,
            html: `
              <!doctype html>
              <html lang="en">
                <head>
                  <meta charset="utf-8" />
                  <meta name="viewport" content="width=device-width, initial-scale=1" />
                  <title>Your Leetcode Tracker verification code</title>
                </head>
                <body style="margin: 0; padding: 0; background-color: #f4f4f5;">
                  <table
                    role="presentation"
                    width="100%"
                    cellpadding="0"
                    cellspacing="0"
                    border="0"
                    style="width: 100%; background-color: #f4f4f5;"
                  >
                    <tr>
                      <td align="center" style="padding: 48px 20px;">
                        <table
                          role="presentation"
                          width="100%"
                          cellpadding="0"
                          cellspacing="0"
                          border="0"
                          style="width: 100%; max-width: 560px; background-color: #ffffff; border: 1px solid #e4e4e7; border-radius: 12px;"
                        >
                          <tr>
                            <td style="padding: 40px 40px 36px; font-family: Arial, Helvetica, sans-serif; color: #18181b;">
                              <p style="margin: 0 0 24px; font-size: 18px; font-weight: 700; letter-spacing: -0.2px;">
                                Leetcode Tracker
                              </p>
                              <h1 style="margin: 0 0 12px; font-size: 26px; line-height: 1.25; letter-spacing: -0.5px;">
                                Your verification code
                              </h1>
                              <p style="margin: 0 0 28px; color: #52525b; font-size: 16px; line-height: 1.6;">
                                Enter this code to continue signing in. It expires in 5 minutes.
                              </p>
                              <div
                                style="padding: 20px 16px; background-color: #f4f4f5; border: 1px solid #e4e4e7; border-radius: 8px; color: #18181b; font-size: 34px; font-weight: 700; letter-spacing: 8px; line-height: 1; text-align: center;"
                              >
                                ${otp}
                              </div>
                              <p style="margin: 28px 0 0; color: #71717a; font-size: 14px; line-height: 1.6;">
                                If you didn't request this code, you can safely ignore this email.
                              </p>
                            </td>
                          </tr>
                        </table>
                        <p style="margin: 20px 0 0; color: #a1a1aa; font-family: Arial, Helvetica, sans-serif; font-size: 12px; line-height: 1.5;">
                          This is an automated message from Leetcode Tracker.
                        </p>
                      </td>
                    </tr>
                  </table>
                </body>
              </html>
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
