"use client";

import { DataTable, Column } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { mockPickups } from "@/mocks";

const columns: Column<typeof mockPickups[0]>[] = [
  {
    key: "id",
    header: "ID",
  },
  {
    key: "orderId",
    header: "Pedido",
  },
  {
    key: "address",
    header: "Endereço",
  },
  {
    key: "scheduledDate",
    header: "Data Agendada",
  },
  {
    key: "status",
    header: "Status",
    render: (value) => {
      const statusMap: Record<string, { label: string; variant: "success" | "warning" | "error" | "info" | "neutral" }> = {
        pending: { label: "Pendente", variant: "warning" },
        in_progress: { label: "Em Coleta", variant: "success" },
        completed: { label: "Concluída", variant: "info" },
        cancelled: { label: "Cancelada", variant: "error" },
      };
      const status = statusMap[value as string] || { label: value, variant: "neutral" };
      return <StatusBadge status={status.label} variant={status.variant} />;
    },
  },
];

export function ColetasTable() {
  return (
    <DataTable
      columns={columns}
      data={mockPickups}
      emptyMessage="Nenhuma coleta encontrada"
    />
  );
}
