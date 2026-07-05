"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionCard } from "@/components/ui/SectionCard";
import { PedidosTable } from "@/features/pedidos/components/PedidosTable";
import { OrderForm } from "@/features/pedidos/components/OrderForm";
import { useState } from "react";

export default function PedidosPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <MainLayout>
      <PageHeader
        title="Pedidos"
        description="Gerencie os pedidos"
        actionLabel="Novo Pedido"
        onAction={() => setIsFormOpen(true)}
      />

      <SectionCard title="Lista de Pedidos">
        <PedidosTable />
      </SectionCard>

      {isFormOpen && (
        <OrderForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
      )}
    </MainLayout>
  );
}
