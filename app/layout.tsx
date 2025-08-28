import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CheckerIst | Verify Hotels & Restaurants Before You Travel",
  description: "Book with confidence! CheckerIst connects you with professional local checkers who physically verify hotels and restaurants before you book. No surprises—just safe, verified stays.",
  icons:{
    icon: [
      {
        url:"/img/logo1.png",
        href:"/img/logo1.png",
        sizes: "32x32" 
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <head>
      <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Checkerist" />
          <meta property="og:title" content="CheckerIst | Verify Hotels & Restaurants Before You Travel" />
          <meta
            property="og:description"
            content="Book with confidence! CheckerIst connects you with professional local checkers who physically verify hotels and restaurants before you book. No surprises—just safe, verified stays."
          />
          <meta
            property="og:image"
            content="https://www.checkerist.com/logo-2.png" // Replace with your default image URL
          />
          <meta property="og:url" content="https://www.checkerist.com" />
          <link rel="canonical" href="https://www.checkerist.com/" />
        
        <Script
         id=""
         type="application/ld+json"
         dangerouslySetInnerHTML={{
           __html: JSON.stringify({
             "@context": "https://schema.org",
             "@type": "WebSite",
             "name": "Checkerist",
             "alternateName": ["Checkerist", "Checkerist"],
             "url": "https://www.checkerist.com/",
           }),
         }}
        />
      </head>
        <main>
        {children}
        </main>
      </body>
    </html>
  );
}
