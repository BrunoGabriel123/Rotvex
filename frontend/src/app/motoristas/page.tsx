import { MainLayout } from "@/components/layout/MainLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { Users } from "lucide-react";

export default function MotoristasPage() {
  return (
    <MainLayout>
      <PageHeader
        title="Motoristas"
        description="Gerenciamento de motoristas"
      />
      <EmptyState
        title="Nenhum motorista encontrado"
        description="Os motoristas aparecerão aqui quando cadastrados."
        icon={<Users className="h-12 w-12" />}
      />
    </MainLayout>
  );
}
