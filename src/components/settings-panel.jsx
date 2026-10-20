"use client";

import React, { useEffect, useRef } from "react";
import { Settings, X, Check, Sun, Moon } from "lucide-react";
import { useTheme, ACCENT_PRESETS } from "@/lib/theme-provider";

export function SettingsPanel() {
  const {
    theme,
    accent,
    setTheme,
    setAccent,
    isSettingsOpen,
    setIsSettingsOpen,
    toggleSettings,
  } = useTheme();

  const panelRef = useRef(null);

  // Close when pressing Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isSettingsOpen) {
        setIsSettingsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSettingsOpen, setIsSettingsOpen]);

  // Close when clicking outside panel
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isSettingsOpen &&
        panelRef.current &&
        !panelRef.current.contains(e.target) &&
        !e.target.closest("[data-settings-trigger]")
      ) {
        setIsSettingsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSettingsOpen, setIsSettingsOpen]);

  // Order of swatches: Blue, Green, Purple, Orange, Red (as listed in prompt)
  const swatchKeys = ["blue", "green", "purple", "orange", "red"];

  return (
    <>
      {/* Floating Gear Trigger Button on the right edge */}
      <button
        data-settings-trigger
        onClick={toggleSettings}
        aria-label="Website Colors & Settings"
        aria-expanded={isSettingsOpen}
        className="fixed right-0 top-[38%] z-40 flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-l-2xl shadow-lg transition-all duration-300 hover:w-13 hover:shadow-[0_4px_20px_var(--primary-glow)] active:scale-95 group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--primary)]"
        style={{
          boxShadow: "0 6px 20px -2px var(--primary-glow), -2px 0 10px rgba(0,0,0,0.25)",
        }}
      >
        <Settings className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-500 group-hover:rotate-90" />
      </button>

      {/* Backdrop for mobile */}
      {isSettingsOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs transition-opacity duration-200 md:hidden"
          onClick={() => setIsSettingsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Compact Settings Panel */}
      <aside
        ref={panelRef}
        role="dialog"
        aria-label="Website Colors"
        aria-modal="true"
        className={`fixed top-[22%] right-4 z-50 w-72 sm:w-80 rounded-2xl bg-[var(--surface)] text-[var(--foreground)] border border-[var(--border)] shadow-2xl transition-all duration-300 transform ${
          isSettingsOpen
            ? "opacity-100 translate-x-0 scale-100 pointer-events-auto"
            : "opacity-0 translate-x-6 scale-95 pointer-events-none"
        }`}
        style={{
          boxShadow:
            "0 20px 40px -10px rgba(0,0,0,0.5), 0 0 20px -2px var(--primary-glow)",
        }}
        dir="ltr"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
          <div className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full bg-[var(--primary)] animate-pulse"
              aria-hidden="true"
            />
            <h3 className="font-bold text-base sm:text-lg tracking-tight text-[var(--foreground)]">
              Website Colors
            </h3>
          </div>
          <button
            onClick={() => setIsSettingsOpen(false)}
            aria-label="Close Settings"
            className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-elevated)] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Panel Body */}
        <div className="p-5 space-y-6">
          {/* Accent Color Selection */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                Accent Color
              </span>
              <span className="text-xs font-medium text-[var(--primary)] capitalize">
                {ACCENT_PRESETS[accent]?.label || "Green"}
              </span>
            </div>

            {/* Circular Color Swatches */}
            <div className="flex items-center justify-between gap-2.5 px-1 py-1">
              {swatchKeys.map((key) => {
                const preset = ACCENT_PRESETS[key];
                const isSelected = accent === key;
                return (
                  <button
                    key={key}
                    onClick={() => setAccent(key)}
                    aria-label={`Select ${preset.label} accent color`}
                    className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "scale-110 ring-3 ring-white ring-offset-2 ring-offset-[var(--surface)] shadow-md"
                        : "hover:scale-105 opacity-90 hover:opacity-100"
                    }`}
                    style={{
                      backgroundColor: preset.color,
                      boxShadow: isSelected
                        ? `0 0 14px ${preset.glow}`
                        : "0 2px 4px rgba(0,0,0,0.2)",
                    }}
                  >
                    {isSelected && (
                      <Check
                        className="w-4 h-4 stroke-[3]"
                        style={{
                          color: preset.foreground,
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Appearance Section */}
          <div className="pt-2 border-t border-[var(--border)]">
            <span className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-3">
              Appearance
            </span>

            {/* Segmented-Button Appearance Controls */}
            <div
              className="grid grid-cols-2 p-1 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)] gap-1"
              role="radiogroup"
              aria-label="Appearance Mode"
            >
              {/* Light Option */}
              <button
                type="button"
                role="radio"
                aria-checked={theme === "light"}
                onClick={() => setTheme("light")}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  theme === "light"
                    ? "bg-[var(--surface)] text-[var(--foreground)] shadow-xs border border-[var(--border)] scale-[1.02]"
                    : "text-[var(--text-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--surface)]/50"
                }`}
              >
                <Sun className={`w-4 h-4 ${theme === "light" ? "text-[var(--primary)]" : ""}`} />
                <span>Light</span>
              </button>

              {/* Dark Option */}
              <button
                type="button"
                role="radio"
                aria-checked={theme === "dark"}
                onClick={() => setTheme("dark")}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  theme === "dark"
                    ? "bg-[var(--surface)] text-[var(--foreground)] shadow-xs border border-[var(--border)] scale-[1.02]"
                    : "text-[var(--text-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--surface)]/50"
                }`}
              >
                <Moon className={`w-4 h-4 ${theme === "dark" ? "text-[var(--primary)]" : ""}`} />
                <span>Dark</span>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
