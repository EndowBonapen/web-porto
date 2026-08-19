import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { profile, siteUrl, stack } from "@/content/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pageTitle = `${profile.fullName} — ${profile.role}`;

export const metadata: Metadata = {
  // Required for OG/canonical URLs to resolve to absolute paths.
  metadataBase: new URL(siteUrl),
  title: {
    default: pageTitle,
    template: `%s — ${profile.fullName}`,
  },
  description: profile.intro,
  // Derived from the stack, so it can never drift out of sync with the page.
  keywords: [profile.role, ...stack.flatMap((group) => group.items)],
  authors: [{ name: profile.fullName, url: siteUrl }],
  creator: profile.fullName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: profile.fullName,
    title: pageTitle,
    description: profile.intro,
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: profile.intro,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

// Dark is the site default regardless of OS preference, so browser chrome
// should match it rather than following prefers-color-scheme.
export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

// Runs before first paint so the page never flashes the wrong theme.
// Dark is the default; only an explicit saved choice overrides it.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");document.documentElement.setAttribute("data-theme",t==="light"?"light":"dark")}catch(e){document.documentElement.setAttribute("data-theme","dark")}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      {/* Site chrome (nav, progress bar, background) lives in the page, not
          here — /preview renders its own backgrounds and must not inherit. */}
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
