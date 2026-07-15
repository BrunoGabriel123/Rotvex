"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  Truck,
  MapPin,
  Route,
  Users,
  Building2,
  DollarSign,
  BarChart3,
  Settings,
  ClipboardList,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Operações", href: "/operacoes", icon: ClipboardList },
  { name: "Pedidos", href: "/pedidos", icon: Package },
  { name: "Entregas", href: "/entregas", icon: Truck },
  { name: "Coletas", href: "/coletas", icon: MapPin },
  { name: "Rotas", href: "/rotas", icon: Route },
  { name: "Frota", href: "/frota", icon: Truck },
  { name: "Motoristas", href: "/motoristas", icon: Users },
  { name: "Clientes", href: "/clientes", icon: Building2 },
  { name: "Custos", href: "/custos", icon: DollarSign },
  { name: "Relatórios", href: "/relatorios", icon: BarChart3 },
  { name: "Configurações", href: "/configuracoes", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-gray-200 bg-white animate-slide-in-left">
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center border-b border-gray-200 px-6 bg-gradient-to-r from-primary-900 to-primary-800">
          <h1 className="text-xl font-bold text-white">Rotvex</h1>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {navigation.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 hover:scale-[1.02]",
                      isActive
                        ? "bg-primary-50 text-primary-700 shadow-sm"
                        : "text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                    )}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <item.icon className="h-5 w-5 transition-all duration-200" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
