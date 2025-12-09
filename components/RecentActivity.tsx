// components/dashboard/RecentActivity.tsx
import { Clock } from "lucide-react";

const activities = [
  { action: "Sequence #14 completed", detail: "124 leads processed", time: "5 mins ago" },
  { action: "Meeting booked", detail: "Alex Rivera - GrowthCo", time: "12 mins ago" },
  { action: "12 new replies", detail: "Highest in 30 days", time: "1 hour ago" },
  { action: "AI optimized sequence", detail: "V3 improved by 18%", time: "2 hours ago" },
];

export default function RecentActivity() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-5">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((a, i) => (
          <div key={i} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0">
            <div className="p-2 bg-gray-100 rounded-full">
              <Clock className="w-4 h-4 text-gray-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">{a.action}</p>
              <p className="text-sm text-gray-600">{a.detail}</p>
            </div>
            <span className="text-xs text-gray-500">{a.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}