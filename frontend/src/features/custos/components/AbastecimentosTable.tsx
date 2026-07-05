"use client";

import { DataTable, Column } from "@/components/ui/DataTable";

const mockFuel = [
  {
    id: "1",
    vehicleId: "ABC-1234",
    liters: 50,
    cost: 350,
    date: "2024-01-15",
  },
  {
    id: "2",
    vehicleId: "DEF-5678",
    liters: 40,
    cost: 280,
    date: "2024-01-14",
  },
];

const columns: Column<typeof mockFuel[0]>[] = [
  {
    key: "id",
    header: "ID",
  },
  {
    key: "vehicleId",
    header: "Veículo",
  },
  {
    key: "liters",
    header: "Litros",
  },
  {
    key: "cost",
    header: "Custo (R$)",
  },
  {
    key: "date",
    header: "Data",
  },
];

export function AbastecimentosTable() {
  return (
    <DataTable
      columns={columns}
      data={mockFuel}
      emptyMessage="Nenhum abastecimento encontrado"
    />
  );
}
