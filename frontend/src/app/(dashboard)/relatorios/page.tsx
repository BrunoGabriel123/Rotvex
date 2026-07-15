import { BarChart3 } from "lucide-react";

export default function RelatoriosPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Relatórios</h1>
        <p className="text-gray-600 mt-1">Visualize relatórios e métricas</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
        <div className="flex flex-col items-center justify-center text-center">
          <BarChart3 className="h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Relatórios</h3>
          <p className="text-gray-600 max-w-md">
            Esta página está em desenvolvimento. Em breve você poderá visualizar relatórios e métricas aqui.
          </p>
        </div>
      </div>
    </div>
  );
}
