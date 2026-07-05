"use client";

import { DataTable, Column } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { mockClients } from "@/mocks";

const columns: Column<typeof mockClients[0]>[] = [
  {
    key: "name",
    header: "Nome",
  },
  {
    key: "email",
    header: "E-mail",
  },
  {
    key: "phone",
    header: "Telefone",
  },
  {
    key: "address",
    header: "Endereço",
  },
  {
    key: "id",
    header: "Status",
    render: () => (
      <StatusBadge status="Ativo" variant="success" />
    ),
  },
];

export function ClientesTable() {
  return (
    <DataTable
      columns={columns}
      data={mockClients}
      emptyMessage="Nenhum cliente encontrado"
    />
  );
}
