import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rotvex - Gestão Logística",
  description: "Plataforma SaaS de gerenciamento logístico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
