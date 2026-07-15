"use client";

import { useState } from "react";
import { RotasTable } from "@/features/rotas/components/RotasTable";
import { RouteForm } from "@/features/rotas/components/RouteForm";
import { Button } from "@/components/ui/Button";

export default function RotasPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Rotas</h1>
          <p className="text-gray-600 mt-1">Gerencie as rotas de entrega</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)}>Nova Rota</Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <RotasTable />
      </div>

      <RouteForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </div>
  );
}
