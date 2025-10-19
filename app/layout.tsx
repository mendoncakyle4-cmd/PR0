import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Chorus Bot - Contextual and Conversational ROI",
  description: "AI-powered PR platform connecting fragmented media output to quantifiable business outcomes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
