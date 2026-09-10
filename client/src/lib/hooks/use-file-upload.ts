import { useRef, useState, useEffect } from "react";
import { formatBytes } from "@/lib/utils";

export type FileWithPreview = {
  file: File;
  preview: string;
};

export type FileUploadOptions = {
  accept?: string;
  maxSize?: number; // in bytes
  disabled?: boolean;
  transformFile?: (file: File) => Promise<File>;
};

export type FileUploadState = {
  file: FileWithPreview | null;
  error: string | null;
  isDragging: boolean;
  isProcessing: boolean;
};

export const useFileUpload = (options: FileUploadOptions = {}) => {
  const {
    accept = "*",
    maxSize = 8 * 1024 * 1024, // 8 MB in bytes
    disabled = false,
    transformFile,
  } = options;

  const [uploadState, setUploadState] = useState<FileUploadState>({
    file: null,
    error: null,
    isDragging: false,
    isProcessing: false,
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const processingRef = useRef(false);
  const preview = uploadState.file?.preview;
  const isDisabled = disabled || uploadState.isProcessing;

  useEffect(() => {
    if (!preview) {
      return;
    }

    return () => {
      URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const validateFile = (file: File): string | null => {
    if (file.size > maxSize) {
      return `File "${file.name}" exceeds the maximum size of ${formatBytes(maxSize)}.`;
    }

    const acceptedTypes = accept
      .split(",")
      .map((value) => value.trim().toLowerCase())
      .filter(Boolean);

    const fileName = file.name.toLowerCase();
    const fileType = file.type.toLowerCase();

    const isAccepted =
      acceptedTypes.length === 0 ||
      acceptedTypes.some((type) => {
        if (type === "*" || type === "*/*") {
          return true;
        }

        if (type.startsWith(".")) {
          return fileName.endsWith(type);
        }

        if (type.endsWith("/*")) {
          return fileType.startsWith(type.slice(0, -1));
        }

        return fileType === type;
      });

    return isAccepted
      ? null
      : `File "${file.name}" is not an accepted file type.`;
  };

  const addFile = async (file: File) => {
    if (disabled || processingRef.current) return;

    const validationError = validateFile(file);

    if (validationError) {
      setUploadState((prev) => ({ ...prev, error: validationError }));

      return;
    }

    processingRef.current = true;
    setUploadState((prev) => ({ ...prev, isProcessing: true }));

    try {
      const processedFile = transformFile ? await transformFile(file) : file;

      const nextFile: FileWithPreview = {
        file: processedFile,
        preview: URL.createObjectURL(processedFile),
      };

      setUploadState((prev) => ({ ...prev, file: nextFile, error: null }));
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : `File "${file.name}" could not be processed.`;

      setUploadState((prev) => ({ ...prev, error: message }));
    } finally {
      processingRef.current = false;
      setUploadState((prev) => ({ ...prev, isProcessing: false }));
    }
  };

  const removeFile = () => {
    if (disabled || processingRef.current) return;

    setUploadState((prev) => ({ ...prev, file: null, error: null }));
  };

  const openFileDialog = () => {
    if (
      !disabled &&
      !processingRef.current &&
      inputRef.current &&
      !inputRef.current.disabled
    ) {
      inputRef.current.click();
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setUploadState((prev) => ({ ...prev, isDragging: false }));

    const file = e.dataTransfer.files[0];

    if (!file || inputRef.current?.disabled) {
      return;
    }

    void addFile(file);
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === inputRef.current) {
      return;
    }

    openFileDialog();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.target !== e.currentTarget) {
      return;
    }

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openFileDialog();
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!inputRef.current?.disabled) {
      setUploadState((prev) => ({ ...prev, isDragging: true }));
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const relatedTarget = e.relatedTarget;

    if (
      relatedTarget instanceof Node &&
      e.currentTarget.contains(relatedTarget)
    ) {
      return;
    }

    setUploadState((prev) => ({ ...prev, isDragging: false }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];

    e.currentTarget.value = "";

    if (file) {
      void addFile(file);
    }
  };

  const inputProps = {
    accept,
    ref: inputRef,
    type: "file" as const,
    disabled: isDisabled,
    onChange: handleFileChange,
  };

  return {
    file: uploadState.file?.file ?? null,
    previewUrl: preview,
    error: uploadState.error,
    isDragging: uploadState.isDragging,
    isProcessing: uploadState.isProcessing,
    removeFile,
    isDisabled,
    inputProps,
    triggerProps: {
      role: "button" as const,
      tabIndex: isDisabled ? -1 : 0,
      "aria-disabled": isDisabled,
      "aria-busy": uploadState.isProcessing,
      onClick: handleClick,
      onKeyDown: handleKeyDown,
    },
    dropZoneProps: {
      onDrop: handleDrop,
      onDragOver: handleDragOver,
      onDragEnter: handleDragEnter,
      onDragLeave: handleDragLeave,
    },
  };
};
