"use client";

import { useState } from "react";
import { PedidosTable } from "@/features/pedidos/components/PedidosTable";
import { OrderForm } from "@/features/pedidos/components/OrderForm";
import { Button } from "@/components/ui/Button";

export default function PedidosPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pedidos</h1>
          <p className="text-gray-600 mt-1">Gerencie os pedidos dos clientes</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)}>Novo Pedido</Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <PedidosTable />
      </div>

      <OrderForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </div>
  );
}
