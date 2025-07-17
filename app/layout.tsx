import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Freelanzo - Tableau de bord",
  description: "App SaaS pour freelances",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body
        className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          font-sans 
          antialiased 
          bg-gradient-to-b from-[#fa7b64] via-[#ffb199] to-[#ffd4d4] 
          text-black 
          min-h-screen 
          w-full
        `}
      >
        {children}
      </body>
    </html>
  );
}
