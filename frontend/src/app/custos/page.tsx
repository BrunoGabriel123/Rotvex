import { MainLayout } from "@/components/layout/MainLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { DollarSign } from "lucide-react";

export default function CustosPage() {
  return (
    <MainLayout>
      <PageHeader
        title="Custos"
        description="Controle de custos operacionais"
      />
      <EmptyState
        title="Nenhum custo registrado"
        description="Os custos aparecerão aqui quando registrados."
        icon={<DollarSign className="h-12 w-12" />}
      />
    </MainLayout>
  );
}
