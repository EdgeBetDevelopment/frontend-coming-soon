import type { Metadata } from "next";
import "./globals.css";
import { Outfit, Manrope } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const metadata: Metadata = {
  title: "EdgeBet Coming soon",
  description: "EdgeBet Coming soon",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${manrope.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
