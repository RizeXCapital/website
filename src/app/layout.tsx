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
    default: "Sovereign RCM | Your Billing. Your Building. Your Data.",
    template: "%s | Sovereign RCM",
  },
  description:
    "Sovereign RCM is an on-premise AI billing appliance for medical practices. Your billing stays in your building. Princeton, NJ.",
  keywords: [
    "AI medical billing",
    "on-premise medical billing AI",
    "Sovereign RCM",
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
            __html: `(function(){try{var c=document.cookie.match(/(?:^|;)\\s*theme=(\\w+)/);var t=c?c[1]:null;if(t==='dark'){document.documentElement.classList.add('dark')}}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Sovereign RCM",
              url: "https://rizexcapital.vercel.app",
              logo: "https://rizexcapital.vercel.app/logo.png",
              description:
                "Sovereign RCM is an on-premise AI billing appliance for medical practices. Your billing stays in your building.",
              foundingLocation: {
                "@type": "Place",
                name: "Princeton, NJ",
              },
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "sales",
                url: "https://rizexcapital.vercel.app/contact",
              },
            }),
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
