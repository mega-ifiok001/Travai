"use client";

import * as React from "react";
import { ToastProvider, ToastViewport, Toast } from "@radix-ui/react-toast";
import { cn } from "@/lib/utils";

export function Toaster() {
  return (
    <ToastProvider>
      <ToastViewport className={cn(
        "fixed bottom-0 right-0 flex flex-col p-4 gap-2 w-[390px] max-w-full m-0 list-none z-[100] outline-none"
      )} />
    </ToastProvider>
  );
}
