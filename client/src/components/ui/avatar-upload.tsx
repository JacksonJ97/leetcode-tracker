"use client";

import { useCallback } from "react";
import { formatBytes, useFileUpload, type FileWithPreview } from "@/lib/hooks";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PlusIcon, UserIcon, XIcon } from "lucide-react";
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "./avatar";

const AVATAR_SIZE = 512;
const WEBP_QUALITY = 0.9;

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
  defaultAvatar?: string;
}

export function AvatarUpload({
  maxSize = 2 * 1024 * 1024, // 2MB
  className,
  onFileChange,
  defaultAvatar,
}: AvatarUploadProps) {
  const transformFile = useCallback(async (file: File) => {
    try {
      return await createAvatarFile(file);
    } finally {
    }
  }, []);

  const [
    { file: currentFile, isDragging },
    {
      removeFile,

      handleDrop,
      openFileDialog,
      handleKeyDown,
      handleDragOver,
      handleDragEnter,
      handleDragLeave,

      getInputProps,
    },
  ] = useFileUpload({
    maxSize,
    accept: "image/*",
    transformFile,
    onFileChange,
  });

  const previewUrl = currentFile?.preview || defaultAvatar;

  return (
    <div className={cn("flex items-center gap-4", className)}>
      <Avatar
        size="xl"
        className="cursor-pointer"
        // className={cn(
        //   "focus-visible:ring-focus-ring focus-visible:ring-offset-background cursor-pointer ring-offset-2 transition-opacity outline-none focus-visible:ring-2",
        //   isDragging && "ring-primary ring-2 ring-offset-2",
        //   // isProcessing && "pointer-events-none opacity-70",
        // )}
        // role="button"
        // tabIndex={0}
        aria-label={
          previewUrl ? "Change profile photo" : "Select profile photo"
        }
        onDrop={handleDrop}
        onClick={openFileDialog}
        onKeyDown={handleKeyDown}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
      >
        <input
          // {...getInputProps({ disabled: isProcessing })}
          {...getInputProps()}
          className="sr-only"
        />

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
      </Avatar>

      <div className="space-y-0.5">
        <p className="text-sm font-medium">
          Profile photo{" "}
          <span className="text-foreground-muted">(Optional)</span>
        </p>
        <p className="text-foreground-muted text-sm">
          {/* Add a photo to your profile. */}
          Select or drop an image. Max {formatBytes(maxSize)}.
          {/* {isProcessing
            ? "Processing image…"
            : `Select or drop an image. Max ${formatBytes(maxSize)}.`} */}
        </p>
      </div>

      {/* {errors.length > 0 && (
        <Alert variant="destructive" className="mt-5">
          <CircleAlertIcon />
          <AlertTitle>File upload error(s)</AlertTitle>
          <AlertDescription>
            {errors.map((error, index) => (
              <p key={index} className="last:mb-0">
                {error}
              </p>
            ))}
          </AlertDescription>
        </Alert>
      )} */}
    </div>
  );
}
