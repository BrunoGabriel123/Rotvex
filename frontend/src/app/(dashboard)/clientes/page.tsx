"use client";

import { useState } from "react";
import { ClientesTable } from "@/features/clientes/components/ClientesTable";
import { ClientForm } from "@/features/clientes/components/ClientForm";
import { Button } from "@/components/ui/Button";

export default function ClientesPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>
          <p className="text-gray-600 mt-1">Gerencie os clientes</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)}>Novo Cliente</Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <ClientesTable />
      </div>

      <ClientForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </div>
  );
}
