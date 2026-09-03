const FEATURES = [
	{
		label: "Execution observability",
		description: "Watch every agent run as it happens, not after the fact.",
	},
	{
		label: "Execution & trace tracking",
		description: "Every step, span, and decision your agents make, recorded.",
	},
	{
		label: "Tool-call monitoring",
		description: "See which tools ran, with what inputs, and what came back.",
	},
	{
		label: "Sensitive-data redaction",
		description: "PII and secrets are stripped before anything is stored.",
	},
	{
		label: "OpenTelemetry-first ingestion",
		description: "Standard OTLP in — no proprietary lock-in on the wire.",
	},
	{
		label: "Async ingestion",
		description: "Redis Streams and BullMQ absorb bursts without dropping events.",
	},
	{
		label: "Postgres + Prisma",
		description: "Durable, queryable storage for every trace and incident.",
	},
	{
		label: "API keys & sessions",
		description: "Instrument production agents and log in as a team, safely.",
	},
	{
		label: "Org & role-based access",
		description: "Projects, teams, and permissions that match how you work.",
	},
	{
		label: "TypeScript SDK",
		description: "Instrument any agent or framework in a couple of lines.",
	},
	{
		label: "Modular monorepo",
		description: "Clean workspace boundaries between every service.",
	},
	{
		label: "Turborepo builds",
		description: "Fast, cached builds across the whole platform.",
	},
	{
		label: "Full-stack dashboard",
		description: "One place to see reliability across every agent you run.",
	},
];

export function Features() {
	return (
		<section id="features" className="bg-slate-50 py-24">
			<div className="max-w-7xl mx-auto px-6">
				<div className="max-w-xl mb-14">
					<p className="text-sm font-semibold text-blue-600 mb-2">Platform</p>
					<h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
						Everything reliability engineering needs, built in.
					</h2>
					<p className="text-slate-500 text-base mt-3">
						Modulus is a full observability and remediation stack for agentic
						applications — not another dashboard bolted on top.
					</p>
				</div>

				<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
					{FEATURES.map((f, i) => {
						return (
							<div
								key={f.label}
								className="bg-white rounded-lg border border-slate-200 p-6 hover:border-blue-300 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)] transition"
							>
								<div className="flex items-center gap-2 mb-4" aria-hidden="true">
									<span className="font-mono text-[10px] font-bold text-blue-600">{String(i + 1).padStart(2, "0")}</span>
									<span className="h-px w-12 bg-blue-200" />
									<span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
								</div>
								<h3 className="text-sm font-bold text-slate-900 mb-1.5">{f.label}</h3>
								<p className="text-sm text-slate-500 leading-relaxed">{f.description}</p>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}