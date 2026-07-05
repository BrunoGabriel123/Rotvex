"use client";

import { DataTable, Column } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";

const mockRoutes = [
  {
    id: "1",
    name: "Rota Centro - Sul",
    stops: 5,
    status: "in_progress" as const,
  },
  {
    id: "2",
    name: "Rota Norte - Leste",
    stops: 8,
    status: "pending" as const,
  },
];

const columns: Column<typeof mockRoutes[0]>[] = [
  {
    key: "name",
    header: "Nome",
  },
  {
    key: "stops",
    header: "Paradas",
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

export function RotasTable() {
  return (
    <DataTable
      columns={columns}
      data={mockRoutes}
      emptyMessage="Nenhuma rota encontrada"
    />
  );
}
