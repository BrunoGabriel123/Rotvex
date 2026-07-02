import { MainLayout } from "@/components/layout/MainLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { ClipboardList } from "lucide-react";

export default function OperacoesPage() {
  return (
    <MainLayout>
      <PageHeader
        title="Operações"
        description="Gerenciamento das operações logísticas"
      />
      <EmptyState
        title="Nenhuma operação encontrada"
        description="As operações aparecerão aqui quando configuradas."
        icon={<ClipboardList className="h-12 w-12" />}
      />
    </MainLayout>
  );
}
