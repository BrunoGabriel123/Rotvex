"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionCard } from "@/components/ui/SectionCard";
import { MotoristasTable } from "@/features/motoristas/components/MotoristasTable";
import { DriverForm } from "@/features/motoristas/components/DriverForm";
import { useState } from "react";

export default function MotoristasPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <MainLayout>
      <PageHeader
        title="Motoristas"
        description="Gerencie os cadastros de motoristas"
        actionLabel="Novo Motorista"
        onAction={() => setIsFormOpen(true)}
      />

      <SectionCard title="Lista de Motoristas">
        <MotoristasTable />
      </SectionCard>

      {isFormOpen && (
        <DriverForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
      )}
    </MainLayout>
  );
}
