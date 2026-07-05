"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionCard } from "@/components/ui/SectionCard";
import { RotasTable } from "@/features/rotas/components/RotasTable";
import { RouteForm } from "@/features/rotas/components/RouteForm";
import { useState } from "react";

export default function RotasPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <MainLayout>
      <PageHeader
        title="Rotas"
        description="Gerencie o planejamento de rotas"
        actionLabel="Nova Rota"
        onAction={() => setIsFormOpen(true)}
      />

      <SectionCard title="Lista de Rotas">
        <RotasTable />
      </SectionCard>

      {isFormOpen && (
        <RouteForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
      )}
    </MainLayout>
  );
}
