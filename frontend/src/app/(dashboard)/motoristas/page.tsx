"use client";

import { useState } from "react";
import { MotoristasTable } from "@/features/motoristas/components/MotoristasTable";
import { DriverForm } from "@/features/motoristas/components/DriverForm";
import { Button } from "@/components/ui/Button";

export default function MotoristasPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Motoristas</h1>
          <p className="text-gray-600 mt-1">Gerencie os motoristas</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)}>Novo Motorista</Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <MotoristasTable />
      </div>

      <DriverForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </div>
  );
}
