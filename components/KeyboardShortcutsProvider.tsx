"use client";
import { useEffect, useState } from "react";
import { KeyboardShortcutsModal } from "./KeyboardShortcutsModal";
import { toast } from "sonner";

export const KeyboardShortcutsProvider = ({ children }: { children: React.ReactNode }) => {
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [hasSeenIndicator, setHasSeenIndicator] = useState(false);
  const [konamiCode, setKonamiCode] = useState<string[]>([]);

  useEffect(() => {
    // Check if user has seen the indicator before
    const seen = localStorage.getItem("keyboard-shortcuts-seen");
    if (!seen) {
      setHasSeenIndicator(true);
      // Hide after 5 seconds
      setTimeout(() => {
        setHasSeenIndicator(false);
        localStorage.setItem("keyboard-shortcuts-seen", "true");
      }, 5000);
    }

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")) return;
      
      if (e.key === "?" || (e.shiftKey && e.key === "?")) {
        e.preventDefault();
        setShowShortcuts(true);
        return;
      }

      // Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
      const konamiSequence = [
        "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
        "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
        "b", "a"
      ];

      const key = e.key.toLowerCase() === "b" || e.key.toLowerCase() === "a" 
        ? e.key.toLowerCase() 
        : e.key;

      setKonamiCode((prev) => {
        const newCode = [...prev, key].slice(-10);
        
        if (newCode.length === konamiSequence.length) {
          const isMatch = newCode.every((k, i) => {
            const expected = konamiSequence[i];
            if (expected === "b" || expected === "a") {
              return k.toLowerCase() === expected;
            }
            return k === expected;
          });

          if (isMatch) {
            toast.success("🎮 Konami Code activated! You're a true gamer!", {
              duration: 4000,
            });
            // Could add more effects here
            return [];
          }
        }
        
        return newCode;
      });
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <>
      {children}
      {showShortcuts && (
        <KeyboardShortcutsModal onClose={() => setShowShortcuts(false)} />
      )}
      {hasSeenIndicator && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-background border-2 border-green-500 rounded-lg p-2 sm:p-3 font-mono text-xs shadow-lg z-40 animate-fade-in max-w-[calc(100vw-2rem)]">
          <p className="text-foreground/80 text-xs sm:text-xs">
            💡 Press <kbd className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-foreground/10 border border-foreground/20 rounded text-xs">?</kbd> for keyboard shortcuts
          </p>
        </div>
      )}
    </>
  );
};

