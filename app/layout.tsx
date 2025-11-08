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
  title: "Clinton Omotoiynbo | Cybersecurity Specialist & Tech Enthusiast",
  description: "Cybersecurity specialist, OSINT expert, and full-stack developer. Specializing in SOC operations, pentesting, network security, and building secure applications. Available for projects.",
  keywords: ["cybersecurity", "OSINT", "pentesting", "network security", "web development", "React", "Python", "Flutter", "NOC", "information security"],
  authors: [{ name: "Clinton Omotoiynbo" }],
  creator: "Clinton Omotoiynbo",
  openGraph: {
    title: "Clinton Omotoiynbo | Cybersecurity Specialist & Tech Enthusiast",
    description: "Cybersecurity specialist, OSINT expert, and full-stack developer. Specializing in SOC operations, pentesting, network security, and building secure applications.",
    url: "https://bosco.dev",
    siteName: "BOSCO.DEV",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://bosco.dev/og-image.png",
        width: 1200,
        height: 630,
        alt: "Clinton Omotoiynbo - Cybersecurity Specialist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clinton Omotoiynbo | Cybersecurity Specialist",
    description: "Cybersecurity specialist, OSINT expert, and full-stack developer.",
    creator: "@3rr0r_404exe",
  },
  robots: {
    index: true,
    follow: true,
  },
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
    name: "Clinton Omotoiynbo",
    jobTitle: "Cybersecurity Specialist & Tech Enthusiast",
    description: "Cybersecurity specialist, OSINT expert, and full-stack developer specializing in SOC operations, pentesting, and network security.",
    url: "https://bosco.dev",
    sameAs: [
      "https://github.com/bosco404exe",
      "https://x.com/3rr0r_404exe",
    ],
    email: "omotoyinbokryptonclinton@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "localhost:404",
      addressRegion: "Digital",
      addressCountry: "WWW",
    },
    knowsAbout: [
      "Cybersecurity",
      "OSINT",
      "SOC Operations",
      "Pentesting",
      "Network Security",
      "Web Development",
      "Python",
      "React",
      "Flutter",
    ],
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
