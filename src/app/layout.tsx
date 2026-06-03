import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import PageTransition from "@/components/PageTransition";
import PolkaBackdrop from "@/components/PolkaBackdrop";

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
          <div className="relative isolate">
            <PolkaBackdrop />
            <Navbar />
            <main className="relative z-10 min-h-screen">
              <PageTransition>
                {children}
              </PageTransition>
            </main>
            <div className="relative z-10">
              <Footer />
            </div>
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
