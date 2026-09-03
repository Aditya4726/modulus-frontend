const FEATURES = [
	{
		title: "Spec-driven trace capture",
		description: "Every agent execution is captured automatically, no manual test wiring.",
	},
	{
		title: "Diagnose in minutes, not days",
		description: "Root-cause analysis runs the moment a failure is detected.",
	},
	{
		title: "Replicate and fix issues from production",
		description: "Turn a production trace into a reproducible test, and prove the fix.",
	},
];

const LOOP_NODES = [
	{ label: "Trace", style: "top-0 left-1/2 -translate-x-1/2" },
	{ label: "Diagnose", style: "bottom-[26%] right-0" },
	{ label: "Fix & Verify", style: "bottom-[26%] left-0" },
];

export function ReliabilityLoop() {
	return (
		<section className="bg-white py-24 overflow-hidden">
			<div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
				{/* Left: copy */}
				<div>
					<h2 className="text-3xl sm:text-[2.6rem] leading-[1.2] font-extrabold">
						<span className="text-slate-400">
							AI agents fail silently, and nobody notices until it&apos;s too
							late.
						</span>{" "}
						<span className="text-slate-900">
							Modulus brings{" "}
						</span>
						<span className="text-blue-600">
							agent reliability engineering
						</span>
						<span className="text-slate-900"> to every execution.</span>
					</h2>

					<div className="mt-8 space-y-4 text-slate-500 text-base leading-relaxed">
						<p>
							An agent can take a hundred paths to the same goal — watching
							dashboards by hand catches only a few of them.
						</p>
						<p>
							The best teams treat every execution as a trace worth watching,
							so failures get caught, diagnosed, and fixed before a person
							ever has to look.
						</p>
					</div>

					<div className="flex flex-col gap-6 mt-10">
						{FEATURES.map((f, index) => {
							return (
								<div key={f.title} className="flex items-start gap-4">
									<span className="w-11 h-11 rounded-md border border-slate-300 bg-slate-50 flex items-center justify-center shrink-0">
										<span className="flex items-end gap-0.5 h-5" aria-hidden="true">
											{[0, 1, 2].map((bar) => (
												<span key={bar} className="w-1 bg-blue-600" style={{ height: `${9 + ((index + bar) % 3) * 5}px` }} />
											))}
										</span>
									</span>
									<div>
										<p className="text-sm font-bold text-slate-900">{f.title}</p>
										<p className="text-sm text-slate-500 mt-0.5">{f.description}</p>
									</div>
								</div>
							);
						})}
					</div>
				</div>

				{/* Right: loop diagram */}
				<div className="relative flex items-center justify-center min-h-110 bg-slate-50 border-y border-slate-200 lg:border-y-0 lg:border-l">
					<div className="relative w-95 h-95">
						{/* Arcs */}
						<svg
							viewBox="0 0 380 380"
							className="absolute inset-0 w-full h-full"
							fill="none"
						>
							<defs>
								<marker
									id="arrowHead"
									markerWidth="8"
									markerHeight="8"
									refX="4"
									refY="4"
									orient="auto"
								>
									<path d="M0,0 L8,4 L0,8 Z" fill="#2563eb" />
								</marker>
							</defs>

							{/* Trace -> Diagnose */}
							<path
								d="M 235 55 C 300 75, 330 140, 320 210"
								stroke="#2563eb"
								strokeWidth="2.5"
								markerEnd="url(#arrowHead)"
							/>
							{/* Diagnose -> Fix & Verify */}
							<path
								d="M 290 300 C 240 345, 140 345, 95 300"
								stroke="#2563eb"
								strokeWidth="2.5"
								markerEnd="url(#arrowHead)"
							/>
							{/* Fix & Verify -> Trace */}
							<path
								d="M 65 210 C 55 140, 85 75, 148 55"
								stroke="#2563eb"
								strokeWidth="2.5"
								markerEnd="url(#arrowHead)"
							/>
						</svg>

						{/* Nodes */}
						{LOOP_NODES.map((node) => (
							<div
								key={node.label}
								className={`absolute ${node.style} bg-white border border-slate-300 shadow-[0_8px_24px_rgba(15,23,42,0.08)] rounded-lg px-5 py-3`}
							>
								<span className="text-sm font-bold text-slate-900 whitespace-nowrap">
									{node.label}
								</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}