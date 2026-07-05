"use client";

import { DataTable, Column } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { mockDrivers } from "@/mocks";

const columns: Column<typeof mockDrivers[0]>[] = [
  {
    key: "name",
    header: "Nome",
  },
  {
    key: "phone",
    header: "Telefone",
  },
  {
    key: "license",
    header: "CNH",
  },
  {
    key: "status",
    header: "Status",
    render: (value) => {
      const statusMap: Record<string, { label: string; variant: "success" | "warning" | "error" | "info" | "neutral" }> = {
        pending: { label: "Pendente", variant: "warning" },
        in_progress: { label: "Ativo", variant: "success" },
        completed: { label: "Inativo", variant: "neutral" },
        cancelled: { label: "Cancelado", variant: "error" },
      };
      const status = statusMap[value as string] || { label: value, variant: "neutral" };
      return <StatusBadge status={status.label} variant={status.variant} />;
    },
  },
];

export function MotoristasTable() {
  return (
    <DataTable
      columns={columns}
      data={mockDrivers}
      emptyMessage="Nenhum motorista encontrado"
    />
  );
}
