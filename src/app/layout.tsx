import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { MainNav } from "@/components/main-nav";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: {
    default: "SaaS Oficina - Gestão de Oficina Mecânica",
    template: "%s | SaaS Oficina"
  },
  description: "Sistema de gestão para oficinas mecânicas com registro fotográfico de veículos e acompanhamento de serviços",
  keywords: ["oficina", "mecânica", "gestão", "veículos", "manutenção", "serviços automotivos"],
  authors: [{ name: "SaaS Oficina" }],
  creator: "SaaS Oficina",
  publisher: "SaaS Oficina",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://saasoficina.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: '/',
    title: 'SaaS Oficina - Gestão de Oficina Mecânica',
    description: 'Sistema completo de gestão para oficinas mecânicas com registro fotográfico de veículos',
    siteName: 'SaaS Oficina',
    images: [
      {
        url: '/vercel.svg',
        width: 1200,
        height: 630,
        alt: 'SaaS Oficina - Gestão de Oficina Mecânica',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SaaS Oficina - Gestão de Oficina Mecânica',
    description: 'Sistema de gestão para oficinas mecânicas com registro fotográfico de veículos',
    images: ['/vercel.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
