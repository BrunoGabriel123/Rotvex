import { MainLayout } from "@/components/layout/MainLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { BarChart3 } from "lucide-react";

export default function RelatoriosPage() {
  return (
    <MainLayout>
      <PageHeader
        title="Relatórios"
        description="Relatórios e análises"
      />
      <EmptyState
        title="Nenhum relatório disponível"
        description="Os relatórios aparecerão aqui quando gerados."
        icon={<BarChart3 className="h-12 w-12" />}
      />
    </MainLayout>
  );
}
