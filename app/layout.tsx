import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "DuelGamble Discord Community",
  description: "Join the official DuelGamble Discord community for gaming, tech discussions, and creative arts",
  openGraph: {
    title: "DuelGamble Discord Community",
    description: "Join the official DuelGamble Discord community for gaming, tech discussions, and creative arts",
    url: "https://duelgamble.com/discord",
    siteName: "DuelGamble",
    images: [
      {
        url: "https://duelgamble.com/discord-og-image.jpg", // Create an eye-catching OG image
        width: 1200,
        height: 630,
      }
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body className="DuelGambleBody bg-white text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
