import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header"; // Import Header
import Footer from "@/components/Footer"; // Import Footer
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
  title: "Portfolio Name - Fullstack Developer",
  description: "Creative Fullstack Developer Portfolio",
  icons: {
    icon: '/favicon.ico', // Add favicon link
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning> {/* Add suppressHydrationWarning for potential Three.js issues */}
      <head /> {/* Next.js handles head elements */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <Header /> {/* Add Header */}
        <main className="flex-grow">{children}</main> {/* Wrap content in main */}
        <Footer /> {/* Add Footer */}
      </body>
    </html>
  );
}
