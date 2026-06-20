import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import PageTransition from "@/components/PageTransition";
import PolkaBackdrop from "@/components/PolkaBackdrop";
import ThemeBulbToggle from "@/components/ThemeBulbToggle";

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
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("grey-promos-theme");if(t==="light"){document.documentElement.classList.remove("dark");document.documentElement.classList.add("light");document.documentElement.dataset.theme="light";}else{document.documentElement.classList.add("dark");document.documentElement.dataset.theme="dark";}}catch(e){}`,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <div className="noise-overlay" />
        <SmoothScroll>
          <div className="relative isolate">
            <PolkaBackdrop />
            <Navbar />
            <ThemeBulbToggle />
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
