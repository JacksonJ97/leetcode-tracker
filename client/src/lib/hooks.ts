"use client";

import {
  useRef,
  useState,
  useEffect,
  useCallback,
  useSyncExternalStore,
} from "react";

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

export type FileWithPreview = {
  file: File;
  preview: string;
};

export type FileUploadOptions = {
  accept?: string;
  maxSize?: number; // in bytes
  onError?: (error: string) => void;
  onFileChange?: (file: FileWithPreview | null) => void;
  transformFile?: (file: File) => Promise<File>;
};

export type FileUploadState = {
  file: FileWithPreview | null;
  error: string | null;
  isDragging: boolean;
};

export type FileUploadActions = {
  removeFile: () => void;
  clearError: () => void;
  handleDrop: (e: React.DragEvent<HTMLElement>) => void;
  handleClick: (e: React.MouseEvent<HTMLElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLElement>) => void;
  handleDragOver: (e: React.DragEvent<HTMLElement>) => void;
  handleDragEnter: (e: React.DragEvent<HTMLElement>) => void;
  handleDragLeave: (e: React.DragEvent<HTMLElement>) => void;
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
    accept = "*",
    maxSize = Number.POSITIVE_INFINITY,
    onError,
    onFileChange,
    transformFile,
  } = options;

  const [uploadState, setUploadState] = useState<FileUploadState>({
    file: null,
    error: null,
    isDragging: false,
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const preview = uploadState.file?.preview;

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

    if (accept === "*" || accept === "*/*") {
      return null;
    }

    const fileName = file.name.toLowerCase();
    const fileType = file.type.toLowerCase();

    const isAccepted = accept.split(",").some((value) => {
      const acceptedType = value.trim().toLowerCase();

      if (acceptedType.startsWith(".")) {
        return fileName.endsWith(acceptedType);
      }

      if (acceptedType.endsWith("/*")) {
        return fileType.startsWith(acceptedType.slice(0, -1));
      }

      return fileType === acceptedType;
    });

    return isAccepted
      ? null
      : `File "${file.name}" is not an accepted file type.`;
  };

  const addFile = async (file: File) => {
    const validationError = validateFile(file);

    if (validationError) {
      setUploadState((prev) => ({ ...prev, error: validationError }));
      onError?.(validationError);

      if (inputRef.current) {
        inputRef.current.value = "";
      }

      return;
    }

    try {
      const processedFile = transformFile ? await transformFile(file) : file;

      const nextFile: FileWithPreview = {
        file: processedFile,
        preview: URL.createObjectURL(processedFile),
      };

      setUploadState((prev) => ({ ...prev, file: nextFile, error: null }));
      onFileChange?.(nextFile);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : `File "${file.name}" could not be processed.`;

      setUploadState((prev) => ({ ...prev, error: message }));
      onError?.(message);
    } finally {
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  const removeFile = () => {
    setUploadState((prev) => {
      if (inputRef.current) {
        inputRef.current.value = "";
      }

      return { ...prev, file: null, error: null };
    });

    onFileChange?.(null);
  };

  const clearError = () => {
    setUploadState((prev) => ({ ...prev, error: null }));
  };

  const openFileDialog = () => {
    if (inputRef.current && !inputRef.current.disabled) {
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

  const getInputProps = (
    props: React.InputHTMLAttributes<HTMLInputElement> = {},
  ) => {
    return {
      ...props,
      accept,
      ref: inputRef,
      type: "file" as const,
      onChange: handleFileChange,
    };
  };

  return [
    uploadState,
    {
      removeFile,
      clearError,
      handleDrop,
      handleClick,
      handleKeyDown,
      handleDragOver,
      handleDragEnter,
      handleDragLeave,
      getInputProps,
    },
  ];
};

export const formatBytes = (bytes: number, decimals = 2): string => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Number.parseFloat((bytes / k ** i).toFixed(dm)) + sizes[i];
};
