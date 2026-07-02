import { MainLayout } from "@/components/layout/MainLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { Building2 } from "lucide-react";

export default function ClientesPage() {
  return (
    <MainLayout>
      <PageHeader
        title="Clientes"
        description="Gerenciamento de clientes"
      />
      <EmptyState
        title="Nenhum cliente encontrado"
        description="Os clientes aparecerão aqui quando cadastrados."
        icon={<Building2 className="h-12 w-12" />}
      />
    </MainLayout>
  );
}
