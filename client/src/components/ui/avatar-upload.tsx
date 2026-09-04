"use client";

import { XIcon, UserIcon, PlusIcon, CircleAlertIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatBytes, useFileUpload, type FileWithPreview } from "@/lib/hooks";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const AVATAR_SIZE = 256;
const WEBP_QUALITY = 0.85;

async function createAvatarFile(file: File): Promise<File> {
  let image: ImageBitmap;

  try {
    image = await createImageBitmap(file, { imageOrientation: "from-image" });
  } catch {
    throw new Error(`File "${file.name}" is not a valid image.`);
  }

  try {
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
      lastModified: Date.now(),
    });
  } finally {
    image.close();
  }
}

interface AvatarUploadProps {
  maxSize?: number;
  className?: string;
  onFileChange?: (file: FileWithPreview | null) => void;
  defaultImageUrl?: string;
}

export function AvatarUpload({
  maxSize = 2 * 1024 * 1024, // 2MB
  className,
  onFileChange,
  defaultImageUrl,
}: AvatarUploadProps) {
  const [
    { file: currentFile, error, isDragging },
    {
      removeFile,
      handleDrop,
      handleClick,
      handleKeyDown,
      handleDragOver,
      handleDragEnter,
      handleDragLeave,
      getInputProps,
    },
  ] = useFileUpload({
    maxSize,
    accept: "image/jpeg,image/png,image/webp",
    onFileChange,
    transformFile: createAvatarFile,
  });

  const previewUrl = currentFile?.preview || defaultImageUrl;

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="flex items-center gap-4">
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          className="relative"
        >
          <Avatar
            size="xl"
            role="button"
            tabIndex={0}
            className="focus-visible:outline-focus-ring cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-1"
            aria-label={
              previewUrl ? "Change profile photo" : "Select profile photo"
            }
            onClick={handleClick}
            onKeyDown={handleKeyDown}
          >
            <input tabIndex={-1} className="sr-only" {...getInputProps()} />

            {previewUrl ? (
              <AvatarImage src={previewUrl} alt="Avatar" />
            ) : (
              <>
                <AvatarFallback
                  className={cn(
                    "text-foreground-muted border-border border-[1.5px] border-dashed transition-colors hover:border-(--gray-400)",
                    isDragging && "border-(--gray-400) bg-(--gray-800)",
                  )}
                >
                  <UserIcon />
                </AvatarFallback>
                <AvatarBadge>
                  <PlusIcon />
                </AvatarBadge>
              </>
            )}
          </Avatar>

          {currentFile && (
            <Button
              size="icon"
              variant="outline"
              aria-label="Remove avatar"
              onClick={(event) => {
                event.stopPropagation();
                removeFile();
              }}
              className="ring-background absolute top-0.5 right-0.5 z-10 size-5 rounded-full border-transparent bg-zinc-800 ring-2 hover:bg-zinc-700"
            >
              <XIcon className="size-3.5" />
            </Button>
          )}
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium">
            Profile photo{" "}
            <span className="text-foreground-muted">(Optional)</span>
          </p>
          <p className="text-foreground-muted text-xs">
            JPG, PNG, or WEBP — up to {formatBytes(maxSize)}
          </p>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <CircleAlertIcon />
          <AlertTitle>Upload error</AlertTitle>
          <AlertDescription>
            <p>{error}</p>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
