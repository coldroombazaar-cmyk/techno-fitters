import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Modular Cold Room | Precision Engineered Cold Storage",
  description: "Experience precision-engineered modular cold storage solutions. Industrial-grade thermal integrity, modular architecture, and controlled environment systems.",
  keywords: ["cold room", "modular cold storage", "industrial refrigeration", "thermal engineering", "cold storage solutions"],
  openGraph: {
    title: "Modular Cold Room | Precision Engineered",
    description: "Industrial-grade modular cold storage solutions",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="smooth-scroll">
      <body className="antialiased">{children}</body>
    </html>
  );
}
