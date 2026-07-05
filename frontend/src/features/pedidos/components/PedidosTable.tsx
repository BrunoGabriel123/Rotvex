"use client";

import { DataTable, Column } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";

const mockOrders = [
  {
    id: "ORD-001",
    clientId: "Empresa ABC",
    status: "in_progress" as const,
    createdAt: "2024-01-15",
  },
  {
    id: "ORD-002",
    clientId: "Comércio XYZ",
    status: "pending" as const,
    createdAt: "2024-01-16",
  },
];

const columns: Column<typeof mockOrders[0]>[] = [
  {
    key: "id",
    header: "ID",
  },
  {
    key: "clientId",
    header: "Cliente",
  },
  {
    key: "createdAt",
    header: "Data",
  },
  {
    key: "status",
    header: "Status",
    render: (value) => {
      const statusMap: Record<string, { label: string; variant: "success" | "warning" | "error" | "info" | "neutral" }> = {
        pending: { label: "Pendente", variant: "warning" },
        in_progress: { label: "Em Processamento", variant: "success" },
        completed: { label: "Concluído", variant: "info" },
        cancelled: { label: "Cancelado", variant: "error" },
      };
      const status = statusMap[value as string] || { label: value, variant: "neutral" };
      return <StatusBadge status={status.label} variant={status.variant} />;
    },
  },
];

export function PedidosTable() {
  return (
    <DataTable
      columns={columns}
      data={mockOrders}
      emptyMessage="Nenhum pedido encontrado"
    />
  );
}
