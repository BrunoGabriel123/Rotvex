"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionCard } from "@/components/ui/SectionCard";
import { ManutencoesTable } from "@/features/custos/components/ManutencoesTable";
import { MaintenanceForm } from "@/features/custos/components/MaintenanceForm";
import { useState } from "react";

export default function CustosPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <MainLayout>
      <PageHeader
        title="Custos"
        description="Gerencie os custos operacionais"
        actionLabel="Nova Manutenção"
        onAction={() => setIsFormOpen(true)}
      />

      <SectionCard title="Manutenções">
        <ManutencoesTable />
      </SectionCard>

      {isFormOpen && (
        <MaintenanceForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
      )}
    </MainLayout>
  );
}
