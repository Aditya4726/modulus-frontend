import { Boxes, CheckCircle2, GitBranch, Radio } from "lucide-react";

const integrations = [
	{ name: "OpenTelemetry", detail: "OTLP traces and spans", icon: Radio, state: "Connected" },
	{ name: "GitHub", detail: "Pull requests and review gates", icon: GitBranch, state: "Connected" },
	{ name: "Agent frameworks", detail: "LangChain, CrewAI, AutoGen, LlamaIndex", icon: Boxes, state: "Ready" },
];

export default function IntegrationsPage() {
	return <div className="mx-auto flex max-w-5xl flex-col gap-8"><PageHeader eyebrow="Platform" title="Integrations" description="Connect the systems that emit traces and review the fixes Modulus prepares." /><div className="grid gap-4 md:grid-cols-3">{integrations.map(({ name, detail, icon: Icon, state }) => <div key={name} className="rounded-xl border border-slate-200 bg-white p-5"><div className="flex items-start justify-between"><span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600"><Icon className="h-5 w-5" /></span><CheckCircle2 className="h-4 w-4 text-green-500" /></div><h2 className="mt-5 font-semibold text-slate-900">{name}</h2><p className="mt-1 text-sm text-slate-500">{detail}</p><p className="mt-5 text-xs font-semibold text-green-600">{state}</p></div>)}</div></div>;
}

function PageHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) { return <div><p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-600">{eyebrow}</p><h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">{title}</h1><p className="mt-1 text-sm text-slate-500">{description}</p></div>; }
