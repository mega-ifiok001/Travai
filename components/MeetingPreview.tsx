// components/dashboard/MeetingPreview.tsx
import { Calendar, Clock, User } from "lucide-react";

const meetings = [
  { time: "10:30 AM", name: "Sarah Chen", company: "TechCorp", type: "Discovery Call" },
  { time: "2:00 PM", name: "Mike Johnson", company: "StartupXYZ", type: "Demo" },
];

export default function MeetingPreview() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold text-gray-900">Upcoming Meetings</h3>
        <Calendar className="w-5 h-5 text-gray-500" />
      </div>
      <div className="space-y-4">
        {meetings.map((m) => (
          <div key={m.name} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-900">{m.time}</p>
              <Clock className="w-4 h-4 text-gray-500 mx-auto mt-1" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">{m.name}</p>
              <p className="text-sm text-gray-600">{m.company} • {m.type}</p>
            </div>
            <User className="w-5 h-5 text-gray-400" />
          </div>
        ))}
      </div>
    </div>
  );
}