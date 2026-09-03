"use client";

import { useMemo, useState } from "react";
import { AgentOverview } from "../../components/agents/agent-overview";
import { AgentList } from "../../components/agents/agent-search";
import { AgentSearch } from "../../components/agents/agent-list";
import type { Agent } from "../../components/agents/agent-card";

const AGENTS: Agent[] = [
	{ name: "Research Agent", status: "healthy", reliability: 98, executions: "4,201", latency: "612ms" },
	{ name: "Support Agent", status: "healthy", reliability: 99, executions: "3,884", latency: "540ms" },
	{ name: "Data Agent", status: "degraded", reliability: 82, executions: "2,495", latency: "1.4s" },
	{ name: "Refund Agent", status: "healthy", reliability: 96, executions: "1,902", latency: "710ms" },
];

export default function AgentsPage() {
	const [query, setQuery] = useState("");

	const filtered = useMemo(
		() =>
			AGENTS.filter((agent) =>
				agent.name.toLowerCase().includes(query.trim().toLowerCase()),
			),
		[query],
	);

	return (
		<div className="max-w-7xl mx-auto flex flex-col gap-8">
			<div>
				<h1 className="text-2xl font-extrabold text-slate-900">Agents</h1>
				<p className="text-sm text-slate-500 mt-1">
					Every agent Modulus is watching, and how reliable it is right now.
				</p>
			</div>

			<AgentOverview />

			<AgentSearch value={query} onChange={setQuery} />

			<AgentList agents={filtered} />
		</div>
	);
}