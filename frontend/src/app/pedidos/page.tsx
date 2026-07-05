import { MainLayout } from "@/components/layout/MainLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { Package } from "lucide-react";

export default function PedidosPage() {
  return (
    <MainLayout>
      <PageHeader
        title="Pedidos"
        description="Gerenciamento de pedidos"
      />
      <EmptyState
        title="Nenhum pedido encontrado"
        description="Os pedidos aparecerão aqui quando criados."
        icon={<Package className="h-12 w-12" />}
      />
    </MainLayout>
  );
}
