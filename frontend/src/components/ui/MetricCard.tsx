import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  className?: string;
}

export function MetricCard({
  title,
  value,
  icon,
  trend,
  className,
}: MetricCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.02] hover:border-slate-300 animate-fade-in",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900 transition-all duration-300">{value}</p>
          {trend && (
            <p
              className={cn(
                "mt-2 text-sm transition-all duration-300",
                trend.isPositive ? "text-green-600" : "text-red-600"
              )}
            >
              {trend.isPositive ? "+" : ""}
              {trend.value}
            </p>
          )}
        </div>
        {icon && (
          <div className="rounded-md bg-slate-50 p-3 text-slate-600 transition-all duration-300 hover:bg-slate-100">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
