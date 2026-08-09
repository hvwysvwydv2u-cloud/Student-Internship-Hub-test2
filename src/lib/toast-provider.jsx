"use client";

import React, { createContext, useContext, useState, useCallback, useRef } from "react";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";

const ToastContext = createContext({
  toast: () => {},
});

export function useToast() {
  return useContext(ToastContext);
}

let toastId = 0;

const icons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

const colors = {
  success: {
    bg: "bg-[var(--success)]/10",
    border: "border-[var(--success)]/20",
    text: "text-[var(--success)]",
    icon: "text-[var(--success)]",
  },
  error: {
    bg: "bg-[var(--error)]/10",
    border: "border-[var(--error)]/20",
    text: "text-[var(--error)]",
    icon: "text-[var(--error)]",
  },
  warning: {
    bg: "bg-[var(--warning)]/10",
    border: "border-[var(--warning)]/20",
    text: "text-[var(--warning)]",
    icon: "text-[var(--warning)]",
  },
  info: {
    bg: "bg-[var(--accent-blue)]/10",
    border: "border-[var(--accent-blue)]/20",
    text: "text-[var(--accent-blue)]",
    icon: "text-[var(--accent-blue)]",
  },
};

function ToastItem({ id, message, type = "success", onDismiss }) {
  const [exiting, setExiting] = useState(false);
  const Icon = icons[type] || icons.info;
  const color = colors[type] || colors.info;

  const handleDismiss = useCallback(() => {
    setExiting(true);
    setTimeout(() => onDismiss(id), 150);
  }, [id, onDismiss]);

  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg backdrop-blur-sm ${color.bg} ${color.border} ${exiting ? "toast-exit" : "toast-enter"}`}
      dir="rtl"
    >
      <Icon className={`w-5 h-5 shrink-0 ${color.icon}`} />
      <span className={`text-sm font-medium ${color.text} flex-1`}>{message}</span>
      <button
        onClick={handleDismiss}
        className="shrink-0 p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
        aria-label="إغلاق"
      >
        <X className="w-3.5 h-3.5 text-[var(--text-muted)]" />
      </button>
    </div>
  );
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef({});

  const dismiss = useCallback((id) => {
    if (timers.current[id]) {
      clearTimeout(timers.current[id]);
      delete timers.current[id];
    }
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (message, { type = "success", duration = 4000 } = {}) => {
      const id = ++toastId;
      setToasts((prev) => {
        // Deduplicate: skip if same message already visible
        if (prev.some((t) => t.message === message)) return prev;
        return [...prev, { id, message, type }];
      });
      if (duration > 0) {
        timers.current[id] = setTimeout(() => dismiss(id), duration);
      }
      return id;
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div
        className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-auto md:right-6 z-[100] flex flex-col gap-2 max-w-sm"
        dir="rtl"
      >
        {toasts.map((t) => (
          <ToastItem key={t.id} {...t} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}
