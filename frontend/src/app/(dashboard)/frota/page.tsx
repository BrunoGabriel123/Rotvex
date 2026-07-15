"use client";

import { useState } from "react";
import { VeiculosTable } from "@/features/frota/components/VeiculosTable";
import { VehicleForm } from "@/features/frota/components/VehicleForm";
import { Button } from "@/components/ui/Button";

export default function FrotaPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Frota</h1>
          <p className="text-gray-600 mt-1">Gerencie os veículos da frota</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)}>Novo Veículo</Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <VeiculosTable />
      </div>

      <VehicleForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </div>
  );
}
