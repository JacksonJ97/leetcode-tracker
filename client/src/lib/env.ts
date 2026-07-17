import { z } from "zod";

const schema = z.object({
  NEXT_PUBLIC_SERVER_ORIGIN: z.url(),
});

export const env = schema.parse({
  NEXT_PUBLIC_SERVER_ORIGIN: process.env.NEXT_PUBLIC_SERVER_ORIGIN,
});
