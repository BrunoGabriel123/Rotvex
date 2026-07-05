"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionCard } from "@/components/ui/SectionCard";
import { EntregasTable } from "@/features/entregas/components/EntregasTable";
import { DeliveryForm } from "@/features/entregas/components/DeliveryForm";
import { useState } from "react";

export default function EntregasPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <MainLayout>
      <PageHeader
        title="Entregas"
        description="Gerencie as entregas"
        actionLabel="Nova Entrega"
        onAction={() => setIsFormOpen(true)}
      />

      <SectionCard title="Lista de Entregas">
        <EntregasTable />
      </SectionCard>

      {isFormOpen && (
        <DeliveryForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
      )}
    </MainLayout>
  );
}
