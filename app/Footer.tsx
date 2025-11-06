import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

const quickLinks = [
  { href: "#home", label: "HOME" },
  { href: "#about", label: "ABOUT" },
  { href: "#experience", label: "EXPERIENCE" },
  { href: "#projects", label: "PROJECTS" },
  { href: "#contact", label: "CONTACT" },
];

const socialLinks = [
  { icon: Github, label: "GITHUB", url: "#" },
  { icon: Linkedin, label: "LINKEDIN", url: "#" },
  { icon: Twitter, label: "TWITTER", url: "#" },
];

const Footer = () => {
  return (
    <footer className="relative font-mono">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      ></div>
      <div className="bg-black text-white border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12">
            {/* About */}
            <div>
              <h3 className="font-bold text-lg pb-4 tracking-wide">
                ABSTERR.DEV
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Full-stack developer passionate about creating digital
                experiences that bridge creativity and functionality.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-xs tracking-widest pb-4 text-gray-300">
                QUICK LINKS
              </h3>
              <div className="space-y-2 font-mono text-sm">
                {quickLinks.map(({ href, label }) => (
                  <Link
                    key={label}
                    href={href}
                    className="text-gray-400 hover:text-white transition block"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Connect */}
            <div>
              <h3 className="font-semibold text-xs tracking-widest mb-4 text-gray-300">
                CONNECT
              </h3>
              <div className="flex gap-3 mb-4">
                {socialLinks.map(({ url, icon: Icon }, i) => (
                  <Link
                    key={i}
                    href={url}
                    className="border border-gray-500 p-3 rounded-full hover:border-white transition"
                  >
                    <span className="text-sm text-gray-400">
                      <Icon />
                    </span>
                  </Link>
                ))}
              </div>
              <p className="text-sm text-gray-400">absterr.dev@gmail.com</p>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 flex justify-between items-center">
            <p className="text-xs text-gray-500">
              © 2025 ABSTERR.DEV - ALL RIGHTS RESERVED
            </p>
            <a
              href="#home"
              className="border border-gray-500 p-2.5  hover:border-white transition rounded-full"
            >
              <span className="text-white">↑</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
