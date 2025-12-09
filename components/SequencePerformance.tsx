// components/dashboard/SequencePerformance.tsx
const sequences = [
  { name: "Cold Outreach V3", replies: 42, meetings: 12, rate: 28.5 },
  { name: "Follow-up Sequence", replies: 38, meetings: 9, rate: 23.7 },
  { name: "Re-engagement", replies: 29, meetings: 6, rate: 20.7 },
  { name: "Decision Maker", replies: 35, meetings: 11, rate: 31.4 },
];

export default function SequencePerformance() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-5">Sequence Performance</h3>
      <div className="space-y-4">
        {sequences.map((seq) => (
          <div key={seq.name} className="flex items-center justify-between">
            <div className="flex-1">
              <p className="font-medium text-gray-900">{seq.name}</p>
              <p className="text-sm text-gray-600">{seq.replies} replies • {seq.meetings} meetings</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-green-600">{seq.rate}%</p>
              <p className="text-xs text-gray-500">reply rate</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}