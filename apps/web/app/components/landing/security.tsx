const CONTROLS = [
	{
		title: "PII redaction",
		description: "Personal data is stripped from traces before it's ever stored.",
	},
	{
		title: "Secret detection",
		description: "API keys, tokens, and credentials are caught and masked automatically.",
	},
	{
		title: "Sandbox isolation",
		description: "Failures are reproduced and fixes are tested in isolated containers.",
	},
	{
		title: "Policy guardrails",
		description: "Constrained generation keeps fixes inside rules you define.",
	},
	{
		title: "Human approval gate",
		description: "No fix reaches production without a person reviewing it first.",
	},
];

export function Security() {
	return (
		<section id="security" className="bg-slate-900 py-24">
			<div className="max-w-7xl mx-auto px-6">
				<div className="max-w-xl mb-14">
					<p className="text-sm font-semibold text-cyan-300 mb-2">Security & safety</p>
					<h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
						Autonomous, within limits you set.
					</h2>
					<p className="text-slate-400 text-base mt-3">
						Modulus can diagnose and draft a fix on its own — it never merges
						one without a human in the loop.
					</p>
				</div>

				<div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
					{CONTROLS.map((c, index) => {
						return (
							<div
								key={c.title}
								className="bg-white/5 border border-white/10 rounded-sm p-5 hover:bg-white/[0.07] transition"
							>
								<div className="flex items-center gap-2 mb-4" aria-hidden="true">
									<span className="font-mono text-[10px] text-cyan-300">POL-{String(index + 1).padStart(2, "0")}</span>
									<span className="h-px flex-1 bg-cyan-300/40" />
									<span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
								</div>
								<h3 className="text-sm font-bold text-white mb-1.5">{c.title}</h3>
								<p className="text-sm text-slate-400 leading-relaxed">{c.description}</p>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}