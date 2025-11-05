"use client";
import { useState, useCallback } from "react";
import { useError } from "@/contexts/error-context";

type LoadingContext =
  | "default"
  | "saving"
  | "deleting"
  | "uploading"
  | "processing"
  | "searching"
  | "validating"
  | "submitting";

interface UseLoadingStateOptions {
  context?: LoadingContext;
  duration?: number;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

interface LoadingState {
  isLoading: boolean;
  message: string;
  progress?: number;
}

// Fallback messages when translations are not available
const FALLBACK_MESSAGES: Record<LoadingContext, string> = {
  default: "Loading...",
  saving: "Saving...",
  deleting: "Deleting...",
  uploading: "Uploading...",
  processing: "Processing...",
  searching: "Searching...",
  validating: "Validating...",
  submitting: "Submitting...",
};

export function useLoadingState(options: UseLoadingStateOptions = {}) {
  const { context = "default", duration = 2000 } = options;
  const { addError } = useError();

  const [state, setState] = useState<LoadingState>({
    isLoading: false,
    message: FALLBACK_MESSAGES[context],
  });

  const startLoading = useCallback(
    (customMessage?: string) => {
      setState({
        isLoading: true,
        message: customMessage || FALLBACK_MESSAGES[context],
        progress: 0,
      });
    },
    [context]
  );

  const updateProgress = useCallback((progress: number) => {
    setState((prev) => ({
      ...prev,
      progress: Math.max(0, Math.min(100, progress)),
    }));
  }, []);

  const updateMessage = useCallback((message: string) => {
    setState((prev) => ({
      ...prev,
      message,
    }));
  }, []);

  const stopLoading = useCallback(() => {
    setState({
      isLoading: false,
      message: FALLBACK_MESSAGES[context],
      progress: undefined,
    });
  }, [context]);

  const executeWithLoading = useCallback(
    async (asyncOperation: () => Promise<any>, customMessage?: string): Promise<any> => {
      try {
        startLoading(customMessage);

        // Simulate minimum loading time for better UX
        const [result] = await Promise.all([
          asyncOperation(),
          import("@/lib/actions/actions").then(({ sleep }) => sleep(300)), // Minimum 300ms
        ]);

        options.onSuccess?.();
        return result;
      } catch (error) {
        const errorInstance = error instanceof Error ? error : new Error("Unknown error");
        addError(errorInstance);
        options.onError?.(errorInstance);
        return null;
      } finally {
        stopLoading();
      }
    },
    [startLoading, stopLoading, addError, options]
  );

  const executeWithProgressTracking = useCallback(
    async (
      asyncOperation: (updateProgress: (progress: number) => void) => Promise<any>,
      customMessage?: string
    ): Promise<any> => {
      try {
        startLoading(customMessage);

        const result = await asyncOperation(updateProgress);

        options.onSuccess?.();
        return result;
      } catch (error) {
        const errorInstance = error instanceof Error ? error : new Error("Unknown error");
        addError(errorInstance);
        options.onError?.(errorInstance);
        return null;
      } finally {
        stopLoading();
      }
    },
    [startLoading, stopLoading, updateProgress, addError, options]
  );

  return {
    ...state,
    startLoading,
    stopLoading,
    updateProgress,
    updateMessage,
    executeWithLoading,
    executeWithProgressTracking,
  };
}

// Specialized hooks for common use cases
export function useDashboardLoading() {
  return useLoadingState({ context: "default" });
}

export function useFormLoading() {
  return useLoadingState({
    context: "saving",
    duration: 2000,
  });
}

export function useUploadLoading() {
  return useLoadingState({
    context: "uploading",
    duration: 5000,
  });
}

export function useAuthLoading() {
  return useLoadingState({
    context: "processing",
    duration: 2000,
  });
}

export function useDataLoading() {
  return useLoadingState({
    context: "searching",
    duration: 1000,
  });
}
