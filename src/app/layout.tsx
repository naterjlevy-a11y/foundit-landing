import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Found It! — Natural-language file search for Mac",
  description: "Find any file on your Mac by describing it. AI-powered file search that lives in your menu bar. Free to start.",
  icons: {
    icon: "/assets/favicon.svg",
    shortcut: "/assets/favicon.svg",
  },
  openGraph: {
    title: "Found It! — Find any file on your Mac by describing it",
    description: "AI-powered file search for macOS. Lives in your menu bar. Finds everything.",
    url: "https://found-it.me",
    siteName: "Found It!",
    images: [{ url: "https://found-it.me/assets/app-search.png" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Found It! — Find any file on your Mac by describing it",
    description: "AI-powered file search for macOS. Lives in your menu bar. Finds everything.",
    images: ["https://found-it.me/assets/app-search.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
