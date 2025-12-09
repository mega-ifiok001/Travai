// components/dashboard/QuickActions.tsx
import { Plus, Mail, Linkedin, Phone, Sparkles } from "lucide-react";

export default function QuickActions() {
  return (
    <div className="fixed bottom-8 right-8 flex flex-col gap-3 z-50">
      
      {/* Add Lead */}
      <button className="relative group cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-full shadow-2xl hover:scale-110 transition-transform">
        <Plus className="w-4 h-4" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Invite Member 
        </span>
      </button>

      {/* Send Email */}
      <button className="relative cursor-pointer group bg-white text-gray-800 p-2 rounded-full shadow-xl hover:scale-110 transition-transform border">
        <Mail className="w-4 h-4" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Check Inbox
        </span>
      </button>



      {/* Make Call */}
      <button className="relative cursor-pointer group bg-white text-gray-800 p-2 rounded-full shadow-xl hover:scale-110 transition-transform border">
        <Phone className="w-4 h-4" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
         Call
        </span>
      </button>

      {/* AI Suggestion */}
      <button className="relative cursor-pointer group bg-purple-400 text-white p-2 rounded-full shadow-xl hover:scale-110 transition-transform">
        <Sparkles className="w-4 h-4" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Ask Aroma AI 
        </span>
      </button>

    </div>
  );
}
