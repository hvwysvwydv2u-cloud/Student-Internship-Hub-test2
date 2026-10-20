"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export const ACCENT_PRESETS = {
  blue: {
    id: "blue",
    name: "أزرق",
    label: "Blue",
    color: "#3b82f6",
    hover: "#2563eb",
    muted: "#1d4ed8",
    subtle: "rgba(59, 130, 246, 0.14)",
    glow: "rgba(59, 130, 246, 0.28)",
    foreground: "#ffffff",
    heroBg: "#0c1e33",
    heroBorder: "rgba(59, 130, 246, 0.25)",
  },
  green: {
    id: "green",
    name: "أخضر",
    label: "Green",
    color: "#22c55e",
    hover: "#16a34a",
    muted: "#15803d",
    subtle: "rgba(34, 197, 94, 0.14)",
    glow: "rgba(34, 197, 94, 0.28)",
    foreground: "#052e16",
    heroBg: "#0a2117",
    heroBorder: "rgba(34, 197, 94, 0.25)",
  },
  purple: {
    id: "purple",
    name: "بنفسجي",
    label: "Purple",
    color: "#a855f7",
    hover: "#9333ea",
    muted: "#7e22ce",
    subtle: "rgba(168, 85, 247, 0.14)",
    glow: "rgba(168, 85, 247, 0.28)",
    foreground: "#ffffff",
    heroBg: "#1e1133",
    heroBorder: "rgba(168, 85, 247, 0.25)",
  },
  orange: {
    id: "orange",
    name: "برتقالي",
    label: "Orange",
    color: "#f97316",
    hover: "#ea580c",
    muted: "#c2410c",
    subtle: "rgba(249, 115, 22, 0.14)",
    glow: "rgba(249, 115, 22, 0.28)",
    foreground: "#ffffff",
    heroBg: "#291407",
    heroBorder: "rgba(249, 115, 22, 0.25)",
  },
  red: {
    id: "red",
    name: "أحمر",
    label: "Red",
    color: "#ef4444",
    hover: "#dc2626",
    muted: "#b91c1c",
    subtle: "rgba(239, 68, 68, 0.14)",
    glow: "rgba(239, 68, 68, 0.28)",
    foreground: "#ffffff",
    heroBg: "#290b10",
    heroBorder: "rgba(239, 68, 68, 0.25)",
  },
};

const ThemeContext = createContext({
  theme: "dark",
  accent: "green",
  toggleTheme: () => {},
  setTheme: () => {},
  setAccent: () => {},
  isSettingsOpen: false,
  setIsSettingsOpen: () => {},
  toggleSettings: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function applyAccent(accentId) {
  if (typeof document === "undefined") return;
  const preset = ACCENT_PRESETS[accentId] || ACCENT_PRESETS.green;
  const root = document.documentElement;
  root.style.setProperty("--primary", preset.color);
  root.style.setProperty("--primary-hover", preset.hover);
  root.style.setProperty("--primary-muted", preset.muted);
  root.style.setProperty("--primary-subtle", preset.subtle);
  root.style.setProperty("--primary-glow", preset.glow);
  root.style.setProperty("--primary-foreground", preset.foreground);
  root.style.setProperty("--hero-accent-bg", preset.heroBg);
  root.style.setProperty("--hero-accent-border", preset.heroBorder);
  root.setAttribute("data-accent", preset.id);
  try {
    localStorage.setItem("trainlink-accent", preset.id);
  } catch {}
}

export function applyTheme(theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
  root.setAttribute("data-theme", theme);
  try {
    localStorage.setItem("trainlink-theme", theme);
  } catch {}
}

function getInitialTheme() {
  if (typeof window === "undefined") return "dark";
  try {
    const stored = localStorage.getItem("trainlink-theme");
    if (stored === "light" || stored === "dark") return stored;
  } catch {}
  return "dark";
}

function getInitialAccent() {
  if (typeof window === "undefined") return "green";
  try {
    const stored = localStorage.getItem("trainlink-accent");
    if (stored && ACCENT_PRESETS[stored]) return stored;
  } catch {}
  return "green";
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(getInitialTheme);
  const [accent, setAccentState] = useState(getInitialAccent);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    applyTheme(theme);
    applyAccent(accent);
  }, [theme, accent]);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      applyTheme(next);
      return next;
    });
  }, []);

  const setTheme = useCallback((newTheme) => {
    if (newTheme === "dark" || newTheme === "light") {
      setThemeState(newTheme);
      applyTheme(newTheme);
    }
  }, []);

  const setAccent = useCallback((newAccent) => {
    if (ACCENT_PRESETS[newAccent]) {
      setAccentState(newAccent);
      applyAccent(newAccent);
    }
  }, []);

  const toggleSettings = useCallback(() => {
    setIsSettingsOpen((prev) => !prev);
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        accent,
        toggleTheme,
        setTheme,
        setAccent,
        isSettingsOpen,
        setIsSettingsOpen,
        toggleSettings,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
