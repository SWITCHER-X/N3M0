import { ThemeProvider } from "@/lib/theme-provider";
import { KeyboardShortcutsProvider } from "@/components/KeyboardShortcutsProvider";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SWITCHER | Cybersecurity Specialist & Tech Enthusiast",
  description: "SWITCHER (SWITCHER_X, switched, Ayuba Medugu) - Cybersecurity specialist, Python Developer, and Offsec Expert. Specializing in Hard/Software Tweaking, pentesting, network security, and building automation scripts. Available for projects.",
  keywords: [
    "Switcher",
    "Switcher_X",
    "Exman",
    "Exman X",
    "X Man",
    "Ayuba Medugu",
    "cybersecurity specialist",
    "Offensive Security",
    "pentesting",
    "network security",
    "React developer",
    "Python developer",
    "information security",
    "security operations center",
    "ethical hacking",
    "cyber security",
    "information security analyst",
    "network security engineer",
    "Hardware Tweaker",
    "switcher dev",
    "switcher.dev",
    "Exman Ex",
    "Software Tweaker",
  ],
  authors: [{ name: "Ayuba Medugu", url: "https://switcher.dev" }],
  creator: "Ayuba Medugu",
  publisher: "Switcher_X",
  alternates: {
    canonical: "https://switcher.dev",
  },
  openGraph: {
    title: "Switcher | Cybersecurity Specialist & Tech Enthusiast",
  description: "SWITCHER (SWITCHER_X, switched, Ayuba Medugu) - Cybersecurity specialist, Python Developer, and Offsec Expert. Specializing in Hard/Software Tweaking, pentesting, network security, and building automation scripts. Available for projects.",
    url: "https://switcher.dev",
    siteName: "switcher.DEV",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://switcher.dev/og-image.png",
        width: 1200,
        height: 630,
        alt: "Switcher - Cybersecurity Specialist & Tech Enthusiast",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Switcher | Cybersecurity Specialist & Tech Enthusiast",
      description: "SWITCHER (SWITCHER_X, switched, Ayuba Medugu) - Cybersecurity specialist, Python Developer, and Offsec Expert. Specializing in Hard/Software Tweaking, pentesting, network security, and building automation scripts. Available for projects.",
    creator: "@switcher_x_",
    site: "@switcher_x_",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: undefined, // Add Google Search Console verification code if available
  },
  category: "Technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ayuba Medugu",
    alternateName: ["Switcher", "Switcher_X", "exman ", "Xman", "Exman Ex", "switcher_x_"],
    jobTitle: "Cybersecurity Specialist & Tech Enthusiast",
      description: "SWITCHER (SWITCHER_X, switched, Ayuba Medugu) - Cybersecurity specialist, Python Developer, and Offsec Expert. Specializing in Hard/Software Tweaking, pentesting, network security, and building automation scripts. Available for projects.",
    url: "https://Switcher.dev",
    sameAs: [
      "https://github.com/SWITCHER-X",
      "https://x.com/switcher_x_",
    ],
    email: "bigkingayuba@gmail",
    telephone: "+2349029347885",
    address: {
      "@type": "PostalAddress",
      addressLocality: "localhost:404",
      addressRegion: "Digital",
      addressCountry: "WWW",
    },
    knowsAbout: [
      "Cybersecurity",
      "OSINT",
      "Hardware Tweaking",
      "Pentesting",
      "Network Security",
      "Web Development",
      "Python",
      "React",
      "Rust",
      "Ethical Hacking",
      "Information Security",
      "Software Tweaking",
    ],
    alumniOf: {
      "@type": "Organization",
      name: "SWITCHERS",
    },
    worksFor: {
      "@type": "Organization",
      name: "Freelance",
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <KeyboardShortcutsProvider>
            {children}
            <Toaster
              richColors
              position="bottom-right"
              toastOptions={{
                classNames: {
                  toast:
                    "rounded-2xl shadow-md border text-sm font-mono bg-background",
                  success: "bg-green-100 border-green-500 text-green-800",
                  error: "bg-red-100 border-red-500 text-red-800",
                },
              }}
            />
          </KeyboardShortcutsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
