import "dotenv/config";
import { z } from "zod";

const schema = z.object({
  // Server
  PORT: z.coerce.number().int().positive(),
  CLIENT_ORIGIN: z.url(),
  SERVER_ORIGIN: z.url(),
  DATABASE_URL: z.string(),

  // Emails
  RESEND_API_KEY: z.string(),
  RESEND_FROM_EMAIL: z.string(),

  // Auth
  BETTER_AUTH_SECRET: z.string(),
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),

  // Object Storage
  BUCKET_REGION: z.string(),
  BUCKET_NAME: z.string(),
  BUCKET_ENDPOINT: z.string(),
  BUCKET_ACCESS_KEY_ID: z.string(),
  BUCKET_SECRET_ACCESS_KEY: z.string(),
});

export const env = schema.parse(process.env);
