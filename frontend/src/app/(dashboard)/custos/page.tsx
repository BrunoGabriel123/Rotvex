"use client";

import { useState } from "react";
import { AbastecimentosTable } from "@/features/custos/components/AbastecimentosTable";
import { ManutencoesTable } from "@/features/custos/components/ManutencoesTable";
import { FuelForm } from "@/features/custos/components/FuelForm";
import { MaintenanceForm } from "@/features/custos/components/MaintenanceForm";
import { Button } from "@/components/ui/Button";

export default function CustosPage() {
  const [isFuelFormOpen, setIsFuelFormOpen] = useState(false);
  const [isMaintenanceFormOpen, setIsMaintenanceFormOpen] = useState(false);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Custos</h1>
        <p className="text-gray-600 mt-1">Gerencie os custos operacionais</p>
      </div>

      <div className="space-y-8">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Abastecimentos</h2>
            <Button onClick={() => setIsFuelFormOpen(true)}>Novo Abastecimento</Button>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <AbastecimentosTable />
          </div>
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Manutenções</h2>
            <Button onClick={() => setIsMaintenanceFormOpen(true)}>Nova Manutenção</Button>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <ManutencoesTable />
          </div>
        </div>
      </div>

      <FuelForm isOpen={isFuelFormOpen} onClose={() => setIsFuelFormOpen(false)} />
      <MaintenanceForm isOpen={isMaintenanceFormOpen} onClose={() => setIsMaintenanceFormOpen(false)} />
    </div>
  );
}
