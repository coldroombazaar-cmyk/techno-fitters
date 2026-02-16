import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: "TechnoFitters | Precision Engineered Cold Chain Solutions",
  description: "End-to-end industrial cold storage manufacturing, modular cold rooms, and turnkey refrigeration infrastructure by TechnoFitters.",
  keywords: ["cold room", "modular cold storage", "industrial refrigeration", "thermal engineering", "cold storage solutions", "TechnoFitters"],
  icons: {
    icon: '/TechnoFitters.png',
  },
  openGraph: {
    title: "TechnoFitters | Engineering Reliable Cold",
    description: "Industrial-grade modular cold storage solutions and turnkey refrigeration infrastructure.",
    type: "website",
    siteName: "TechnoFitters",
    images: [{ url: '/TechnoFitters.png' }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "TechnoFitters",
  "image": "https://technofitters.com/TechnoFitters.png",
  "description": "End-to-end industrial cold storage manufacturing, modular cold rooms, and turnkey refrigeration infrastructure.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "H-58, Tetutala Road, Molla Para, PO - Kajipara, Madhyamgram",
    "addressLocality": "Kolkata",
    "addressRegion": "West Bengal",
    "postalCode": "700125",
    "addressCountry": "IN"
  },
  "telephone": "+917860000929",
  "email": "info@technofitters.in",
  "url": "https://technofitters.com",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ],
    "opens": "09:00",
    "closes": "18:00"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="smooth-scroll">
      <body className="antialiased bg-background text-foreground selection:bg-brand-green selection:text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
