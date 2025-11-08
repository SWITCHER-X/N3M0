"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../_Navbar";
import Footer from "../Footer";
import { Terminal } from "@/components/Terminal";
import { ScrollToTop } from "@/components/ScrollToTop";

const Timeline = () => {
  const router = useRouter();
  const [showTerminal, setShowTerminal] = useState(false);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")) return;
      
      if (e.key.toLowerCase() === "h" && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        router.push("/");
      } else if (e.key.toLowerCase() === "a" && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        router.push("/#about");
      } else if (e.key.toLowerCase() === "p" && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        router.push("/#projects");
      } else if (e.key.toLowerCase() === "c" && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        router.push("/#contact");
      } else if (e.key.toLowerCase() === "t" && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (e.key === "`" || e.key === "~") {
        e.preventDefault();
        setShowTerminal(true);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [router]);

  return (
    <>
      <div className="flex justify-center">
        <Navbar />
      </div>
      <main className="min-h-screen">
        <section className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-20 sm:py-24 md:py-32 lg:py-40 font-mono">
          <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-wider mb-3 sm:mb-4">
              EXPERIENCE
            </h1>
            <div className="w-16 sm:w-20 md:w-24 h-1 bg-green-500 mx-auto mb-4 sm:mb-6 md:mb-8"></div>
            <p className="text-xs sm:text-xs md:text-sm leading-relaxed max-w-2xl mx-auto text-foreground/70 px-2">
              A timeline of my professional journey and experiences.
            </p>
          </div>

          <div className="space-y-6 sm:space-y-8">
            {/* Timeline items will be added here */}
            <div className="border border-foreground/30 rounded-3xl p-4 sm:p-6 md:p-8">
              <p className="text-foreground/60 text-xs sm:text-sm text-center">
                Timeline content coming soon...
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Terminal Modal */}
      {showTerminal && (
        <Terminal onClose={() => setShowTerminal(false)} />
      )}
      <ScrollToTop />
    </>
  );
};

export default Timeline;

