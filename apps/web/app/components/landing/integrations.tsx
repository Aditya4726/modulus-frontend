import CrewAIColor from "@lobehub/icons/es/CrewAI/components/Color";
import LangChainColor from "@lobehub/icons/es/LangChain/components/Color";
import LlamaIndexColor from "@lobehub/icons/es/LlamaIndex/components/Color";
import { SiOpentelemetry } from "react-icons/si";

const ADAPTERS = [
	{ label: "LangChain", color: "#00c875", mode: "Auto-instrumentation", logo: "langchain" },
	{ label: "CrewAI", color: "#fdab3d", mode: "Auto-instrumentation", logo: "crewai" },
	// TODO: no verified AutoGen logo found.
	{ label: "AutoGen", color: "#0f172a", mode: "Auto-instrumentation", code: "AG" },
	{ label: "LlamaIndex", color: "#2563eb", mode: "Auto-instrumentation", logo: "llamaindex" },
	{ label: "OpenTelemetry SDK", color: "#579bfc", mode: "Generic / fallback", logo: "opentelemetry" },
	{ label: "Modulus SDK", color: "#2563eb", mode: "Generic / fallback", code: "M" },
];

export function Integrations() {
	return (
		<section className="bg-slate-50 py-24">
			<div className="max-w-7xl mx-auto px-6">
				<div className="max-w-xl mb-14">
					<p className="text-sm font-semibold text-blue-600 mb-2">Integrations</p>
					<h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
						Works with the frameworks you already use.
					</h2>
					<p className="text-slate-500 text-base mt-3">
						Auto-instrumentation for the popular agent frameworks, with a
						generic OpenTelemetry path for everything else.
					</p>
				</div>

				<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
					{ADAPTERS.map((adapter) => (
						<div
							key={adapter.label}
							className="flex items-center gap-3.5 bg-white rounded-md border border-slate-200 p-4 hover:border-blue-300 transition"
						>
							<span
								className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
								style={{ borderLeft: `2px solid ${adapter.color}` }}
							>
								{adapter.logo === "langchain" && <LangChainColor size={22} />}
								{adapter.logo === "crewai" && <CrewAIColor size={22} />}
								{adapter.logo === "llamaindex" && <LlamaIndexColor size={22} />}
								{adapter.logo === "opentelemetry" && (
									<SiOpentelemetry size={20} color={adapter.color} aria-hidden="true" />
								)}
								{adapter.code && (
									<span className="text-[10px] font-mono font-bold" style={{ color: adapter.color }}>
										{adapter.code}
									</span>
								)}
							</span>
							<div>
								<p className="text-sm font-bold text-slate-900">{adapter.label}</p>
								<p className="text-xs text-slate-400">{adapter.mode}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
