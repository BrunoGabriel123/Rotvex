import { MainLayout } from "@/components/layout/MainLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { MetricCard } from "@/components/ui/MetricCard";
import { Truck, Clock, Users, DollarSign, Target, TrendingUp } from "lucide-react";

export default function Home() {
  const stats = [
    {
      title: "Entregas Hoje",
      value: 142,
      icon: <Truck className="h-6 w-6" />,
      trend: { value: "12%", isPositive: true },
    },
    {
      title: "Entregas Atrasadas",
      value: 8,
      icon: <Clock className="h-6 w-6" />,
      trend: { value: "3%", isPositive: false },
    },
    {
      title: "Veículos em Operação",
      value: 45,
      icon: <Truck className="h-6 w-6" />,
      trend: { value: "5%", isPositive: true },
    },
    {
      title: "Motoristas Ativos",
      value: 38,
      icon: <Users className="h-6 w-6" />,
      trend: { value: "2%", isPositive: true },
    },
    {
      title: "Custo Operacional",
      value: "R$ 45.230",
      icon: <DollarSign className="h-6 w-6" />,
      trend: { value: "8%", isPositive: false },
    },
    {
      title: "SLA",
      value: "94.5%",
      icon: <Target className="h-6 w-6" />,
      trend: { value: "1.2%", isPositive: true },
    },
  ];

  return (
    <MainLayout>
      <PageHeader
        title="Dashboard"
        description="Visão geral das operações logísticas"
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <MetricCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
          />
        ))}
      </div>
    </MainLayout>
  );
}
