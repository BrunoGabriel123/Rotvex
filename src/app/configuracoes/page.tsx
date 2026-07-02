import { MainLayout } from "@/components/layout/MainLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { Settings } from "lucide-react";

export default function ConfiguracoesPage() {
  return (
    <MainLayout>
      <PageHeader
        title="Configurações"
        description="Configurações do sistema"
      />
      <EmptyState
        title="Configurações não disponíveis"
        description="As configurações estarão disponíveis em breve."
        icon={<Settings className="h-12 w-12" />}
      />
    </MainLayout>
  );
}
