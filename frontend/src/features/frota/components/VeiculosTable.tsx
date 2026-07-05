"use client";

import { DataTable, Column } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { mockVehicles } from "@/mocks";

const columns: Column<typeof mockVehicles[0]>[] = [
  {
    key: "plate",
    header: "Placa",
  },
  {
    key: "model",
    header: "Modelo",
  },
  {
    key: "year",
    header: "Ano",
  },
  {
    key: "status",
    header: "Status",
    render: (value) => {
      const statusMap: Record<string, { label: string; variant: "success" | "warning" | "error" | "info" | "neutral" }> = {
        pending: { label: "Pendente", variant: "warning" },
        in_progress: { label: "Em Operação", variant: "success" },
        completed: { label: "Disponível", variant: "info" },
        cancelled: { label: "Inativo", variant: "error" },
      };
      const status = statusMap[value as string] || { label: value, variant: "neutral" };
      return <StatusBadge status={status.label} variant={status.variant} />;
    },
  },
];

export function VeiculosTable() {
  return (
    <DataTable
      columns={columns}
      data={mockVehicles}
      emptyMessage="Nenhum veículo encontrado"
    />
  );
}
