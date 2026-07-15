import { Hono } from "hono";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";
import { env } from "@/config/env";
import { auth } from "@/config/auth";

const app = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}>();

app.use(
  "*",
  cors({
    origin: env.CLIENT_ORIGIN,
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);

app.use("*", async (context, next) => {
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

app.get("/", (context) => {
  return context.text("Hello Hono!");
});

serve({ fetch: app.fetch, port: env.PORT }, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`);
});
