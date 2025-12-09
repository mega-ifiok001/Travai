// components/dashboard/TodayTasks.tsx
import { CheckCircle2, Circle } from "lucide-react";

const tasks = [
  { task: "Review 12 new replies", done: false },
  { task: "Call John from Acme Corp", done: true },
  { task: "Send follow-up to 8 warm leads", done: false },
  { task: "Update CRM with meeting notes", done: false },
];

export default function TodayTasks() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-5">Today's Tasks</h3>
      <div className="space-y-3">
        {tasks.map((t, i) => (
          <div key={i} className="flex items-center gap-3">
            {t.done ? (
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            ) : (
              <Circle className="w-5 h-5 text-gray-400" />
            )}
            <span className={`${t.done ? "line-through text-gray-500" : "text-gray-700"}`}>
              {t.task}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}