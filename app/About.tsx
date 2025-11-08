"use client";
import { Shield, Code2, Network, Users } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const About = () => {
  const statusRef = useRef<HTMLSpanElement>(null);
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

  useEffect(() => {
    if (statusRef.current) {
      const interval = setInterval(() => {
        statusRef.current?.classList.toggle("status-flicker");
        setTimeout(() => {
          statusRef.current?.classList.toggle("status-flicker");
        }, 150);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, []);

  const skills = [
    {
      icon: Shield,
      title: "CYBERSECURITY",
      tech: "OSINT, SOC, Pentesting, Network Security, Info Sec",
      description: "Securing systems through offensive and defensive security practices",
    },
    {
      icon: Code2,
      title: "WEB DEVELOPMENT",
      tech: "HTML, CSS, React, Python, Flutter",
      description: "Building responsive web applications and mobile experiences",
    },
    {
      icon: Network,
      title: "NETWORKING",
      tech: "NOC Operations, Network Security, Infrastructure",
      description: "Network operations and security with hands-on NOC experience",
    },
    {
      icon: Users,
      title: "PROJECT MANAGEMENT",
      tech: "Project Lead, Team Coordination, Technical Leadership",
      description: "Leading technical projects and managing cross-functional teams",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className={`max-w-7xl mx-auto px-4 py-16 lg:py-20 pb-8 font-mono fade-in-up ${isVisible ? "visible" : ""}`}
      id="about"
    >
      <div className="text-center mb-8 md:mb-10">
        <h1 className="text-3xl md:text-5xl font-bold tracking-wider mb-4">
          ABOUT
        </h1>
        <div className="w-16 md:w-24 h-1 bg-green-500 mx-auto mb-6 md:mb-8"></div>
        <p className="text-xs md:text-sm leading-relaxed max-w-2xl mx-auto text-foreground/70 px-2">
          I&apos;m a cybersecurity specialist and tech enthusiast driven by information
          and technology. What started as a curiosity for creating and understanding
          how things work—and how they can be broken—has grown into a passion for
          securing systems, building applications, and leading projects. Every solution
          I craft is intentional, whether it&apos;s protecting networks, developing
          secure applications, or managing complex technical initiatives.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-4 md:gap-6 mb-8 md:mb-10">
        {skills.map(({ icon: Icon, title, description, tech }, i) => (
          <div
            className="border border-foreground/30 p-4 sm:p-5 md:p-6 text-center rounded-3xl"
            key={i}
          >
            <div className="text-xl sm:text-2xl md:text-3xl font-mono mb-3 text-foreground/80 flex justify-center">
              <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
            </div>
            <h3 className="font-bold text-xs sm:text-xs md:text-sm mb-2 tracking-wider">
              {title}
            </h3>
            <p className="text-xs sm:text-xs text-foreground/60 mb-3 leading-relaxed">{tech}</p>
            <p className="text-xs sm:text-xs text-foreground/60 leading-relaxed">
              {description}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-foreground text-background rounded-3xl p-4 md:p-6 max-w-2xl mx-auto">
        <p className="font-mono text-xs md:text-sm mb-3">
          <span className="text-green-500">&gt;</span> CURRENT STATUS:{" "}
          <span ref={statusRef} className="text-green-500 font-bold status-pulse" aria-label="Current status: Resting">
            RESTING
          </span>
        </p>
        <p className="font-mono text-xs md:text-sm text-background/50">
          Which usually means I broke something just to fix it later
        </p>
      </div>
    </section>
  );
};

export default About;
