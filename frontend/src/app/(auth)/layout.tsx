import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rotvex - Login",
  description: "Acesse sua conta",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
}
