import { AppHeader } from "./AppHeader";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-gray-50 to-primary-50/30">
      <AppHeader />
      <main className="flex-1 overflow-y-auto p-6 animate-fade-in">{children}</main>
    </div>
  );
}
