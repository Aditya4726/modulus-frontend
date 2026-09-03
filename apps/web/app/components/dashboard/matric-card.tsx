import type { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  description: string;
  icon: LucideIcon;
  positive?: boolean;
}

export function MetricCard({
  title,
  value,
  change,
  description,
  icon: Icon,
  positive = true,
}: MetricCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500">
            {title}
          </p>

          <div className="mt-2 flex items-baseline gap-2">
            <h3 className="text-2xl font-bold tracking-tight text-slate-900">
              {value}
            </h3>

            <span
              className={`text-xs font-semibold ${
                positive ? "text-green-600" : "text-red-600"
              }`}
            >
              {change}
            </span>
          </div>

          <p className="mt-1 text-[11px] text-slate-400">
            {description}
          </p>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
          <Icon className="h-4 w-4 text-blue-600" />
        </div>
      </div>
    </div>
  );
}