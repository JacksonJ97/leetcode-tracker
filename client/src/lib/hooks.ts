"use client";

import { useRef, useState, useCallback, useSyncExternalStore } from "react";

export function useIsMobile(mobileBreakpoint = 768) {
  const query = `(max-width: ${mobileBreakpoint - 1}px)`;

  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const mediaQuery = window.matchMedia(query);
      mediaQuery.addEventListener("change", onStoreChange);

      return () => mediaQuery.removeEventListener("change", onStoreChange);
    },
    [query],
  );

  const getSnapshot = useCallback(
    () => window.matchMedia(query).matches,
    [query],
  );
  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export type FileMetadata = {
  name: string;
  size: number;
  type: string;
  url: string;
  id: string;
};

export type FileWithPreview = {
  id: string;
  file: File | FileMetadata;
  preview?: string;
};

export type FileUploadOptions = {
  maxSize?: number; // in bytes
  accept?: string;
  initialFile?: FileMetadata;
  transformFile?: (file: File) => Promise<File>;
  onFileChange?: (file: FileWithPreview | null) => void;
  onError?: (error: string) => void;
};

export type FileUploadState = {
  file: FileWithPreview | null;
  error: string | null;
  isDragging: boolean;
};

export type FileUploadActions = {
  addFile: (file: File) => Promise<void>;
  removeFile: () => void;
  clearError: () => void;

  handleDrop: (e: React.DragEvent<HTMLElement>) => void;
  openFileDialog: () => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLElement>) => void;
  handleDragOver: (e: React.DragEvent<HTMLElement>) => void;
  handleDragEnter: (e: React.DragEvent<HTMLElement>) => void;
  handleDragLeave: (e: React.DragEvent<HTMLElement>) => void;

  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  getInputProps: (
    props?: React.InputHTMLAttributes<HTMLInputElement>,
  ) => React.InputHTMLAttributes<HTMLInputElement> & {
    ref: React.Ref<HTMLInputElement>;
  };
};

export const useFileUpload = (
  options: FileUploadOptions = {},
): [FileUploadState, FileUploadActions] => {
  const {
    maxSize = Number.POSITIVE_INFINITY,
    accept = "*",
    initialFile,
    transformFile,
    onFileChange,
    onError,
  } = options;

  const [state, setState] = useState<FileUploadState>({
    file: initialFile
      ? {
          id: initialFile.id,
          file: initialFile,
          preview: initialFile.url,
        }
      : null,
    error: null,
    isDragging: false,
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const validateFile = useCallback(
    (file: File) => {
      if (file.size > maxSize) {
        return `File "${file.name}" exceeds the maximum size of ${formatBytes(maxSize)}.`;
      }

      if (accept !== "*") {
        const acceptedTypes = accept.split(",").map((type) => type.trim());
        const fileType = file.type || "";
        const fileExtension = `.${file.name.split(".").pop()}`;

        const isAccepted = acceptedTypes.some((type) => {
          if (type.startsWith(".")) {
            return fileExtension.toLowerCase() === type.toLowerCase();
          }
          if (type.endsWith("/*")) {
            const baseType = type.split("/")[0];
            return fileType.startsWith(`${baseType}/`);
          }
          return fileType === type;
        });

        if (!isAccepted) {
          return `File "${file.name}" is not an accepted file type.`;
        }
      }

      return null;
    },
    [accept, maxSize],
  );

  const removeFile = useCallback(() => {
    setState((prev) => {
      if (prev.file?.preview && prev.file.file instanceof File) {
        URL.revokeObjectURL(prev.file.preview);
      }

      if (inputRef.current) {
        inputRef.current.value = "";
      }

      return { ...prev, file: null, error: null };
    });
    onFileChange?.(null);
  }, [onFileChange]);

  const addFile = useCallback(
    async (file: File) => {
      const validationError = validateFile(file);
      if (validationError) {
        setState((prev) => ({ ...prev, error: validationError }));
        onError?.(validationError);
        if (inputRef.current) inputRef.current.value = "";
        return;
      }

      try {
        const processedFile = transformFile ? await transformFile(file) : file;
        const nextFile: FileWithPreview = {
          id: `${processedFile.name}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          file: processedFile,
          preview: URL.createObjectURL(processedFile),
        };

        setState((prev) => {
          if (prev.file?.preview && prev.file.file instanceof File) {
            URL.revokeObjectURL(prev.file.preview);
          }
          return { ...prev, file: nextFile, error: null };
        });
        onFileChange?.(nextFile);
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : `File "${file.name}" could not be processed.`;
        setState((prev) => ({ ...prev, error: message }));
        onError?.(message);
      } finally {
        if (inputRef.current) {
          inputRef.current.value = "";
        }
      }
    },
    [onError, onFileChange, transformFile, validateFile],
  );

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setState((prev) => ({ ...prev, isDragging: false }));

      // Don't process files if the input is disabled
      if (inputRef.current?.disabled) {
        return;
      }

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        void addFile(e.dataTransfer.files[0]);
      }
    },
    [addFile],
  );

  const openFileDialog = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openFileDialog();
      }
    },
    [openFileDialog],
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setState((prev) => ({ ...prev, isDragging: true }));
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.currentTarget.contains(e.relatedTarget as Node)) {
      return;
    }

    setState((prev) => ({ ...prev, isDragging: false }));
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        void addFile(e.target.files[0]);
      }
    },
    [addFile],
  );

  const getInputProps = useCallback(
    (props: React.InputHTMLAttributes<HTMLInputElement> = {}) => {
      return {
        ...props,
        type: "file" as const,
        onChange: handleFileChange,
        accept: props.accept || accept,
        ref: inputRef,
      };
    },
    [accept, handleFileChange],
  );

  return [
    state,
    {
      addFile,
      removeFile,
      clearError,

      handleDrop,
      openFileDialog,
      handleKeyDown,
      handleDragOver,
      handleDragEnter,
      handleDragLeave,

      handleFileChange,
      getInputProps,
    },
  ];
};

// Helper function to format bytes to human-readable format
export const formatBytes = (bytes: number, decimals = 2): string => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Number.parseFloat((bytes / k ** i).toFixed(dm)) + sizes[i];
};
