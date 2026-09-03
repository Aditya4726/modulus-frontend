import { Bot, CheckCircle2, Activity, Timer } from "lucide-react";

const STATS = [
	{ label: "Total agents", value: "4", icon: Bot, color: "#579bfc" },
	{ label: "Healthy", value: "3", icon: CheckCircle2, color: "#00c875" },
	{ label: "Executions", value: "12,482", icon: Activity, color: "#a25ddc" },
	{ label: "Avg. latency", value: "842ms", icon: Timer, color: "#fdab3d" },
];

export function AgentOverview() {
	return (
		<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
			{STATS.map((s) => {
				const Icon = s.icon;
				return (
					<div key={s.label} className="bg-white rounded-2xl border border-slate-200 p-5">
						<span
							className="w-9 h-9 rounded-lg flex items-center justify-center mb-4"
							style={{ background: `${s.color}1A` }}
						>
							<Icon className="w-4 h-4" style={{ color: s.color }} strokeWidth={2.25} />
						</span>
						<p className="text-2xl font-extrabold text-slate-900">{s.value}</p>
						<p className="text-xs text-slate-500 mt-1">{s.label}</p>
					</div>
				);
			})}
		</div>
	);
}