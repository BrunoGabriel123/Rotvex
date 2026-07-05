"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionCard } from "@/components/ui/SectionCard";
import { ClientesTable } from "@/features/clientes/components/ClientesTable";
import { ClientForm } from "@/features/clientes/components/ClientForm";
import { useState } from "react";

export default function ClientesPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <MainLayout>
      <PageHeader
        title="Clientes"
        description="Gerencie os cadastros de clientes"
        actionLabel="Novo Cliente"
        onAction={() => setIsFormOpen(true)}
      />

      <SectionCard title="Lista de Clientes">
        <ClientesTable />
      </SectionCard>

      {isFormOpen && (
        <ClientForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
      )}
    </MainLayout>
  );
}
