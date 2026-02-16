import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Using Inter for assured sans-serif
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-main-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Daniel França | Arquitetura",
  description: "Escritório de arquitetura minimalista e sofisticado.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.variable}`}>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
