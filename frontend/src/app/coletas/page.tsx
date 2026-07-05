"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionCard } from "@/components/ui/SectionCard";
import { ColetasTable } from "@/features/coletas/components/ColetasTable";
import { PickupForm } from "@/features/coletas/components/PickupForm";
import { useState } from "react";

export default function ColetasPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <MainLayout>
      <PageHeader
        title="Coletas"
        description="Gerencie as coletas"
        actionLabel="Nova Coleta"
        onAction={() => setIsFormOpen(true)}
      />

      <SectionCard title="Lista de Coletas">
        <ColetasTable />
      </SectionCard>

      {isFormOpen && (
        <PickupForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
      )}
    </MainLayout>
  );
}
