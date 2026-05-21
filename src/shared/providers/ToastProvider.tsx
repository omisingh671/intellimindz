"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Icons } from "@/shared/icons/icon-registry";
import { cn } from "@/shared/lib/utils";

type ToastType = "success" | "error" | "info";

type Toast = {
  id: string;
  message: string;
  title?: string;
  type: ToastType;
};

type ShowToastOptions = {
  message: string;
  title?: string;
  type?: ToastType;
};

type ToastContextValue = {
  dismissToast: (id: string) => void;
  showToast: (options: ShowToastOptions) => void;
};

const toastContext = createContext<ToastContextValue | null>(null);
const toastLifetimeMs = 4500;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    ({ message, title, type = "info" }: ShowToastOptions) => {
      const id = crypto.randomUUID();

      setToasts((current) => [
        ...current.slice(-3),
        {
          id,
          message,
          title,
          type,
        },
      ]);

      window.setTimeout(() => dismissToast(id), toastLifetimeMs);
    },
    [dismissToast],
  );

  const value = useMemo(
    () => ({
      dismissToast,
      showToast,
    }),
    [dismissToast, showToast],
  );

  return (
    <toastContext.Provider value={value}>
      {children}
      <ToastViewport dismissToast={dismissToast} toasts={toasts} />
    </toastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(toastContext);

  if (!context) {
    throw new Error("useToast must be used inside ToastProvider.");
  }

  return context;
}

function ToastViewport({
  dismissToast,
  toasts,
}: {
  dismissToast: (id: string) => void;
  toasts: Toast[];
}) {
  if (toasts.length === 0) {
    return null;
  }

  return (
    <div
      className="fixed right-4 top-24 z-[80] grid w-[calc(100vw-2rem)] max-w-sm gap-3 sm:right-6"
      aria-live="polite"
      aria-relevant="additions text"
    >
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          dismissToast={dismissToast}
          toast={toast}
        />
      ))}
    </div>
  );
}

function ToastItem({
  dismissToast,
  toast,
}: {
  dismissToast: (id: string) => void;
  toast: Toast;
}) {
  const Icon = toast.type === "success" ? Icons.check : Icons.info;
  const isError = toast.type === "error";

  return (
    <div
      role={isError ? "alert" : "status"}
      className={cn(
        "flex items-start gap-3 rounded-lg border bg-white p-4 text-sm shadow-xl shadow-slate-950/12 ring-1 ring-slate-950/5",
        toast.type === "success" && "border-emerald-200",
        toast.type === "error" && "border-red-200",
        toast.type === "info" && "border-blue-200",
      )}
    >
      <span
        className={cn(
          "grid size-8 shrink-0 place-items-center rounded-lg",
          toast.type === "success" && "bg-emerald-50 text-emerald-700",
          toast.type === "error" && "bg-red-50 text-red-700",
          toast.type === "info" && "bg-blue-50 text-blue-700",
        )}
      >
        <Icon className="size-4" />
      </span>
      <div className="min-w-0 flex-1">
        {toast.title ? (
          <p className="font-bold text-slate-950">{toast.title}</p>
        ) : null}
        <p className={cn("leading-6 text-slate-600", toast.title && "mt-0.5")}>
          {toast.message}
        </p>
      </div>
      <button
        type="button"
        className="grid size-8 shrink-0 place-items-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
        aria-label="Dismiss notification"
        onClick={() => dismissToast(toast.id)}
      >
        <Icons.x className="size-4" />
      </button>
    </div>
  );
}
