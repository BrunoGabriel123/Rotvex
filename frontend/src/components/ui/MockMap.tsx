import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface MockMapProps {
  className?: string;
}

export function MockMap({ className }: MockMapProps) {
  return (
    <div
      className={cn(
        "flex min-h-[400px] items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50",
        className
      )}
    >
      <div className="text-center">
        <MapPin className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-500">Mapa mockado</p>
        <p className="text-xs text-gray-400">
          Integração com mapa será implementada futuramente
        </p>
      </div>
    </div>
  );
}
