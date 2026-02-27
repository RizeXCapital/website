import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import MobileCTA from "@/components/MobileCTA";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "RizeX Capital | Where Alignment Becomes Power",
    template: "%s | RizeX Capital",
  },
  description:
    "RizeX Capital is a disciplined AI product company. Our flagship, Sovereign RCM, is an on-premise AI billing appliance for medical practices. Princeton, NJ.",
  keywords: [
    "AI medical billing",
    "on-premise medical billing AI",
    "Sovereign RCM",
    "RizeX Capital",
    "Princeton NJ",
    "HIPAA compliant AI",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var c=document.cookie.match(/(?:^|;)\\s*theme=(\\w+)/);var t=c?c[1]:null;if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} antialiased`}
      >
        <ScrollProgress />
        <Navigation />
        <main>{children}</main>
        <Footer />
        <BackToTop />
        <MobileCTA />
      </body>
    </html>
  );
}
