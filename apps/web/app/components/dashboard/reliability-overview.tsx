import {
  Activity,
  AlertTriangle,
  Bot,
  Timer,
} from "lucide-react";

import { MetricCard } from "./matric-card";
import { ReliabilityHeader } from "./reliability-header";

export function ReliabilityOverview() {
  return (
    <div>
      <ReliabilityHeader />

      {/* Metrics */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Reliability Score"
          value="98.4%"
          change="+2.1%"
          description="Compared with previous period"
          icon={Activity}
        />

        <MetricCard
          title="Total Executions"
          value="12,482"
          change="+8.7%"
          description="Agent executions"
          icon={Bot}
        />

        <MetricCard
          title="Active Incidents"
          value="3"
          change="-25%"
          description="Currently unresolved"
          icon={AlertTriangle}
        />

        <MetricCard
          title="Avg. Resolution Time"
          value="18m"
          change="-12.4%"
          description="Mean time to resolution"
          icon={Timer}
        />
      </div>

      {/* Main grid */}
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-3">

        {/* Reliability Score */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 xl:col-span-1">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                System Health
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Current reliability status
              </p>
            </div>

            <span className="rounded-full bg-green-50 px-2.5 py-1 text-[10px] font-semibold text-green-600">
              Healthy
            </span>
          </div>

          <div className="mt-8 flex flex-col items-center">
            <div className="flex h-36 w-36 items-center justify-center rounded-full border-10 border-blue-100">
              <div className="text-center">
                <p className="text-3xl font-bold text-slate-900">
                  98.4
                </p>

                <p className="text-[10px] font-medium text-slate-400">
                  RELIABILITY
                </p>
              </div>
            </div>

            <p className="mt-5 text-xs text-slate-500">
              Your agents are operating normally.
            </p>
          </div>
        </div>

        {/* Execution Overview */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 xl:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Execution Overview
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Agent execution activity
              </p>
            </div>

            <Activity className="h-4 w-4 text-slate-400" />
          </div>

          {/* Simple chart placeholder */}
          <div className="mt-7 flex h-44 items-end gap-2">
            {[35, 52, 44, 68, 58, 72, 64, 81, 76, 91, 84, 96].map(
              (height, index) => (
                <div
                  key={index}
                  className="flex-1 rounded-t-md bg-blue-100 transition hover:bg-blue-200"
                  style={{ height: `${height}%` }}
                />
              ),
            )}
          </div>

          <div className="mt-3 flex justify-between text-[10px] text-slate-400">
            <span>12 AM</span>
            <span>6 AM</span>
            <span>12 PM</span>
            <span>6 PM</span>
            <span>Now</span>
          </div>
        </div>
      </div>

      {/* Bottom cards */}
      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">

        {/* Agent health */}
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">
              Agent Health
            </h2>

            <button className="text-xs font-semibold text-blue-600 hover:text-blue-700">
              View all
            </button>
          </div>

          <div className="mt-5 space-y-4">
            {[
              ["Research Agent", "Healthy", "99.8%"],
              ["Support Agent", "Healthy", "98.9%"],
              ["Data Agent", "Degraded", "94.2%"],
            ].map(([name, status, score]) => (
              <div
                key={name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-green-500" />

                  <div>
                    <p className="text-xs font-semibold text-slate-700">
                      {name}
                    </p>

                    <p className="text-[10px] text-slate-400">
                      {status}
                    </p>
                  </div>
                </div>

                <span className="text-xs font-bold text-slate-700">
                  {score}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent incidents */}
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">
              Recent Incidents
            </h2>

            <button className="text-xs font-semibold text-blue-600 hover:text-blue-700">
              View all
            </button>
          </div>

          <div className="mt-5 space-y-4">
            {[
              ["Tool timeout", "Research Agent", "8m ago"],
              ["API rate limit", "Support Agent", "24m ago"],
              ["Invalid response", "Data Agent", "1h ago"],
            ].map(([title, agent, time]) => (
              <div
                key={title}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50">
                    <AlertTriangle className="h-3.5 w-3.5 text-red-500" />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-700">
                      {title}
                    </p>

                    <p className="text-[10px] text-slate-400">
                      {agent}
                    </p>
                  </div>
                </div>

                <span className="text-[10px] text-slate-400">
                  {time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}