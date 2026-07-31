import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/layout/Navbar"; // Aggiungi questo import

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Il tuo sito fotovoltaico",
  description: "Installazione pannelli fotovoltaici e sistemi di accumulo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className={inter.className}>
        {/* La Navbar ora apparirà su ogni pagina del sito */}
        <Navbar />
        {children}
      </body>
    </html>
  );
}