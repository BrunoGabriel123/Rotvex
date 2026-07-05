"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionCard } from "@/components/ui/SectionCard";
import { BarChart3 } from "lucide-react";

const mockReports = [
  {
    id: "1",
    name: "Entregas por Mês",
    type: "Gráfico",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Custo por Veículo",
    type: "Tabela",
    createdAt: "2024-01-14",
  },
];

export default function RelatoriosPage() {
  return (
    <MainLayout>
      <PageHeader
        title="Relatórios"
        description="Visualize relatórios e métricas"
      />

      <SectionCard title="Relatórios Disponíveis">
        <div className="space-y-4">
          {mockReports.map((report) => (
            <div
              key={report.id}
              className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <BarChart3 className="h-8 w-8 text-gray-400" />
                <div>
                  <h3 className="font-medium text-gray-900">{report.name}</h3>
                  <p className="text-sm text-gray-500">{report.type}</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">{report.createdAt}</span>
            </div>
          ))}
        </div>
      </SectionCard>
    </MainLayout>
  );
}
