import { Bot } from "lucide-react";

export type Agent = {
	name: string;
	status: "healthy" | "degraded";
	reliability: number;
	executions: string;
	latency: string;
};

export function AgentCard({ agent }: { agent: Agent }) {
	const statusColor = agent.status === "healthy" ? "#00c875" : "#fdab3d";

	return (
		<div className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-slate-300 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)] transition">
			<div className="flex items-center justify-between mb-5">
				<div className="flex items-center gap-3">
					<span className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
						<Bot className="w-4.5 h-4.5 text-slate-600" strokeWidth={2.1} />
					</span>
					<div>
						<p className="text-sm font-bold text-slate-900">{agent.name}</p>
						<div className="flex items-center gap-1.5 mt-0.5">
							<span
								className="w-1.5 h-1.5 rounded-full"
								style={{ background: statusColor }}
							/>
							<span className="text-xs font-semibold" style={{ color: statusColor }}>
								{agent.status === "healthy" ? "Healthy" : "Degraded"}
							</span>
						</div>
					</div>
				</div>
			</div>

			<div className="mb-4">
				<div className="flex items-center justify-between mb-1.5">
					<span className="text-xs font-medium text-slate-500">Reliability</span>
					<span className="text-xs font-bold text-slate-900">{agent.reliability}%</span>
				</div>
				<div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
					<div
						className="h-full rounded-full"
						style={{ width: `${agent.reliability}%`, background: statusColor }}
					/>
				</div>
			</div>

			<div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100">
				<div>
					<p className="text-sm font-bold text-slate-900">{agent.executions}</p>
					<p className="text-xs text-slate-400 mt-0.5">Executions</p>
				</div>
				<div>
					<p className="text-sm font-bold text-slate-900">{agent.latency}</p>
					<p className="text-xs text-slate-400 mt-0.5">Avg. latency</p>
				</div>
			</div>
		</div>
	);
}