import { MainLayout } from "@/components/layout/MainLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { MapPin } from "lucide-react";

export default function ColetasPage() {
  return (
    <MainLayout>
      <PageHeader
        title="Coletas"
        description="Gerenciamento de coletas"
      />
      <EmptyState
        title="Nenhuma coleta encontrada"
        description="As coletas aparecerão aqui quando agendadas."
        icon={<MapPin className="h-12 w-12" />}
      />
    </MainLayout>
  );
}
