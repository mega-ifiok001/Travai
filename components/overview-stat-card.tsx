interface StatCardProps {
  label: string;
  value: string | number;
  change?: number;
  trend?: "up" | "down";
}

export function StatCard({ label, value, change, trend }: StatCardProps) {
  return (
    <div className="!p-0 bg-white dark:bg-slate-800 rounded-lg shadow flex flex-col gap-1">
      {/* Label */}
      <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>

      {/* Value */}
      <h2 className="text-sm md:text-base font-semibold text-gray-900 dark:text-white">{value}</h2>

      {/* Trend / Change */}
      {change !== undefined && trend && (
        <span
          className={`text-xs font-medium ${
            trend === "up" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
          }`}
        >
          {trend === "up" ? "▲" : "▼"} {change}%
        </span>
      )}
    </div>
  );
}
