"use client";

import {
  ArrowLeft,
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Bot,
  Wrench,
  Code2,
  Copy,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

const incident = {
  id: "INC-1042",
  title: "Tool Timeout",
  description: "web_search exceeded the configured timeout",
  severity: "High",
  status: "Investigating",
  agent: "Research Agent",
  created: "8 minutes ago",
  duration: "12m",
  error: "Tool execution timed out after 30 seconds",
};

const timeline = [
  {
    time: "10:42:18",
    title: "Incident detected",
    description: "Reliability monitor detected a failed tool execution.",
    icon: AlertTriangle,
    type: "error",
  },
  {
    time: "10:42:19",
    title: "Agent execution failed",
    description: "Research Agent failed during web_search execution.",
    icon: Bot,
    type: "error",
  },
  {
    time: "10:43:02",
    title: "Automatic retry started",
    description: "The system initiated an automatic retry.",
    icon: Clock3,
    type: "warning",
  },
  {
    time: "10:44:11",
    title: "Tool call completed",
    description: "web_search completed successfully after retry.",
    icon: Wrench,
    type: "success",
  },
];

const toolCalls = [
  {
    name: "web_search",
    status: "Timeout",
    duration: "30.0s",
  },
  {
    name: "web_search",
    status: "Success",
    duration: "1.4s",
  },
  {
    name: "fetch_url",
    status: "Success",
    duration: "680ms",
  },
];

export default function IncidentDetailsPage() {
  return (
    <div className="space-y-6">
      {/* Back */}
      <Link
        href="/incidents"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Incidents
      </Link>

      {/* Header */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-start gap-4">
          <div className="rounded-xl bg-red-50 p-3">
            <AlertTriangle className="h-6 w-6 text-red-500" />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-xl font-bold text-slate-900">
                {incident.title}
              </h1>

              <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-600">
                {incident.severity}
              </span>

              <span className="rounded-full bg-orange-50 px-2.5 py-1 text-xs font-medium text-orange-600">
                {incident.status}
              </span>
            </div>

            <p className="mt-2 text-sm text-slate-500">
              {incident.description}
            </p>

            <p className="mt-2 text-xs text-slate-400">
              {incident.id} · Created {incident.created}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50">
            Assign
          </button>

          <button className="rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-green-700">
            Mark Resolved
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-2 text-slate-500">
            <Bot className="h-4 w-4" />
            <span className="text-sm">Agent</span>
          </div>

          <p className="mt-3 text-sm font-semibold text-slate-900">
            {incident.agent}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-2 text-slate-500">
            <Clock3 className="h-4 w-4" />
            <span className="text-sm">Duration</span>
          </div>

          <p className="mt-3 text-sm font-semibold text-slate-900">
            {incident.duration}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-2 text-slate-500">
            <Wrench className="h-4 w-4" />
            <span className="text-sm">Failed Tool</span>
          </div>

          <p className="mt-3 font-mono text-sm font-semibold text-slate-900">
            web_search
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-2 text-slate-500">
            <CheckCircle2 className="h-4 w-4" />
            <span className="text-sm">Retry</span>
          </div>

          <p className="mt-3 text-sm font-semibold text-green-600">
            Successful
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Timeline */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 xl:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-slate-900">
                Incident Timeline
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Events associated with this incident
              </p>
            </div>
          </div>

          <div className="mt-8">
            {timeline.map((event, index) => {
              const Icon = event.icon;

              const iconStyle =
                event.type === "success"
                  ? "bg-green-50 text-green-600"
                  : event.type === "warning"
                    ? "bg-orange-50 text-orange-600"
                    : "bg-red-50 text-red-600";

              return (
                <div
                  key={event.time}
                  className="relative flex gap-4 pb-8 last:pb-0"
                >
                  {index !== timeline.length - 1 && (
                    <div className="absolute left-4 top-9 h-full w-px bg-slate-200" />
                  )}

                  <div
                    className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${iconStyle}`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-sm font-medium text-slate-900">
                        {event.title}
                      </p>

                      <span className="font-mono text-xs text-slate-400">
                        {event.time}
                      </span>
                    </div>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {event.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Incident Information */}
        <div className="space-y-6">
          {/* Error */}
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-slate-900">
                Error Details
              </h2>

              <Code2 className="h-4 w-4 text-slate-400" />
            </div>

            <div className="mt-4 rounded-lg bg-slate-950 p-4">
              <p className="font-mono text-xs leading-5 text-slate-200">
                {incident.error}
              </p>
            </div>

            <button className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-blue-600">
              <Copy className="h-3.5 w-3.5" />
              Copy error
            </button>
          </div>

          {/* Agent */}
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-50 p-2">
                <Bot className="h-4 w-4 text-blue-600" />
              </div>

              <div>
                <h2 className="text-sm font-semibold text-slate-900">
                  {incident.agent}
                </h2>

                <p className="text-xs text-slate-400">
                  Agent involved
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">
                  Reliability
                </span>

                <span className="font-medium text-slate-900">
                  99.8%
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-slate-500">
                  Executions
                </span>

                <span className="font-medium text-slate-900">
                  4,821
                </span>
              </div>
            </div>

            <button className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700">
              View agent
              <ExternalLink className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Tool Calls */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-50 p-2">
              <Wrench className="h-4 w-4 text-blue-600" />
            </div>

            <div>
              <h2 className="font-semibold text-slate-900">
                Tool Calls
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Tool executions related to this incident
              </p>
            </div>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {toolCalls.map((tool, index) => (
            <div
              key={`${tool.name}-${index}`}
              className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-xs font-medium text-slate-500">
                  {index + 1}
                </span>

                <div>
                  <p className="font-mono text-sm font-medium text-slate-900">
                    {tool.name}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Execution #{index + 1}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    tool.status === "Success"
                      ? "bg-green-50 text-green-600"
                      : "bg-red-50 text-red-600"
                  }`}
                >
                  {tool.status}
                </span>

                <span className="text-xs text-slate-500">
                  {tool.duration}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}