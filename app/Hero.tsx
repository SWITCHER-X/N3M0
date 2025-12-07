"use client";
import { ChevronDown, Github, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { XIcon } from "@/components/XIcon";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

const socials = [
  { url: "https://github.com/SWITCHER-X", label: "Github", icon: Github },
  { url: "mailto:bigkingayuba@gmail", label: "Mail", icon: Mail },
  { url: "https://x.com/switcher_x_", label: "X", icon: XIcon },
  { url: "http://wa.me/2349029347885", label: "WhatsApp", icon: WhatsAppIcon },
];

const Hero = () => {
  const router = useRouter();
  const fullText = "> CYBERSECURITY SPECIALIST & TECH ENTHUSIAST";
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [isTyping, setIsTyping] = useState(true);


  useEffect(() => {
    setIsTyping(true);
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, 50); // Typing speed

    // Blink cursor continuously
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")) return;
      
      if (e.key.toLowerCase() === "h" && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (e.key.toLowerCase() === "a" && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
      } else if (e.key.toLowerCase() === "p" && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
      } else if (e.key.toLowerCase() === "c" && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      } else if (e.key.toLowerCase() === "t" && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        router.push("/timeline");
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [router]);

  return (
  <section id="home" className="relative min-h-screen">
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `linear-gradient(var(--grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)`,
        backgroundColor: "var(--grid-bg)",
        backgroundSize: "50px 50px",
      }}
    ></div>
    <header className="relative z-10 pt-20 sm:pt-24 md:pt-28 lg:pt-32 min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 md:px-8">
      <div className="font-mono max-w-2xl w-full">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground font-black text-center mb-2 sm:mb-4">
          SWITCHER.DEV
        </h1>

        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="w-32 sm:w-40 md:w-48 h-1 bg-foreground"></div>
        </div>

        <p className="text-center text-xs sm:text-sm md:text-base text-foreground/60 tracking-widest mb-6 sm:mb-8 font-mono">
          {isTyping && displayedText === "" ? (
            <span className="inline-block w-4 h-4 border-2 border-foreground/60 border-t-foreground rounded-full animate-spin" aria-label="Loading" />
          ) : (
            <>
              {displayedText}
              <span className={`terminal-cursor ${showCursor ? "opacity-100" : "opacity-0"}`}>_</span>
            </>
          )}
        </p>

        <div className="text-center mb-6 sm:mb-8 md:mb-10 text-xs sm:text-sm md:text-base leading-relaxed text-foreground/70 px-2">
          <p>
            Hi, my name is{" "}
            <span className="bg-foreground text-xs sm:text-sm text-background px-2 py-1 inline-block rounded-2xl">
              Medugu Ayuba
            </span>{" "}
            — I am a cybersecurity specialist and tech enthusiast who thrives on
            the dual nature of creation and deconstruction. Driven by an insatiable
            curiosity for information and technology, I&apos;m constantly exploring
            the boundaries between building secure systems and understanding how
            they can be broken. Whether it&apos;s securing networks, developing
            applications, or leading projects, I approach every challenge with
            the mindset of someone who loves to create solutions and understand
            their vulnerabilities—because that&apos;s me.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-12">
          <button
            onClick={() => router.push("/timeline")}
            className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-foreground text-background font-semibold text-xs sm:text-sm hover:bg-foreground/70 hover:cursor-pointer transition-colors duration-150 rounded-3xl"
            aria-label="View Timeline"
          >
            VIEW TIMELINE
          </button>
          <button
            className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-background text-foreground border-2 border-foreground font-semibold text-xs sm:text-sm hover:bg-foreground hover:cursor-pointer hover:text-background transition-colors duration-150 rounded-3xl focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2"
            aria-label="Download CV"
            tabIndex={0}
          >
            DOWNLOAD CV
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 mb-10 sm:mb-12 md:mb-16">
          {socials.map(({ url, label, icon: Icon }, i) => {
            return (
              <a
                key={i}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 sm:p-3 border-2 rounded-full border-foreground/20 hover:border-foreground transition-colors duration-150 hover:bg-foreground hover:text-background group relative"
                aria-label={label}
                title={url}
              >
                <Icon size={18} className="sm:block" />
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                  {url}
                </span>
              </a>
            );
          })}
        </div>
      </div>

      {/* Scroll Down Arrow */}
      <div className="absolute bottom-6 sm:bottom-8 animate-bounce">
        <a
          href="#about"
          aria-label="Scroll to About section"
          className="focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 rounded-full"
        >
          <ChevronDown size={28} className="sm:w-8 sm:h-8 text-foreground/40" />
        </a>
      </div>
    </header>
  </section>
  );
};

export default Hero;
