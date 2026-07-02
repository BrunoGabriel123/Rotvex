import { MainLayout } from "@/components/layout/MainLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { Truck } from "lucide-react";

export default function FrotaPage() {
  return (
    <MainLayout>
      <PageHeader
        title="Frota"
        description="Gerenciamento da frota de veículos"
      />
      <EmptyState
        title="Nenhum veículo encontrado"
        description="Os veículos aparecerão aqui quando cadastrados."
        icon={<Truck className="h-12 w-12" />}
      />
    </MainLayout>
  );
}
