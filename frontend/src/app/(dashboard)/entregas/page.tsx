"use client";

import { useState } from "react";
import { EntregasTable } from "@/features/entregas/components/EntregasTable";
import { DeliveryForm } from "@/features/entregas/components/DeliveryForm";
import { Button } from "@/components/ui/Button";

export default function EntregasPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Entregas</h1>
          <p className="text-gray-600 mt-1">Gerencie as entregas</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)}>Nova Entrega</Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <EntregasTable />
      </div>

      <DeliveryForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </div>
  );
}
