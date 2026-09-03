"use client";

import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const incidents = [
  {
    title: "Tool Timeout",
    agent: "Research Agent",
    severity: "High",
    status: "Resolved",
    time: "8 min ago",
    duration: "12m",
  },
  {
    title: "API Rate Limit",
    agent: "Support Agent",
    severity: "Medium",
    status: "Resolved",
    time: "24 min ago",
    duration: "8m",
  },
  {
    title: "Invalid Response",
    agent: "Data Agent",
    severity: "High",
    status: "Investigating",
    time: "1 hour ago",
    duration: "—",
  },
  {
    title: "LLM Timeout",
    agent: "Research Agent",
    severity: "Low",
    status: "Resolved",
    time: "2 hours ago",
    duration: "5m",
  },
];

function SeverityBadge({ severity }: { severity: string }) {
  const styles = {
    High: "bg-red-50 text-red-600",
    Medium: "bg-orange-50 text-orange-600",
    Low: "bg-blue-50 text-blue-600",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
        styles[severity as keyof typeof styles]
      }`}
    >
      {severity}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const resolved = status === "Resolved";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
        resolved
          ? "bg-green-50 text-green-600"
          : "bg-orange-50 text-orange-600"
      }`}
    >
      {resolved ? (
        <CheckCircle2 className="h-3.5 w-3.5" />
      ) : (
        <Clock3 className="h-3.5 w-3.5" />
      )}

      {status}
    </span>
  );
}

export function IncidentAnalytics() {
  return (
    <section className="mt-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          Incident Analytics
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Analyze incidents, severity, recovery time, and recurring
          reliability issues.
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">
              Total Incidents
            </span>

            <AlertTriangle className="h-5 w-5 text-red-500" />
          </div>

          <div className="mt-3 flex items-end gap-2">
            <span className="text-2xl font-bold text-slate-900">
              84
            </span>

            <span className="mb-1 flex items-center text-xs text-red-500">
              <ArrowUpRight className="mr-1 h-3.5 w-3.5" />
              8.2%
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">
              Resolved
            </span>

            <CheckCircle2 className="h-5 w-5 text-green-500" />
          </div>

          <div className="mt-3 flex items-end gap-2">
            <span className="text-2xl font-bold text-slate-900">
              81
            </span>

            <span className="mb-1 text-xs text-green-600">
              96.4%
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">
              Avg. Resolution
            </span>

            <Clock3 className="h-5 w-5 text-blue-500" />
          </div>

          <div className="mt-3 flex items-end gap-2">
            <span className="text-2xl font-bold text-slate-900">
              18m
            </span>

            <span className="mb-1 flex items-center text-xs text-green-600">
              <ArrowDownRight className="mr-1 h-3.5 w-3.5" />
              12.4%
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">
              MTTR
            </span>

            <Activity className="h-5 w-5 text-purple-500" />
          </div>

          <div className="mt-3 flex items-end gap-2">
            <span className="text-2xl font-bold text-slate-900">
              14m
            </span>

            <span className="mb-1 text-xs text-green-600">
              improving
            </span>
          </div>
        </div>
      </div>

      {/* Analytics */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Incident Distribution */}
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h3 className="font-semibold text-slate-900">
            Incident Distribution
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            Incidents grouped by severity
          </p>

          <div className="mt-8 space-y-5">
            {[
              {
                label: "High",
                value: 28,
                percentage: 33,
                style: "bg-red-500",
              },
              {
                label: "Medium",
                value: 41,
                percentage: 49,
                style: "bg-orange-400",
              },
              {
                label: "Low",
                value: 15,
                percentage: 18,
                style: "bg-blue-500",
              },
            ].map((item) => (
              <div key={item.label}>
                <div className="mb-2 flex justify-between">
                  <span className="text-sm font-medium text-slate-600">
                    {item.label}
                  </span>

                  <span className="text-sm font-semibold text-slate-900">
                    {item.value} ({item.percentage}%)
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full ${item.style}`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resolution Trend */}
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h3 className="font-semibold text-slate-900">
            Resolution Trend
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            Average incident resolution time
          </p>

          <div className="mt-8 flex h-40 items-end gap-3">
            {[85, 72, 78, 60, 68, 52, 45, 48, 38, 42, 32, 28].map(
              (height, index) => (
                <div
                  key={index}
                  className="flex flex-1 items-end"
                >
                  <div
                    className="w-full rounded-t-md bg-blue-500/80"
                    style={{ height: `${height}%` }}
                  />
                </div>
              )
            )}
          </div>

          <div className="mt-3 flex justify-between text-xs text-slate-400">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>
      </div>

      {/* Recent Incidents */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-slate-900">
                Recent Incidents
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Latest reliability incidents
              </p>
            </div>

            <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
              View all
            </button>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {incidents.map((incident) => (
            <div
              key={`${incident.title}-${incident.time}`}
              className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-red-50 p-2.5">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-900">
                    {incident.title}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {incident.agent} · {incident.time}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <SeverityBadge severity={incident.severity} />

                <StatusBadge status={incident.status} />

                <span className="w-12 text-right text-xs text-slate-500">
                  {incident.duration}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}