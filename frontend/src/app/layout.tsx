import type { Metadata } from "next";
import "./globals.css";
import { AppSidebar } from "@/components/layout/AppSidebar";

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
          <AppSidebar />
          <div className="ml-64 flex flex-1 flex-col">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
