import { z } from "zod";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { eq } from "drizzle-orm";
import { serve } from "@hono/node-server";
import { zValidator } from "@hono/zod-validator";
import { HTTPException } from "hono/http-exception";
import { env } from "@/config/env";
import { auth } from "@/config/auth";
import { db } from "@/db/client";
import { user } from "@/db/schemas/auth-schema";

const app = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}>();

app.use(
  "/api/*",
  cors({
    origin: env.CLIENT_ORIGIN,
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);

app.use("/api/*", async (context, next) => {
  const session = await auth.api.getSession({
    headers: context.req.raw.headers,
  });

  if (!session) {
    context.set("user", null);
    context.set("session", null);
    await next();
    return;
  }

  context.set("user", session.user);
  context.set("session", session.session);

  await next();
});

app.on(["GET", "POST"], "/api/auth/*", (context) => {
  return auth.handler(context.req.raw);
});

const onboardingSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  image: z.url().optional(),
});

app.put(
  "/api/onboarding",
  zValidator("json", onboardingSchema),
  async (context) => {
    if (!context.var.user) {
      throw new HTTPException(404, { message: "User not found" });
    }

    const body = context.req.valid("json");

    const authenticatedUser = await db.query.user.findFirst({
      where: {
        id: context.var.user.id,
      },
    });

    if (!authenticatedUser) {
      throw new HTTPException(404, { message: "User not found" });
    }

    const updatedUser = await db
      .update(user)
      .set({
        firstName: body.firstName,
        lastName: body.lastName,
        name: `${body.firstName} ${body.lastName}`,
        image: body.image,
        onboardingCompletedAt: new Date(),
      })
      .where(eq(user.id, authenticatedUser.id))
      .returning();

    return context.json({ user: updatedUser[0] }, 200);
  },
);

app.onError((error, context) => {
  if (error instanceof HTTPException) {
    return error.getResponse();
  }
  console.error(error);
  return context.text("Internal Server Error", 500);
});

serve({ fetch: app.fetch, port: env.PORT }, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`);
});
