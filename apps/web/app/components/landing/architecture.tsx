import {
	Boxes,
	Workflow,
	Brain,
	GitPullRequest,
	ArrowDown,
	Gauge,
	ShieldCheck,
	KeyRound,
} from "lucide-react";
import {
	SiDocker,
	SiGithub,
	SiLangchain,
	SiCrewai,
	SiNextdotjs,
	SiNodedotjs,
	SiOpentelemetry,
	SiPostgresql,
	SiQdrant,
	SiRedis,
} from "react-icons/si";
import type { IconType } from "react-icons";

const TECHNOLOGY_ICONS: Record<string, IconType | undefined> = {
	LangChain: SiLangchain,
	CrewAI: SiCrewai,
	// TODO: add the official AutoGen/OpenAI logo when a verified brand asset is available.
	AutoGen: undefined,
	// TODO: add the official LlamaIndex logo when a verified brand asset is available.
	LlamaIndex: undefined,
	"OTel SDK": SiOpentelemetry,
	"OpenTelemetry": SiOpentelemetry,
	"OpenTelemetry Collector": SiOpentelemetry,
	Redis: SiRedis,
	"Redis Streams": SiRedis,
	PostgreSQL: SiPostgresql,
	Docker: SiDocker,
	GitHub: SiGithub,
	"Next.js": SiNextdotjs,
	"Node.js": SiNodedotjs,
	Qdrant: SiQdrant,
};

const LAYERS = [
	{
		title: "Instrumentation layer",
		subtitle: "OpenTelemetry-first",
		icon: Boxes,
		color: "#579bfc",
		items: ["LangChain", "CrewAI", "AutoGen", "LlamaIndex", "OTel SDK", "Next.js", "Node.js"],
	},
	{
		title: "Ingestion & collection",
		subtitle: "Async, buffered, durable",
		icon: Workflow,
		color: "#2563eb",
		items: [
			"OTel Collector",
			"Validation & normalization",
			"Canonical model",
			"Redis Streams",
			"PostgreSQL",
			"Docker",
		],
	},
	{
		title: "Intelligence & remediation",
		subtitle: "Async worker pipeline",
		icon: Brain,
		color: "#fdab3d",
		items: [
			"Failure detection",
			"Root-cause analysis",
			"Failure reproduction",
			"Fix generation",
			"Verification & testing",
			"Risk assessment",
			"Qdrant",
		],
	},
	{
		title: "GitHub & human in the loop",
		subtitle: "Nothing ships without review",
		icon: GitPullRequest,
		color: "#00c875",
		items: ["GitHub", "Create branch", "Commit with context", "Open pull request", "Human review", "Merge & deploy"],
	},
];

const SIDE_PANELS = [
	{
		title: "Observability & analytics",
		icon: Gauge,
		color: "#579bfc",
		items: ["Reliability overview", "Failure trends & patterns", "MTTR / DORA metrics", "Dashboards & alerts"],
	},
	{
		title: "Platform services",
		icon: KeyRound,
		color: "#2563eb",
		items: ["Auth & RBAC", "Organizations & projects", "API keys & permissions", "Audit logs & webhooks"],
	},
	{
		title: "Security & safety",
		icon: ShieldCheck,
		color: "#00c875",
		items: ["PII redaction", "Secret detection", "Sandbox isolation", "Human approval gate"],
	},
];

export function Architecture() {
	return (
		<section id="architecture" className="bg-white py-24">
			<div className="max-w-7xl mx-auto px-6">
				<div className="max-w-xl mb-14">
					<p className="text-sm font-semibold text-blue-600 mb-2">Architecture</p>
					<h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
						One pipeline, from telemetry to a merged fix.
					</h2>
					<p className="text-slate-500 text-base mt-3">
						Every layer is independently scalable — traces flow in over
						OpenTelemetry, and a fix flows out as a reviewed pull request.
					</p>
				</div>

				<div className="grid lg:grid-cols-[1fr_300px] gap-10">
					{/* Layer stack */}
					<div className="flex flex-col items-stretch">
						{LAYERS.map((layer, i) => {
							const Icon = layer.icon;
							return (
								<div key={layer.title}>
									<div className="rounded-md border border-slate-200 overflow-hidden">
										<div
											className="flex items-center gap-3 px-5 py-4 border-b border-slate-200"
											style={{ background: `${layer.color}0D` }}
										>
											<span
												className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
												style={{ background: `${layer.color}22` }}
											>
												<Icon className="w-4.5 h-4.5" style={{ color: layer.color }} strokeWidth={2.25} />
											</span>
											<div>
												<p className="text-sm font-bold text-slate-900">{layer.title}</p>
												<p className="text-xs text-slate-500">{layer.subtitle}</p>
											</div>
										</div>
										<div className="flex flex-wrap gap-2 px-5 py-4 bg-white">
											{layer.items.map((item) => (
												<span
													key={item}
														className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 rounded-full px-3 py-1.5"
												>
														{(() => {
															const BrandIcon = TECHNOLOGY_ICONS[item];
															return BrandIcon ? <BrandIcon className="w-3.5 h-3.5" aria-hidden="true" /> : null;
														})()}
													{item}
												</span>
											))}
										</div>
									</div>
									{i < LAYERS.length - 1 && (
										<div className="flex justify-center py-2">
											<ArrowDown className="w-4 h-4 text-slate-300" />
										</div>
									)}
								</div>
							);
						})}
					</div>

					{/* Side panels */}
					<div className="flex flex-col gap-5">
						{SIDE_PANELS.map((panel) => {
							const Icon = panel.icon;
							return (
								<div key={panel.title} className="rounded-xl border border-slate-200 p-5">
									<div className="flex items-center gap-2.5 mb-3.5">
										<span
											className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
											style={{ background: `${panel.color}1A` }}
										>
											<Icon className="w-4 h-4" style={{ color: panel.color }} strokeWidth={2.25} />
										</span>
										<p className="text-sm font-bold text-slate-900">{panel.title}</p>
									</div>
									<ul className="flex flex-col gap-2">
										{panel.items.map((item) => (
											<li key={item} className="text-xs text-slate-500 flex items-center gap-2">
												<span className="w-1 h-1 rounded-full bg-slate-300 shrink-0" />
												{item}
											</li>
										))}
									</ul>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}