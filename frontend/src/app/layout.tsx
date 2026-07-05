import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";

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
      <body>
        <div className="flex h-screen bg-gray-50">
          <Sidebar />
          <div className="ml-64 flex flex-1 flex-col">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
