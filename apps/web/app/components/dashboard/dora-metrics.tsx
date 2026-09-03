"use client";

import {
  Clock3,
  GitCommit,
  RotateCcw,
  Zap,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

const metrics = [
  {
    title: "Mean Time to Recovery",
    value: "14m",
    change: "-18.4%",
    description: "Average time to recover from incidents",
    icon: Clock3,
    positive: true,
  },
  {
    title: "Deployment Frequency",
    value: "8.6/day",
    change: "+12.8%",
    description: "Average successful deployments per day",
    icon: GitCommit,
    positive: true,
  },
  {
    title: "Change Failure Rate",
    value: "2.4%",
    change: "-0.8%",
    description: "Deployments causing reliability issues",
    icon: RotateCcw,
    positive: true,
  },
  {
    title: "Lead Time",
    value: "2.8h",
    change: "-14.2%",
    description: "Average time from change to deployment",
    icon: Zap,
    positive: true,
  },
];

const weeklyData = [
  { day: "Mon", mttr: 24, incidents: 12 },
  { day: "Tue", mttr: 21, incidents: 10 },
  { day: "Wed", mttr: 19, incidents: 14 },
  { day: "Thu", mttr: 17, incidents: 8 },
  { day: "Fri", mttr: 15, incidents: 7 },
  { day: "Sat", mttr: 13, incidents: 5 },
  { day: "Sun", mttr: 14, incidents: 6 },
];

export function DoraMetrics() {
  return (
    <section className="mt-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          MTTR & DORA Metrics
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Track recovery performance and operational reliability
          metrics.
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <div
              key={metric.title}
              className="rounded-xl border border-slate-200 bg-white p-5"
            >
              <div className="flex items-start justify-between">
                <div className="rounded-lg bg-blue-50 p-2.5">
                  <Icon className="h-5 w-5 text-blue-600" />
                </div>

                <span
                  className={`flex items-center gap-1 text-xs font-medium ${
                    metric.positive
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {metric.positive ? (
                    <TrendingDown className="h-3.5 w-3.5" />
                  ) : (
                    <TrendingUp className="h-3.5 w-3.5" />
                  )}

                  {metric.change}
                </span>
              </div>

              <p className="mt-5 text-sm text-slate-500">
                {metric.title}
              </p>

              <p className="mt-1 text-2xl font-bold text-slate-900">
                {metric.value}
              </p>

              <p className="mt-2 text-xs text-slate-400">
                {metric.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* MTTR Trend */}
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-slate-900">
                MTTR Trend
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Mean time to recovery over the last 7 days
              </p>
            </div>

            <span className="rounded-lg bg-green-50 px-3 py-1.5 text-xs font-medium text-green-600">
              Improving
            </span>
          </div>

          <div className="mt-8 flex h-52 items-end gap-4">
            {weeklyData.map((item) => (
              <div
                key={item.day}
                className="flex flex-1 flex-col items-center gap-2"
              >
                <div className="flex h-44 w-full items-end">
                  <div
                    className="w-full rounded-t-md bg-blue-500/80 transition hover:bg-blue-600"
                    style={{
                      height: `${(item.mttr / 25) * 100}%`,
                    }}
                  />
                </div>

                <span className="text-xs text-slate-400">
                  {item.day}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
            <span className="text-xs text-slate-400">
              Previous average
            </span>

            <span className="text-sm font-semibold text-slate-700">
              21.4m
            </span>
          </div>
        </div>

        {/* Incident Volume */}
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <div>
            <h3 className="font-semibold text-slate-900">
              Incident Volume
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Number of incidents per day
            </p>
          </div>

          <div className="mt-8 flex h-52 items-end gap-4">
            {weeklyData.map((item) => (
              <div
                key={item.day}
                className="flex flex-1 flex-col items-center gap-2"
              >
                <div className="flex h-44 w-full items-end">
                  <div
                    className="w-full rounded-t-md bg-slate-400 transition hover:bg-slate-500"
                    style={{
                      height: `${(item.incidents / 15) * 100}%`,
                    }}
                  />
                </div>

                <span className="text-xs text-slate-400">
                  {item.day}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
            <span className="text-xs text-slate-400">
              Weekly incidents
            </span>

            <span className="text-sm font-semibold text-slate-700">
              62
            </span>
          </div>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="font-semibold text-slate-900">
              Reliability Performance
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Your operational metrics are trending in the right
              direction.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-lg bg-green-50 px-4 py-3">
            <TrendingDown className="h-5 w-5 text-green-600" />

            <div>
              <p className="text-sm font-semibold text-green-700">
                18.4% improvement
              </p>

              <p className="text-xs text-green-600">
                MTTR compared with previous period
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}