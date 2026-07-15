import "dotenv/config";
import { z } from "zod";

const schema = z.object({
  PORT: z.coerce.number().int().positive(),
  CLIENT_ORIGIN: z.url(),
  SERVER_ORIGIN: z.url(),
  DATABASE_URL: z.string(),
  BETTER_AUTH_SECRET: z.string(),
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
});

export const env = schema.parse(process.env);
