"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionCard } from "@/components/ui/SectionCard";
import { AbastecimentosTable } from "@/features/custos/components/AbastecimentosTable";
import { FuelForm } from "@/features/custos/components/FuelForm";
import { useState } from "react";

export default function CustosPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <MainLayout>
      <PageHeader
        title="Custos"
        description="Gerencie os custos operacionais"
        actionLabel="Novo Abastecimento"
        onAction={() => setIsFormOpen(true)}
      />

      <SectionCard title="Abastecimentos">
        <AbastecimentosTable />
      </SectionCard>

      {isFormOpen && (
        <FuelForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
      )}
    </MainLayout>
  );
}
