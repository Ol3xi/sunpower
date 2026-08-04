import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/layout/Navbar"; // Aggiungi questo import
import { ContactModalProvider } from "./components/ui/ContactModalProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Photonclean Systems",
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
        <ContactModalProvider>
          {/* La Navbar ora apparirà su ogni pagina del sito */}
          <Navbar />
          {children}
        </ContactModalProvider>
      </body>
    </html>
  );
}
