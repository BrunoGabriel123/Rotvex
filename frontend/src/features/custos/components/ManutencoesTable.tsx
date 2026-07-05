"use client";

import { DataTable, Column } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";

const mockMaintenance = [
  {
    id: "1",
    vehicleId: "ABC-1234",
    description: "Troca de óleo",
    cost: 200,
    date: "2024-01-15",
    status: "completed" as const,
  },
  {
    id: "2",
    vehicleId: "DEF-5678",
    description: "Troca de pneus",
    cost: 1500,
    date: "2024-01-10",
    status: "pending" as const,
  },
];

const columns: Column<typeof mockMaintenance[0]>[] = [
  {
    key: "id",
    header: "ID",
  },
  {
    key: "vehicleId",
    header: "Veículo",
  },
  {
    key: "description",
    header: "Descrição",
  },
  {
    key: "cost",
    header: "Custo (R$)",
  },
  {
    key: "date",
    header: "Data",
  },
  {
    key: "status",
    header: "Status",
    render: (value) => {
      const statusMap: Record<string, { label: string; variant: "success" | "warning" | "error" | "info" | "neutral" }> = {
        pending: { label: "Pendente", variant: "warning" },
        in_progress: { label: "Em Andamento", variant: "success" },
        completed: { label: "Concluída", variant: "info" },
        cancelled: { label: "Cancelada", variant: "error" },
      };
      const status = statusMap[value as string] || { label: value, variant: "neutral" };
      return <StatusBadge status={status.label} variant={status.variant} />;
    },
  },
];

export function ManutencoesTable() {
  return (
    <DataTable
      columns={columns}
      data={mockMaintenance}
      emptyMessage="Nenhuma manutenção encontrada"
    />
  );
}
