import { AppSidebar } from "@/components/layout/AppSidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen bg-gray-50">
      <AppSidebar />
      <div className="ml-64 flex flex-1 flex-col">
        {children}
      </div>
    </div>
  );
}
