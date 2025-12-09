// components/dashboard/AISuggestions.tsx
import { Sparkles, Zap } from "lucide-react";

const suggestions = [
  "Increase follow-up cadence on Sequence V3 – 38% reply drop after step 4",
  "Try personalizing subject lines with {Company} – +22% open rate in similar accounts",
  "Top 12 leads haven't been contacted in 7+ days – re-engage now",
  "Your best time to send is Tuesday 10-11 AM based on 30-day data",
];

export default function AISuggestions() {
  return (
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200 p-6">
      <div className="flex items-center gap-3 mb-5">
        <Sparkles className="w-6 h-6 text-purple-600" />
        <h3 className="text-lg font-semibold text-gray-900">AI Performance Suggestions</h3>
      </div>
      <div className="space-y-3">
        {suggestions.map((s, i) => (
          <div key={i} className="flex items-start gap-3 bg-white rounded-lg p-4 shadow-sm">
            <Zap className="w-5 h-5 text-purple-500 mt-0.5" />
            <p className="text-sm text-gray-700">{s}</p>
          </div>
        ))}
      </div>
    </div>
  );
}