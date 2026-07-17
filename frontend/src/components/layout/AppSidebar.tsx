"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bell,
  Building2,
  CalendarClock,
  Car,
  Coins,
  DollarSign,
  Factory,
  FileSearch,
  Gauge,
  IdCard,
  MapPin,
  Package,
  Route,
  Settings,
  Shield,
  Shuffle,
  Tags,
  Truck,
  UserRound,
  Users,
  Wrench,
} from "lucide-react";

type NavItem = {
  name: string;
  icon: LucideIcon;
  href?: string;
  description?: string;
  disabled?: boolean;
  badge?: string;
  matchPrefix?: boolean;
};

type NavSection = {
  id: "operation" | "management" | "cadastros" | "admin";
  title: string;
  description: string;
  variant: "primary" | "default" | "muted";
  items: NavItem[];
};

const navigationSections: NavSection[] = [
  {
    id: "operation",
    title: "Operação",
    description: "Execução em tempo real",
    variant: "primary",
    items: [
      {
        name: "Central de Operações",
        href: "/operacoes",
        icon: Gauge,
        description: "Fluxo do dia",
        matchPrefix: true,
      },
      {
        name: "Planejamento",
        icon: CalendarClock,
        description: "Sequenciamento diário",
        disabled: true,
        badge: "Em breve",
      },
      {
        name: "Pedidos",
        href: "/pedidos",
        icon: Package,
        description: "Demandas abertas",
      },
      {
        name: "Rotas",
        href: "/rotas",
        icon: Route,
        description: "Malha ativa",
      },
      {
        name: "Coletas e Entregas",
        href: "/entregas",
        icon: Shuffle,
        description: "Execução em campo",
        matchPrefix: true,
      },
      {
        name: "Ocorrências",
        icon: AlertTriangle,
        description: "Tratativas críticas",
        disabled: true,
        badge: "Em breve",
      },
    ],
  },
  {
    id: "management",
    title: "Gestão",
    description: "Indicadores e rentabilidade",
    variant: "default",
    items: [
      {
        name: "Dashboard",
        href: "/",
        icon: Activity,
        description: "Visão gerencial",
      },
      {
        name: "Custos e Rentabilidade",
        href: "/custos",
        icon: DollarSign,
        description: "Margens e despesas",
      },
      {
        name: "Frota",
        href: "/frota",
        icon: Truck,
        description: "Saúde dos ativos",
      },
      {
        name: "Manutenção",
        icon: Wrench,
        description: "Oficinas e pendências",
        disabled: true,
        badge: "Em breve",
      },
      {
        name: "Motoristas",
        href: "/motoristas",
        icon: Users,
        description: "Disponibilidade e status",
      },
      {
        name: "Relatórios",
        href: "/relatorios",
        icon: BarChart3,
        description: "Visões gerenciais",
      },
    ],
  },
  {
    id: "cadastros",
    title: "Cadastros",
    description: "Referências e estruturas",
    variant: "muted",
    items: [
      {
        name: "Clientes",
        href: "/clientes",
        icon: Building2,
      },
      {
        name: "Veículos",
        href: "/frota",
        icon: Car,
        description: "Registro da frota",
      },
      {
        name: "Motoristas",
        href: "/motoristas",
        icon: IdCard,
        description: "Cadastro completo",
      },
      {
        name: "Bases Operacionais",
        icon: MapPin,
        disabled: true,
        badge: "Em breve",
      },
      {
        name: "Centros de Custo",
        icon: Coins,
        disabled: true,
        badge: "Em breve",
      },
      {
        name: "Categorias",
        icon: Tags,
        disabled: true,
        badge: "Em breve",
      },
    ],
  },
  {
    id: "admin",
    title: "Administração",
    description: "Governança e configurações",
    variant: "muted",
    items: [
      {
        name: "Usuários",
        href: "/configuracoes?view=usuarios",
        icon: UserRound,
      },
      {
        name: "Perfis e Permissões",
        href: "/configuracoes?view=perfis",
        icon: Shield,
      },
      {
        name: "Empresa",
        href: "/configuracoes",
        icon: Factory,
      },
      {
        name: "Notificações",
        icon: Bell,
        disabled: true,
        badge: "Em breve",
      },
      {
        name: "Auditoria",
        icon: FileSearch,
        disabled: true,
        badge: "Em breve",
      },
      {
        name: "Configurações",
        href: "/configuracoes",
        icon: Settings,
      },
    ],
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-gray-200 bg-white animate-slide-in-left">
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center border-b border-gray-200 px-6 bg-gradient-to-r from-slate-900 to-slate-700">
          <h1 className="text-xl font-bold text-white">Rotvex</h1>
        </div>
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-8">
          {navigationSections.map((section) => (
            <div key={section.id} className="space-y-3">
              <div
                className={cn(
                  "rounded-md px-3 py-2",
                  section.variant === "primary"
                    ? "bg-slate-900 text-white"
                    : "bg-slate-50 text-slate-600",
                )}
              >
                <p
                  className={cn(
                    "text-xs font-semibold uppercase tracking-wide",
                    section.variant === "primary"
                      ? "text-white"
                      : "text-slate-500",
                  )}
                >
                  {section.title}
                </p>
                <p className="text-sm font-medium">
                  {section.description}
                </p>
              </div>
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const baseHref = item.href?.split("?")[0] ?? "";
                  const isActive =
                    !!item.href &&
                    (item.matchPrefix
                      ? pathname.startsWith(baseHref)
                      : pathname === baseHref);

                  const itemClasses = cn(
                    "flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-all duration-200",
                    item.disabled
                      ? "cursor-not-allowed text-slate-400"
                      : isActive
                        ? "bg-slate-900 text-white shadow-sm"
                        : section.variant === "primary"
                          ? "text-slate-700 hover:bg-slate-100"
                          : section.variant === "default"
                            ? "text-slate-600 hover:bg-slate-50"
                            : "text-slate-500 hover:bg-slate-50",
                  );

                  const content = (
                    <div className="flex items-center gap-3">
                      <item.icon
                        className={cn(
                          "h-5 w-5",
                          isActive ? "text-white" : "text-current",
                        )}
                      />
                      <div className="flex flex-col">
                        <span>{item.name}</span>
                        {item.description && (
                          <span className="text-xs font-normal text-slate-500">
                            {item.description}
                          </span>
                        )}
                      </div>
                    </div>
                  );

                  if (item.disabled || !item.href) {
                    return (
                      <li key={item.name}>
                        <div className={itemClasses} aria-disabled>
                          {content}
                          {item.badge && (
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                              {item.badge}
                            </span>
                          )}
                        </div>
                      </li>
                    );
                  }

                  return (
                    <li key={item.name}>
                      <Link href={item.href} className={itemClasses}>
                        {content}
                        {item.badge && (
                          <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}
