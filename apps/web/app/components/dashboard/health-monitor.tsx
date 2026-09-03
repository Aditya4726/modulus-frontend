"use client";

import {
  Bot,
  Wrench,
  BrainCircuit,
  CheckCircle2,
  AlertCircle,
  XCircle,
} from "lucide-react";

/* Backend integration: this monitoring surface currently uses fixture arrays.
 * Replace them with GET /api/metrics/:projectId/internal (or a dashboard
 * aggregate) returning agents, tools, and models with health, success rate,
 * latency, and execution/request counts. Add loading/error states when wired.
 */

const agents = [
  {
    name: "Research Agent",
    type: "Agent",
    health: "99.8%",
    status: "Healthy",
    executions: "4,821",
  },
  {
    name: "Support Agent",
    type: "Agent",
    health: "98.9%",
    status: "Healthy",
    executions: "3,942",
  },
  {
    name: "Data Agent",
    type: "Agent",
    health: "94.2%",
    status: "Degraded",
    executions: "2,719",
  },
];

const tools = [
  {
    name: "web_search",
    calls: "6,482",
    success: "99.4%",
    latency: "420ms",
    status: "Healthy",
  },
  {
    name: "fetch_url",
    calls: "4,218",
    success: "97.8%",
    latency: "680ms",
    status: "Healthy",
  },
  {
    name: "database_query",
    calls: "2,104",
    success: "91.6%",
    latency: "1.2s",
    status: "Degraded",
  },
];

const models = [
  {
    name: "GPT-4.1",
    requests: "5,842",
    success: "99.1%",
    latency: "1.8s",
    status: "Healthy",
  },
  {
    name: "Claude Sonnet",
    requests: "3,621",
    success: "98.7%",
    latency: "2.1s",
    status: "Healthy",
  },
  {
    name: "Gemini",
    requests: "1,928",
    success: "96.4%",
    latency: "2.4s",
    status: "Degraded",
  },
];

function StatusBadge({ status }: { status: string }) {
  const isHealthy = status === "Healthy";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
        isHealthy
          ? "bg-green-50 text-green-600"
          : "bg-orange-50 text-orange-600"
      }`}
    >
      {isHealthy ? (
        <CheckCircle2 className="h-3.5 w-3.5" />
      ) : (
        <AlertCircle className="h-3.5 w-3.5" />
      )}

      {status}
    </span>
  );
}

function HealthTable({
  title,
  description,
  icon,
  children,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="border-b border-slate-200 p-5">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
            {icon}
          </div>

          <div>
            <h3 className="font-semibold text-slate-900">
              {title}
            </h3>

            <p className="mt-0.5 text-xs text-slate-500">
              {description}
            </p>
          </div>
        </div>
      </div>

      <div className="divide-y divide-slate-100">
        {children}
      </div>
    </div>
  );
}

export function HealthMonitor() {
  return (
    <section className="mt-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          Agent / Tool / Model Health
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Monitor the health and performance of every component in
          your AI system.
        </p>
      </div>

      {/* Overall Health */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">
              Agents
            </span>

            <Bot className="h-5 w-5 text-blue-500" />
          </div>

          <div className="mt-3 flex items-end gap-2">
            <span className="text-2xl font-bold text-slate-900">
              3
            </span>

            <span className="mb-1 text-xs text-green-600">
              2 healthy
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">
              Tools
            </span>

            <Wrench className="h-5 w-5 text-blue-500" />
          </div>

          <div className="mt-3 flex items-end gap-2">
            <span className="text-2xl font-bold text-slate-900">
              3
            </span>

            <span className="mb-1 text-green-600 text-xs">
              2 healthy
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">
              Models
            </span>

            <BrainCircuit className="h-5 w-5 text-blue-500" />
          </div>

          <div className="mt-3 flex items-end gap-2">
            <span className="text-2xl font-bold text-slate-900">
              3
            </span>

            <span className="mb-1 text-green-600 text-xs">
              2 healthy
            </span>
          </div>
        </div>
      </div>

      {/* Agent Health */}
      <HealthTable
        title="Agent Health"
        description="Reliability across your AI agents"
        icon={<Bot className="h-4 w-4" />}
      >
        {agents.map((agent) => (
          <div
            key={agent.name}
            className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="text-sm font-medium text-slate-900">
                {agent.name}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {agent.type} · {agent.executions} executions
              </p>
            </div>

            <div className="flex items-center gap-8">
              <div className="text-right">
                <p className="text-sm font-semibold text-slate-900">
                  {agent.health}
                </p>

                <p className="text-xs text-slate-400">
                  reliability
                </p>
              </div>

              <StatusBadge status={agent.status} />
            </div>
          </div>
        ))}
      </HealthTable>

      {/* Tool + Model */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <HealthTable
          title="Tool Health"
          description="Performance of connected tools"
          icon={<Wrench className="h-4 w-4" />}
        >
          {tools.map((tool) => (
            <div key={tool.name} className="p-5">
              <div className="flex items-center justify-between">
                <p className="font-mono text-sm font-medium text-slate-900">
                  {tool.name}
                </p>

                <StatusBadge status={tool.status} />
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3">
                <div>
                  <p className="text-xs text-slate-400">
                    Calls
                  </p>
                  <p className="mt-1 text-sm font-semibold">
                    {tool.calls}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Success
                  </p>
                  <p className="mt-1 text-sm font-semibold">
                    {tool.success}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Latency
                  </p>
                  <p className="mt-1 text-sm font-semibold">
                    {tool.latency}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </HealthTable>

        <HealthTable
          title="Model Health"
          description="LLM performance and latency"
          icon={<BrainCircuit className="h-4 w-4" />}
        >
          {models.map((model) => (
            <div key={model.name} className="p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-900">
                  {model.name}
                </p>

                <StatusBadge status={model.status} />
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3">
                <div>
                  <p className="text-xs text-slate-400">
                    Requests
                  </p>
                  <p className="mt-1 text-sm font-semibold">
                    {model.requests}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Success
                  </p>
                  <p className="mt-1 text-sm font-semibold">
                    {model.success}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Latency
                  </p>
                  <p className="mt-1 text-sm font-semibold">
                    {model.latency}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </HealthTable>
      </div>
    </section>
  );
}