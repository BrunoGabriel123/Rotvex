'use client';

import { useEffect, useState } from 'react';
import { MainLayout } from "@/components/layout/MainLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { MetricCard } from "@/components/ui/MetricCard";
import { Truck, Clock, Users, DollarSign, Target } from "lucide-react";
import { api } from "@/lib/api";

interface DashboardMetrics {
  deliveries: {
    total: number;
    pending: number;
    completed: number;
  };
  vehicles: {
    total: number;
    active: number;
  };
  drivers: {
    total: number;
    active: number;
  };
  clients: number;
}

export default function Home() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const companyId = user.companyId || 'default-company-id';
        const data = await api.dashboard.getMetrics(companyId);
        setMetrics(data as DashboardMetrics);
      } catch (error) {
        console.error('Erro ao buscar métricas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading) {
    return (
      <MainLayout>
        <PageHeader
          title="Dashboard"
          description="Visão geral das operações logísticas"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-32 bg-gray-100 rounded-lg animate-pulse" />
          ))}
        </div>
      </MainLayout>
    );
  }

  const stats = [
    {
      title: "Entregas Hoje",
      value: metrics?.deliveries.total || 0,
      icon: <Truck className="h-6 w-6" />,
      trend: { value: "12%", isPositive: true },
    },
    {
      title: "Entregas Pendentes",
      value: metrics?.deliveries.pending || 0,
      icon: <Clock className="h-6 w-6" />,
      trend: { value: "3%", isPositive: false },
    },
    {
      title: "Entregas Concluídas",
      value: metrics?.deliveries.completed || 0,
      icon: <Truck className="h-6 w-6" />,
      trend: { value: "5%", isPositive: true },
    },
    {
      title: "Veículos em Operação",
      value: metrics?.vehicles.active || 0,
      icon: <Truck className="h-6 w-6" />,
      trend: { value: "2%", isPositive: true },
    },
    {
      title: "Motoristas Ativos",
      value: metrics?.drivers.active || 0,
      icon: <Users className="h-6 w-6" />,
      trend: { value: "1%", isPositive: true },
    },
    {
      title: "Clientes Ativos",
      value: metrics?.clients || 0,
      icon: <Target className="h-6 w-6" />,
      trend: { value: "4%", isPositive: true },
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
