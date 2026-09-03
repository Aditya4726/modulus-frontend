"use client";

import { CalendarDays, RefreshCw } from "lucide-react";

export function ReliabilityHeader() {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Dashboard Overview
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Monitor the health and reliability of your AI agents.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50">
          <CalendarDays className="h-3.5 w-3.5" />
          Last 24 hours
        </button>

        <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50">
          <RefreshCw className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}