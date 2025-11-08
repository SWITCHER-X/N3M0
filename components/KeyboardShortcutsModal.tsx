"use client";
import { useEffect, useState } from "react";

interface KeyboardShortcutsModalProps {
  onClose: () => void;
}

export const KeyboardShortcutsModal = ({ onClose }: KeyboardShortcutsModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const shortcuts = [
    { key: "H", description: "Navigate to home" },
    { key: "A", description: "Navigate to About section" },
    { key: "P", description: "Navigate to Projects section" },
    { key: "C", description: "Navigate to Contact section" },
    { key: "T", description: "Navigate to Timeline / Scroll to top" },
    { key: "`", description: "Open terminal" },
    { key: "?", description: "Show keyboard shortcuts" },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Keyboard Shortcuts"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-background border-2 border-green-500 rounded-lg p-4 sm:p-6 w-[calc(100%-1rem)] sm:w-full max-w-lg mx-2 sm:mx-4 font-mono text-xs sm:text-sm shadow-2xl">
        <div className="flex justify-between items-center mb-4 gap-2">
          <h2 className="text-lg sm:text-xl font-bold text-green-500">KEYBOARD SHORTCUTS</h2>
          <button
            onClick={onClose}
            className="text-foreground/60 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-green-500 rounded shrink-0"
            aria-label="Close shortcuts"
          >
            ✕
          </button>
        </div>
        <div className="space-y-2 sm:space-y-3">
          {shortcuts.map((shortcut, index) => (
            <div key={index} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 py-2 border-b border-foreground/10">
              <span className="text-foreground/70 text-xs sm:text-sm">{shortcut.description}</span>
              <kbd className="px-2 sm:px-3 py-1 bg-foreground/10 border border-foreground/20 rounded text-xs font-mono shrink-0">
                {shortcut.key}
              </kbd>
            </div>
          ))}
        </div>
        <p className="text-xs text-foreground/50 mt-4 text-center">
          Press ESC to close
        </p>
      </div>
    </div>
  );
};

