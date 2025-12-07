"use client";
import { Copy, Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { XIcon } from "@/components/XIcon";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const contactItems = [
    {
      icon: Mail,
      label: "EMAIL",
      value: "bigkingayuba@gmail.com",
      copyable: true,
    },
    {
      icon: Phone,
      label: "PHONE",
      value: "+ 234 (0) 902 934 7885",
      copyable: true,
    },
    {
      icon: MapPin,
      label: "LOCATION",
      value: "localhost:404",
      copyable: false,
    },
  ];

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied to clipboard!`, {
        duration: 2000,
      });
    } catch (err) {
      toast.error("Failed to copy to clipboard", {
        duration: 2000,
      });
    }
  };

  const socialLinks = [
    { icon: Github, label: "Github", url: "https://github.com/SWITCHER-X" },
    { icon: Mail, label: "Mail", url: "mailto:bigkingayuba@gmail.com" },
    { icon: XIcon, label: "X", url: "https://x.com/switcher_x_" },
    { icon: WhatsAppIcon, label: "WhatsApp", url: "http://wa.me/2349029347885" },
  ];

  return (
    <section
      ref={sectionRef}
      className={`mx-auto max-w-7xl px-4 py-16 sm:px-8 sm:py-20 fade-in-up ${isVisible ? "visible" : ""}`}
      id="contact"
    >
      <div className="mb-8 text-center sm:mb-10">
        <h1 className="mb-4 font-mono text-3xl font-bold sm:text-5xl">
          CONTACT
        </h1>
        <div className="w-16 md:w-24 h-1 bg-green-500 mx-auto mb-6 md:mb-8"></div>
        <p className="mx-auto max-w-2xl font-mono text-xs text-foreground/60 sm:text-sm">
          Got an idea in mind? Let's collaborate and build something remarkable.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="flex flex-col justify-between h-full space-y-6 sm:space-y-8">
          <div>
            <h2 className="mb-4 font-mono text-base font-bold sm:mb-6 sm:text-lg">
              GET IN TOUCH
            </h2>
            <div className="space-y-3 sm:space-y-4">
              {contactItems.map(({ icon: Icon, label, value, copyable }) => (
                <div
                  key={label}
                  className="flex gap-2 sm:gap-3 border border-foreground/30 p-3 sm:p-4 rounded-2xl focus-within:ring-2 focus-within:ring-foreground/20 transition group"
                  tabIndex={0}
                  role="group"
                  aria-label={`${label}: ${value}`}
                >
                  <Icon className="h-5 w-5 shrink-0 text-foreground/90 sm:h-6 sm:w-6" aria-hidden="true" />
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-xs text-foreground/60 uppercase">
                      {label}
                    </p>
                    <p className="break-all sm:truncate font-mono text-xs sm:text-sm">
                      {value}
                    </p>
                  </div>
                  {copyable && (
                    <button
                      onClick={() => copyToClipboard(value, label)}
                      className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity p-2 hover:bg-foreground/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground/20 shrink-0"
                      aria-label={`Copy ${label}`}
                      title={`Copy ${label}`}
                    >
                      <Copy className="h-4 w-4 text-foreground/60" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              {socialLinks.map(({ url, label, icon: Icon }, i) => (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  key={i}
                  href={url}
                  className="border border-foreground/30 p-3 rounded-full hover:border-foreground transition"
                  aria-label={label}
                >
                  <span className="text-sm text-foreground/60">
                    <Icon />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
