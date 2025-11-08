"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "./_Navbar";
import Footer from "./Footer";

const quotes = [
  "404: The page you're looking for has left the building.",
  "404: This page is in another castle.",
  "404: The page you seek is not found. It has moved. It is gone.",
  "404: Lost in the digital void. Like tears in rain.",
  "404: The page you're looking for doesn't exist. Or does it?",
  "404: Error 404: Page not found. But hey, you found this message!",
  "404: This page has been deleted, moved, or never existed. Schrödinger's page.",
  "404: The page you seek is beyond the event horizon.",
  "404: Page not found. But don't worry, the algorithm works in mysterious ways.",
  "404: This page is currently on vacation. Try again later. Or never.",
];

const asciiArts = [
  `
    ██████╗ ██████╗ ██████╗ 
    ╚════██╗██╔══██╗██╔══██╗
     █████╔╝██║  ██║██████╔╝
     ╚═══██╗██║  ██║██╔══██╗
    ██████╔╝██████╔╝██████╔╝
    ╚═════╝ ╚═════╝ ╚═════╝ 
  `,
  `
    ╔═══╗╔═══╗╔═══╗
    ║╔═╗║║╔═╗║║╔═╗║
    ║║ ╚╝║║ ║║║║ ╚╝
    ║║ ╔╗║║ ║║║║ ╔╗
    ║╚═╝║║╚═╝║║╚═╝║
    ╚═══╝╚═══╝╚═══╝
  `,
  `
    ██╗  ██╗ ██████╗ ██╗   ██╗███████╗
    ██║  ██║██╔═══██╗██║   ██║██╔════╝
    ███████║██║   ██║██║   ██║█████╗  
    ██╔══██║██║   ██║╚██╗ ██╔╝██╔══╝  
    ██║  ██║╚██████╔╝ ╚████╔╝ ███████╗
    ╚═╝  ╚═╝ ╚═════╝   ╚═══╝  ╚══════╝
  `,
];

export default function NotFound() {
  const [quote, setQuote] = useState("");
  const [asciiArt, setAsciiArt] = useState("");

  useEffect(() => {
    // Random quote
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    // Random ASCII art
    setAsciiArt(asciiArts[Math.floor(Math.random() * asciiArts.length)]);
  }, []);

  return (
    <>
      <div className="flex justify-center">
        <Navbar />
      </div>
      <main className="min-h-screen flex items-center justify-center px-4 py-20 sm:py-24">
        <div className="text-center font-mono max-w-2xl w-full">
          <div className="mb-6 sm:mb-8">
            <div className="text-green-500 text-[10px] sm:text-xs md:text-sm mb-3 sm:mb-4 font-mono whitespace-pre overflow-x-auto">
              {asciiArt}
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-foreground mb-3 sm:mb-4 animate-pulse">
              404
            </h1>
            <div className="w-32 h-1 bg-green-500 mx-auto mb-6"></div>
          </div>
          
          <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
              PAGE NOT FOUND
            </p>
            <p className="text-xs sm:text-sm md:text-base text-foreground/70">
              <span className="text-green-500">&gt;</span> Error: File not found
            </p>
            <p className="text-xs sm:text-xs md:text-sm text-foreground/60 leading-relaxed italic px-2">
              {quote}
            </p>
            <p className="text-xs sm:text-xs md:text-sm text-foreground/60 leading-relaxed px-2">
              Looks like you&apos;ve wandered into the void. This page doesn&apos;t exist,
              or maybe it never did. The algorithm works in mysterious ways.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full">
            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-2.5 sm:py-3 bg-foreground text-background font-semibold text-xs sm:text-sm hover:bg-foreground/70 transition-colors duration-150 rounded-3xl"
              aria-label="Return to home page"
            >
              RETURN HOME
            </Link>
            <Link
              href="/timeline"
              className="w-full sm:w-auto px-6 py-2.5 sm:py-3 bg-background text-foreground border-2 border-foreground font-semibold text-xs sm:text-sm hover:bg-foreground hover:text-background transition-colors duration-150 rounded-3xl"
              aria-label="View timeline"
            >
              VIEW TIMELINE
            </Link>
          </div>

          <div className="mt-12 text-xs text-foreground/50">
            <p>💡 Tip: Press &apos;H&apos; to go home, &apos;T&apos; for timeline</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
