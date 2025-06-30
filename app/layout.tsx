import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import Provider from "@/components/layout/provider";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Manajemen Artikel",
    template: "%s | Manajemen Artikel",
  },
  description: "Manajemen Artikel untuk Seller Pintar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${archivo.variable} antialiased`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
