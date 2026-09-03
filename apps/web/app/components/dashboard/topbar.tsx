"use client";

import {
  Search,
  Bell,
  HelpCircle,
  Plus,
} from "lucide-react";

export function Topbar() {
  return (
    <header className="fixed left-62.5 right-0 top-0 z-30 h-17 border-b border-slate-200 bg-white">
      <div className="flex h-full items-center justify-between px-7">
        
        {/* Left */}
        <div>
          <h1 className="text-[15px] font-bold text-slate-900">
            Reliability Overview
          </h1>

          <p className="mt-0.5 text-[11px] text-slate-400">
            Monitor your AI agents and infrastructure
          </p>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          
          {/* Search */}
          <button className="flex h-9 items-center gap-2 rounded-lg border border-slate-200 px-3 text-slate-400 hover:bg-slate-50">
            <Search className="h-4 w-4" />

            <span className="text-xs">
              Search
            </span>

            <kbd className="ml-3 rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[9px] text-slate-400">
              ⌘ K
            </kbd>
          </button>

          {/* Create */}
          <button className="flex h-9 items-center gap-1.5 rounded-lg bg-blue-600 px-3 text-xs font-semibold text-white transition hover:bg-blue-700">
            <Plus className="h-3.5 w-3.5" />
            New Project
          </button>

          {/* Help */}
          <button className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-600">
            <HelpCircle className="h-4.25 w-4.25" />
          </button>

          {/* Notification */}
          <button className="relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-600">
            <Bell className="h-4.25 w-4.25" />

            <span className="absolute right-1.75 top-1.5 h-1.5 w-1.5 rounded-full bg-red-500" />
          </button>
        </div>
      </div>
    </header>
  );
}