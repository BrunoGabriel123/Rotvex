import { MainLayout } from "@/components/layout/MainLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { Route } from "lucide-react";

export default function RotasPage() {
  return (
    <MainLayout>
      <PageHeader
        title="Rotas"
        description="Planejamento e otimização de rotas"
      />
      <EmptyState
        title="Nenhuma rota encontrada"
        description="As rotas aparecerão aqui quando criadas."
        icon={<Route className="h-12 w-12" />}
      />
    </MainLayout>
  );
}
