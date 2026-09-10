import { useFileUpload } from "@/lib/hooks/use-file-upload";

const AVATAR_SIZE = 256;
const WEBP_QUALITY = 0.85;
const MAX_AVATAR_PIXELS = 25_000_000;
const MAX_AVATAR_FILE_SIZE = 2 * 1024 * 1024; // 2MB

async function createAvatarFile(file: File): Promise<File> {
  let image: ImageBitmap;

  try {
    image = await createImageBitmap(file, { imageOrientation: "from-image" });
  } catch {
    throw new Error(`File "${file.name}" is not a valid image.`);
  }

  try {
    if (image.width * image.height > MAX_AVATAR_PIXELS) {
      throw new Error("Image resolution is too large.");
    }

    const cropSize = Math.min(image.width, image.height);
    const sourceX = (image.width - cropSize) / 2;
    const sourceY = (image.height - cropSize) / 2;

    const canvas = document.createElement("canvas");
    canvas.width = AVATAR_SIZE;
    canvas.height = AVATAR_SIZE;

    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Your browser could not process this image.");
    }

    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";

    context.drawImage(
      image,
      sourceX,
      sourceY,
      cropSize,
      cropSize,
      0,
      0,
      AVATAR_SIZE,
      AVATAR_SIZE,
    );

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (result) => {
          if (result) {
            resolve(result);
          } else {
            reject(
              new Error("Your browser could not convert this image to WebP."),
            );
          }
        },
        "image/webp",
        WEBP_QUALITY,
      );
    });

    const baseName = file.name.replace(/\.[^.]+$/, "") || "avatar";

    return new File([blob], `${baseName}.webp`, {
      type: "image/webp",
    });
  } finally {
    image.close();
  }
}

export function useAvatarUpload({
  maxSize = MAX_AVATAR_FILE_SIZE,
  disabled = false,
}: {
  maxSize?: number;
  disabled?: boolean;
} = {}) {
  const upload = useFileUpload({
    maxSize,
    disabled,
    accept: "image/jpeg,image/png,image/webp",
    transformFile: createAvatarFile,
  });

  return {
    ...upload,
    maxSize,
  };
}

export type AvatarUploadController = ReturnType<typeof useAvatarUpload>;
