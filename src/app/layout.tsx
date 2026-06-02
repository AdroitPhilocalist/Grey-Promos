import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import PageTransition from "@/components/PageTransition";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Grey Promos India Pvt. Ltd. | Branding, Events, Activations & Marketing Agency",
  description: "Grey Promos India Pvt. Ltd. creates extraordinary brand experiences through retail branding, corporate events, exhibitions, activations, roadshows, mobile van campaigns, hoardings, and creative production across India.",
  keywords: "Grey Promos, branding agency India, event activation agency, retail branding, exhibition stall fabrication, mobile van advertising, LED van campaign, mall branding, corporate events, roadshows, hoardings, Kolkata marketing agency",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased bg-background text-foreground`}
      >
        <div className="noise-overlay" />
        <SmoothScroll>
          <div className="relative">
            {/* Ambient Background Elements */}
            <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
              <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent/[0.02] rounded-full blur-[120px]" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/[0.01] rounded-full blur-[120px]" />
              <div className="absolute top-[30%] right-[10%] w-[30%] h-[30%] bg-accent/[0.01] rounded-full blur-[100px]" />
            </div>
            
            <Navbar />
            <main className="min-h-screen">
              <PageTransition>
                {children}
              </PageTransition>
            </main>
            <Footer />
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
