"use client";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [active, setActive] = useState("home");
  const [isOpen, setOpen] = useState(false);
  const [scrambledText, setScrambledText] = useState("SWITCHER.DEV");

  const navItems = ["About", "Projects", "Contact"];

  const handleNavClick = (id: string) => {
    setActive(id);
    setOpen(false);
    
    // If we're on timeline page, navigate to home first
    if (pathname !== "/") {
      router.push(`/#${id}`);
      return;
    }
    
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  const handleHomeClick = () => {
    if (pathname !== "/") {
      router.push("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setActive("home");
    }
  };

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.toLowerCase()))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        root: null,
        threshold: 0.5,
      }
    );

    sections.forEach((section) => observer.observe(section));
    const handleScrollTop = () => {
      if (window.scrollY < window.innerHeight * 0.2) {
        setActive("home");
      }
    };

    window.addEventListener("scroll", handleScrollTop);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScrollTop);
    };
  }, []);

  useEffect(() => {
    const originalText = "SWITCHER.DEV";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789./";
    
    // Check if device is mobile to reduce animation frequency
    const isMobile = window.innerWidth < 768;
    const intervalTime = isMobile ? 6000 : 4000; // Longer interval on mobile
    
    const scrambleInterval = setInterval(() => {
      // Scramble the text
      let scrambled = "";
      for (let i = 0; i < originalText.length; i++) {
        if (Math.random() > 0.3) {
          scrambled += chars[Math.floor(Math.random() * chars.length)];
        } else {
          scrambled += originalText[i];
        }
      }
      setScrambledText(scrambled);
      
      // Return to original after a short delay
      setTimeout(() => {
        setScrambledText(originalText);
      }, 150);
    }, intervalTime);

    return () => clearInterval(scrambleInterval);
  }, []);

  return (
    <>
      <nav className="fixed top-4 sm:top-6 md:top-10 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-3xl font-mono z-50">
        <div className="px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-4 lg:px-8 lg:py-6 flex justify-between backdrop-blur-sm items-center border border-foreground/10 rounded-full">
          <div className="flex gap-2 sm:gap-3 items-center min-w-0">
            <ThemeToggle />
            <button
              className="text-xs sm:text-sm md:text-base lg:text-lg text-foreground hover:cursor-pointer transition-all font-mono truncate"
              onClick={handleHomeClick}
              aria-label="Home - SWITCHER.DEV"
            >
              <span className="scramble-text">{scrambledText}</span>
            </button>
          </div>

          <div className="hidden md:flex gap-7">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item.toLowerCase())}
                className={`text-xs font-semibold tracking-wide transition-all ${
                  active === item.toLowerCase()
                    ? "text-foreground border-b-2 border-teal-500"
                    : "text-foreground/60 hover:text-foreground"
                }`}
                aria-label={`Navigate to ${item} section`}
                aria-current={active === item.toLowerCase() ? "page" : undefined}
              >
                {item.toUpperCase()}
              </button>
            ))}
          </div>
          <button
            onClick={() => setOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-black/5 transition-colors"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 mt-2 backdrop-blur-sm bg-background/95 border border-foreground/10 rounded-2xl shadow-lg">
            <div className="px-4 py-3 flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    handleNavClick(item.toLowerCase());
                    setOpen(false);
                  }}
                  className={`block w-full text-left text-sm font-semibold tracking-wide py-2 transition-all ${
                    active === item.toLowerCase()
                      ? "text-foreground border-l-2 border-teal-500 pl-3"
                      : "text-foreground/60 hover:text-foreground pl-2"
                  }`}
                  aria-label={`Navigate to ${item} section`}
                  aria-current={active === item.toLowerCase() ? "page" : undefined}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
