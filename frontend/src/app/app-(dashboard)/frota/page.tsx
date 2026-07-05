"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionCard } from "@/components/ui/SectionCard";
import { VeiculosTable } from "@/features/frota/components/VeiculosTable";
import { VehicleForm } from "@/features/frota/components/VehicleForm";
import { useState } from "react";

export default function FrotaPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <MainLayout>
      <PageHeader
        title="Frota"
        description="Gerencie os cadastros de veículos"
        actionLabel="Novo Veículo"
        onAction={() => setIsFormOpen(true)}
      />

      <SectionCard title="Lista de Veículos">
        <VeiculosTable />
      </SectionCard>

      {isFormOpen && (
        <VehicleForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
      )}
    </MainLayout>
  );
}
