// components/dashboard/PipelineSnapshot.tsx
import { DollarSign, Users, Clock, CheckCircle } from "lucide-react";

const stages = [
  { stage: "New", count: 142, value: "$42K", color: "bg-[#081ab3]" },
  { stage: "Contacted", count: 89, value: "$28K", color: "bg-[#081ab3]" },
  { stage: "Qualified", count: 44, value: "$18K", color: "bg-[#081ab3]" },
  { stage: "Meeting Booked", count: 18, value: "$36K", color: "bg-[#081ab3]" },
];

export default function PipelineSnapshot() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-5">Pipeline Snapshot</h3>
      <div className="space-y-4">
        {stages.map((s) => (
          <div key={s.stage}>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium text-gray-700">{s.stage}</span>
              <span className="text-gray-600">{s.count} leads • {s.value}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`${s.color} h-2 rounded-full transition-all`}
                style={{ width: `${(s.count / 142) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Total Pipeline</span>
          <span className="text-xl font-bold text-gray-900">$124,000</span>
        </div>
      </div>
    </div>
  );
}