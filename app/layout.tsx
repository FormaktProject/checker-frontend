import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

import { Inter } from 'next/font/google';

// ✅ Optimize font loading
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // ⭐ Critical for performance
  preload: true,
  variable: '--font-inter',
});
export const metadata: Metadata = {
  title: "Is Airbnb Legit? Verified Rentals by Local Experts | CheckerIst",
  description: "Avoid rental scams! Get your Airbnb or vacation rental verified by local experts before you book. Safe, secure, and trusted by travelers worldwide.",
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
        className={inter.variable}
      >
        <head>
           <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "vj33hh37w1");
            `,
          }}
        />
      <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Checkerist" />
        <meta property="og:title" content="Verify Before You Travel — CheckerIst"/>

        <meta property="og:description" content="Get properties verified by trusted local inspectors. Avoid rental scams — book a verification before you arrive."/>

          <meta
            property="og:image"
            content="https://www.checkerist.com/logo-2.png"
             // Replace with your default image URL
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
