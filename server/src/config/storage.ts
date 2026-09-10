import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { env } from "@/config/env";

export const S3 = new S3Client({
  region: env.BUCKET_REGION,
  endpoint: env.BUCKET_ENDPOINT,
  credentials: {
    accessKeyId: env.BUCKET_ACCESS_KEY_ID,
    secretAccessKey: env.BUCKET_SECRET_ACCESS_KEY,
  },
});

export function getAvatarKey(userId: string) {
  return `avatars/${userId}/avatar.webp`;
}

export async function saveAvatar(userId: string, image: Buffer) {
  await S3.send(
    new PutObjectCommand({
      Bucket: env.BUCKET_NAME,
      Key: getAvatarKey(userId),
      Body: image,
      ContentType: "image/webp",
      Metadata: { "avatar-validation": "v1" },
    }),
  );
}

export async function hasValidatedAvatar(userId: string) {
  try {
    const object = await S3.send(
      new HeadObjectCommand({
        Bucket: env.BUCKET_NAME,
        Key: getAvatarKey(userId),
      }),
    );
    return object.Metadata?.["avatar-validation"] === "v1";
  } catch (error) {
    if (error instanceof Error && error.name === "NotFound") {
      return false;
    }
    throw error;
  }
}

export async function getImageUrl(key: string) {
  const command = new GetObjectCommand({ Bucket: env.BUCKET_NAME, Key: key });
  return getSignedUrl(S3, command, { expiresIn: 60 * 60 }); // 1 hour
}
