import { MainLayout } from "@/components/layout/MainLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { Truck } from "lucide-react";

export default function EntregasPage() {
  return (
    <MainLayout>
      <PageHeader
        title="Entregas"
        description="Acompanhamento de entregas"
      />
      <EmptyState
        title="Nenhuma entrega encontrada"
        description="As entregas aparecerão aqui quando iniciadas."
        icon={<Truck className="h-12 w-12" />}
      />
    </MainLayout>
  );
}
