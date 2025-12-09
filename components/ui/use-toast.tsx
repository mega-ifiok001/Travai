"use client";

import * as React from "react";

type ToastOptions = {
  title: string;
  description?: string;
};

const ToastContext = React.createContext<{ toast: (opts: ToastOptions) => void }>({
  toast: () => {},
});

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = React.useState<ToastOptions[]>([]);

  const toast = (opts: ToastOptions) => {
    setMessages((prev) => [...prev, opts]);
    setTimeout(() => setMessages((prev) => prev.slice(1)), 4000);
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
        {messages.map((msg, i) => (
          <div
            key={i}
            className="p-3 bg-white border shadow rounded-md w-64 animate-slide-in"
          >
            <strong>{msg.title}</strong>
            {msg.description && <p className="text-sm text-muted-foreground">{msg.description}</p>}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => React.useContext(ToastContext);
