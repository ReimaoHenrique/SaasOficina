import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { MainNav } from "@/components/main-nav";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: "Oficina Pro - Gestão de Oficina Mecânica",
  description: "Sistema de gestão para oficinas mecânicas com registro fotográfico de veículos",
  keywords: ["oficina", "mecânica", "gestão", "veículos", "manutenção"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geist.variable} font-sans`}>
        <MainNav />
        <main className="pt-16 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
