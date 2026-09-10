import { z } from "zod";
import sharp from "sharp";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { eq } from "drizzle-orm";
import { serve } from "@hono/node-server";
import { bodyLimit } from "hono/body-limit";
import { zValidator } from "@hono/zod-validator";
import { HTTPException } from "hono/http-exception";
import { env } from "@/config/env";
import { auth } from "@/config/auth";
import { saveAvatar, getAvatarKey, hasValidatedAvatar } from "@/config/storage";
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
    allowMethods: ["GET", "PUT", "POST", "PATCH", "DELETE", "OPTIONS"],
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

const MAX_AVATAR_BYTES = 2 * 1024 * 1024; // 2MB
const AVATAR_SIZE = 256;

app.post(
  "/api/avatar",
  bodyLimit({
    maxSize: MAX_AVATAR_BYTES,
    onError: () => {
      throw new HTTPException(413, { message: "Avatar must be at most 2 MB" });
    },
  }),
  async (context) => {
    if (!context.var.user) {
      throw new HTTPException(401, { message: "Authentication required" });
    }

    const input = Buffer.from(await context.req.arrayBuffer());

    // Check actual bytes too: bodyLimit trusts Content-Length when present.
    if (input.length > MAX_AVATAR_BYTES) {
      throw new HTTPException(413, { message: "Avatar must be at most 2 MB" });
    }

    let image: Buffer;

    try {
      const decoder = sharp(input, {
        limitInputPixels: AVATAR_SIZE * AVATAR_SIZE,
      });

      const metadata = await decoder.metadata();

      if (
        metadata.format !== "webp" ||
        metadata.width !== AVATAR_SIZE ||
        metadata.height !== AVATAR_SIZE
      ) {
        throw new HTTPException(400, {
          message: "Avatar must be a 256 x 256 WebP image",
        });
      }

      // Decode and re-encode, rather than trusting image metadata alone.
      image = await decoder.webp({ quality: 85 }).toBuffer();
    } catch (error) {
      if (error instanceof HTTPException) {
        throw error;
      }

      throw new HTTPException(400, {
        cause: error,
        message: "Avatar is not a valid WebP image",
      });
    }

    await saveAvatar(context.var.user.id, image);

    return context.body(null, 204);
  },
);

const onboardingSchema = z.strictObject({
  avatarUploaded: z.boolean(),
  firstName: z.string().trim().min(1, "Enter your first name"),
  lastName: z.string().trim().min(1, "Enter your last name"),
});

app.put(
  "/api/onboarding",
  zValidator("json", onboardingSchema, (result) => {
    if (!result.success) {
      throw new HTTPException(400, {
        message:
          result.error.issues[0]?.message ?? "Invalid onboarding details",
      });
    }
  }),
  async (context) => {
    if (!context.var.user) {
      throw new HTTPException(401, { message: "Authentication required" });
    }

    const { avatarUploaded, firstName, lastName } = context.req.valid("json");

    const existingUser = await db.query.user.findFirst({
      where: {
        id: context.var.user.id,
      },
    });

    if (!existingUser) {
      throw new HTTPException(404, { message: "User not found" });
    }

    if (avatarUploaded && !(await hasValidatedAvatar(context.var.user.id))) {
      throw new HTTPException(400, {
        message: "Upload a valid avatar before continuing",
      });
    }

    const updatedUser = await db
      .update(user)
      .set({
        firstName,
        lastName,
        image: avatarUploaded
          ? getAvatarKey(context.var.user.id)
          : existingUser.image,
        name: `${firstName} ${lastName}`,
        onboardingCompletedAt: new Date(),
      })
      .where(eq(user.id, existingUser.id))
      .returning();

    const userResponse = updatedUser[0]
      ? {
          firstName: updatedUser[0].firstName,
          lastName: updatedUser[0].lastName,
          image: updatedUser[0].image,
          name: updatedUser[0].name,
          onboardingCompletedAt: updatedUser[0].onboardingCompletedAt,
        }
      : null;

    return context.json({ user: userResponse }, 200);
  },
);

app.notFound(() => {
  throw new HTTPException(404, { message: "Not found" });
});

app.onError((error, context) => {
  if (error instanceof HTTPException) {
    return context.json({ message: error.message }, error.status);
  }
  console.error(error);
  return context.json({ message: "Internal Server Error" }, 500);
});

serve({ fetch: app.fetch, port: env.PORT }, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`);
});
