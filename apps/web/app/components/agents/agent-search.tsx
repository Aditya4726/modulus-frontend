import { AgentCard, type Agent } from "./agent-card";

export function AgentList({ agents }: { agents: Agent[] }) {
	if (agents.length === 0) {
		return (
			<div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
				<p className="text-sm font-semibold text-slate-600">No agents found</p>
				<p className="text-xs text-slate-400 mt-1">Try a different search term.</p>
			</div>
		);
	}

	return (
		<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
			{agents.map((agent) => (
				<AgentCard key={agent.name} agent={agent} />
			))}
		</div>
	);
}