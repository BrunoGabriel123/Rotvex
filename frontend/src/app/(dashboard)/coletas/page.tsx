"use client";

import { useState } from "react";
import { ColetasTable } from "@/features/coletas/components/ColetasTable";
import { PickupForm } from "@/features/coletas/components/PickupForm";
import { Button } from "@/components/ui/Button";

export default function ColetasPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Coletas</h1>
          <p className="text-gray-600 mt-1">Gerencie as coletas</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)}>Nova Coleta</Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <ColetasTable />
      </div>

      <PickupForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </div>
  );
}
