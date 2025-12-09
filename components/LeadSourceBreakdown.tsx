// components/dashboard/LeadSourceBreakdown.tsx
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const data = [
  { name: "LinkedIn", value: 38, color: "#0A66C2" },
  { name: "Email Finder", value: 28, color: "#34A853" },
  { name: "Website Form", value: 18, color: "#4285F4" },
  { name: "Referral", value: 16, color: "#FBBC05" },
];

export default function LeadSourceBreakdown() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-5">Lead Source Breakdown</h3>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            dataKey="value"
            label={({ name, value }) => `${name}: ${value}%`}
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}