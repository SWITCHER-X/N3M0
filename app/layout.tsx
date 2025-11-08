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
  title: "Bosco | Cybersecurity Specialist & Tech Enthusiast",
  description: "Bosco (Bosco404, Error404, Clinton Omotoyinbo) - Cybersecurity specialist, OSINT expert, and full-stack developer. Specializing in SOC operations, pentesting, network security, and building secure applications. Available for projects.",
  keywords: [
    "Bosco",
    "Bosco404",
    "bosco404",
    "Error404",
    "error404",
    "Clinton Omotoyinbo",
    "Clinton Omotoiynbo",
    "cybersecurity specialist",
    "OSINT expert",
    "pentesting",
    "network security",
    "web development",
    "React developer",
    "Python developer",
    "Flutter developer",
    "NOC engineer",
    "information security",
    "SOC operations",
    "security operations center",
    "ethical hacking",
    "cyber security",
    "information security analyst",
    "network security engineer",
    "full stack developer",
    "bosco dev",
    "bosco.dev",
    "3rr0r_404exe",
    "bosco404exe",
  ],
  authors: [{ name: "Clinton Omotoyinbo", url: "https://bosco.dev" }],
  creator: "Clinton Omotoyinbo",
  publisher: "Bosco",
  alternates: {
    canonical: "https://bosco.dev",
  },
  openGraph: {
    title: "Bosco | Cybersecurity Specialist & Tech Enthusiast",
    description: "Bosco (Bosco404, Error404, Clinton Omotoyinbo) - Cybersecurity specialist, OSINT expert, and full-stack developer. Specializing in SOC operations, pentesting, network security, and building secure applications.",
    url: "https://bosco.dev",
    siteName: "BOSCO.DEV",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://bosco.dev/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bosco - Cybersecurity Specialist & Tech Enthusiast",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bosco | Cybersecurity Specialist & Tech Enthusiast",
    description: "Bosco (Bosco404, Error404, Clinton Omotoyinbo) - Cybersecurity specialist, OSINT expert, and full-stack developer.",
    creator: "@3rr0r_404exe",
    site: "@3rr0r_404exe",
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
    name: "Clinton Omotoyinbo",
    alternateName: ["Bosco", "Bosco404", "Error404", "bosco404", "error404", "3rr0r_404exe"],
    jobTitle: "Cybersecurity Specialist & Tech Enthusiast",
    description: "Bosco (Bosco404, Error404, Clinton Omotoyinbo) - Cybersecurity specialist, OSINT expert, and full-stack developer specializing in SOC operations, pentesting, and network security.",
    url: "https://bosco.dev",
    sameAs: [
      "https://github.com/bosco404exe",
      "https://x.com/3rr0r_404exe",
      "https://linkedin.com/in/clinton-omotoiynbo",
    ],
    email: "omotoyinbokryptonclinton@gmail.com",
    telephone: "+2348109137660",
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
      "Ethical Hacking",
      "Information Security",
      "Network Security Engineering",
      "Security Operations Center",
    ],
    alumniOf: {
      "@type": "Organization",
      name: "Verse Telecoms",
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
