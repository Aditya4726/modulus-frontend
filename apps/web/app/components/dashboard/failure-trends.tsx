"use client";

import {
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  Clock3,
} from "lucide-react";

const failures = [
  {
    type: "Tool Timeout",
    agent: "Research Agent",
    count: 42,
    percentage: 38,
    trend: "+12%",
    positive: false,
  },
  {
    type: "API Rate Limit",
    agent: "Support Agent",
    count: 28,
    percentage: 25,
    trend: "-8%",
    positive: true,
  },
  {
    type: "Invalid Response",
    agent: "Data Agent",
    count: 21,
    percentage: 19,
    trend: "+4%",
    positive: false,
  },
  {
    type: "LLM Timeout",
    agent: "Research Agent",
    count: 12,
    percentage: 11,
    trend: "-16%",
    positive: true,
  },
];

export function FailureTrends() {
  return (
    <section className="mt-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          Failure Trends & Patterns
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Identify recurring failures and reliability patterns across agents.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Failure Trend Chart */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 xl:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-slate-900">
                Failure Rate
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Failures over the last 24 hours
              </p>
            </div>

            <span className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600">
              1.8% failure rate
            </span>
          </div>

          {/* Chart */}
          <div className="mt-8 flex h-52 items-end gap-3">
            {[35, 48, 42, 65, 50, 72, 58, 82, 62, 70, 45, 55].map(
              (height, index) => (
                <div
                  key={index}
                  className="flex flex-1 items-end"
                >
                  <div
                    className="w-full rounded-t-md bg-blue-500/80 transition hover:bg-blue-600"
                    style={{ height: `${height}%` }}
                  />
                </div>
              )
            )}
          </div>

          <div className="mt-3 flex justify-between text-xs text-slate-400">
            <span>12 AM</span>
            <span>4 AM</span>
            <span>8 AM</span>
            <span>12 PM</span>
            <span>4 PM</span>
            <span>8 PM</span>
            <span>Now</span>
          </div>
        </div>

        {/* Failure Summary */}
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h3 className="font-semibold text-slate-900">
            Failure Summary
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            Most common failure patterns
          </p>

          <div className="mt-6 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-red-50 p-2">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                </div>

                <span className="text-sm text-slate-600">
                  Total Failures
                </span>
              </div>

              <span className="font-semibold text-slate-900">
                110
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-orange-50 p-2">
                  <Clock3 className="h-4 w-4 text-orange-500" />
                </div>

                <span className="text-sm text-slate-600">
                  Avg. Recovery
                </span>
              </div>

              <span className="font-semibold text-slate-900">
                14m
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-green-50 p-2">
                  <TrendingDown className="h-4 w-4 text-green-500" />
                </div>

                <span className="text-sm text-slate-600">
                  Resolved
                </span>
              </div>

              <span className="font-semibold text-slate-900">
                96.2%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Failure Pattern Table */}
      <div className="rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 p-6">
          <h3 className="font-semibold text-slate-900">
            Top Failure Patterns
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            Failure types detected across your agents
          </p>
        </div>

        <div className="divide-y divide-slate-100">
          {failures.map((failure) => (
            <div
              key={failure.type}
              className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-slate-100 p-2.5">
                  <AlertTriangle className="h-4 w-4 text-slate-500" />
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-900">
                    {failure.type}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {failure.agent}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div className="w-32">
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-slate-400">
                      Occurrences
                    </span>

                    <span className="font-medium text-slate-600">
                      {failure.percentage}%
                    </span>
                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-blue-500"
                      style={{
                        width: `${failure.percentage}%`,
                      }}
                    />
                  </div>
                </div>

                <span className="w-10 text-right text-sm font-semibold text-slate-900">
                  {failure.count}
                </span>

                <div
                  className={`flex items-center gap-1 text-xs font-medium ${
                    failure.positive
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {failure.positive ? (
                    <TrendingDown className="h-3.5 w-3.5" />
                  ) : (
                    <TrendingUp className="h-3.5 w-3.5" />
                  )}

                  {failure.trend}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}