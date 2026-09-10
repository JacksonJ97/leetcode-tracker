"use client";

import { XIcon, UserIcon, PlusIcon, CircleAlertIcon } from "lucide-react";
import { cn, formatBytes } from "@/lib/utils";
import type { AvatarUploadController } from "@/lib/hooks/use-avatar-upload";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarImage, AvatarFallback, AvatarBadge } from "@/components/ui/avatar";

interface AvatarUploadProps {
  upload: AvatarUploadController;
  className?: string;
  defaultImageUrl?: string;
}

export function AvatarUpload({ upload, className, defaultImageUrl }: AvatarUploadProps) {
  const {
    file: currentFile,
    error,
    maxSize,
    isDisabled,
    isDragging,
    inputProps,
    triggerProps,
    dropZoneProps,
    removeFile,
  } = upload;

  const previewUrl = upload.previewUrl || defaultImageUrl;

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="flex items-center gap-4">
        <div {...dropZoneProps} className="relative">
          <Avatar
            {...triggerProps}
            size="xl"
            className="cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-focus-ring aria-disabled:cursor-default aria-disabled:opacity-50"
            aria-label={previewUrl ? "Change profile photo" : "Select profile photo"}
          >
            <input tabIndex={-1} className="sr-only" {...inputProps} />

            {previewUrl ? (
              <AvatarImage src={previewUrl} alt="Avatar" />
            ) : (
              <>
                <AvatarFallback
                  className={cn(
                    "border border-dashed border-(--gray-600) text-foreground-muted transition-colors",
                    !isDisabled && "hover:border-(--gray-400) hover:bg-(--gray-800)",
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
              disabled={isDisabled}
              aria-label="Remove avatar"
              onClick={removeFile}
              className="absolute top-0.5 right-0.5 z-10 size-5 rounded-full border-transparent bg-(--gray-800) ring-2 ring-background hover:bg-(--gray-700)"
            >
              <XIcon className="size-3.5" />
            </Button>
          )}
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium">
            Profile photo <span className="text-foreground-muted">(Optional)</span>
          </p>
          <p className="text-xs text-foreground-muted">
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
