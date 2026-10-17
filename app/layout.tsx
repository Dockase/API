import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const jbMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jb-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://developers.dockase.com"),
  title: {
    default: "Dockase API — The Nigerian legal corpus, as an API",
    template: "%s — Dockase API",
  },
  description:
    "Search 13,000+ Nigerian judgments from the AELR corpus, traverse a citation graph, verify citations, and embed legal text — over one REST API.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${jbMono.variable}`}>
      <body className="min-h-screen font-sans antialiased flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
