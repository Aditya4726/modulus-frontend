"use client";

import Link from "next/link";
import {
	CheckCircle2,
	ChevronRight,
	GitPullRequest,
	Search,
	Sparkles,
	Timer,
	Wrench,
} from "lucide-react";
import { useState } from "react";

const STAGES = [
	{ key: "diagnosing", label: "Diagnosing", color: "#579bfc" },
	{ key: "reproducing", label: "Reproducing", color: "#a25ddc" },
	{ key: "generating_fix", label: "Generating fix", color: "#fdab3d" },
	{ key: "verifying", label: "Verifying", color: "#00c9c9" },
	{ key: "awaiting_approval", label: "Awaiting approval", color: "#e2445c" },
	{ key: "merged", label: "Merged", color: "#00c875" },
] as const;

const remediations = [
	{
		id: "rem_8f2a1c3d",
		incident: "Null ref in tool_call: payments.charge",
		agent: "checkout-agent",
		stage: "generating_fix",
		confidence: 91,
		started: "12 min ago",
	},
	{
		id: "rem_5b91e2f0",
		incident: "Timeout calling knowledge_base.search",
		agent: "support-agent",
		stage: "verifying",
		confidence: 87,
		started: "24 min ago",
	},
	{
		id: "rem_c4d7a8b1",
		incident: "Rate limit exceeded on stripe.refund",
		agent: "refund-agent",
		stage: "awaiting_approval",
		confidence: 94,
		started: "41 min ago",
	},
	{
		id: "rem_92fe1a77",
		incident: "Invalid schema in structured output",
		agent: "data-agent",
		stage: "reproducing",
		confidence: 68,
		started: "1 hr ago",
	},
	{
		id: "rem_a1b3c9d2",
		incident: "Duplicate tool call on retry",
		agent: "research-agent",
		stage: "merged",
		confidence: 96,
		started: "3 hr ago",
	},
];

function StageBadge({ stage }: { stage: string }) {
	const meta = STAGES.find((s) => s.key === stage) ?? STAGES[0];
	return (
		<span
			className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
			style={{ background: `${meta.color}1A`, color: meta.color }}
		>
			<span className="h-1.5 w-1.5 rounded-full" style={{ background: meta.color }} />
			{meta.label}
		</span>
	);
}

export default function RemediationPage() {
	const [search, setSearch] = useState("");

	const filtered = remediations.filter(
		(r) =>
			r.incident.toLowerCase().includes(search.toLowerCase()) ||
			r.agent.toLowerCase().includes(search.toLowerCase()),
	);

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-xl font-bold text-slate-900">Remediation</h1>
				<p className="mt-1 text-sm text-slate-500">
					Every fix Modulus is diagnosing, generating, or verifying right now.
				</p>
			</div>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
				<OverviewCard
					label="Active remediations"
					value="5"
					detail="In progress"
					icon={<Wrench className="h-5 w-5 text-blue-500" />}
				/>
				<OverviewCard
					label="Fixes verified"
					value="18"
					detail="Last 24 hours"
					detailClassName="text-green-600"
					icon={<CheckCircle2 className="h-5 w-5 text-green-500" />}
				/>
				<OverviewCard
					label="Avg. fix time"
					value="14m"
					detail="Detect to PR opened"
					icon={<Timer className="h-5 w-5 text-blue-500" />}
				/>
				<OverviewCard
					label="Avg. confidence"
					value="87%"
					detail="Across active fixes"
					icon={<Sparkles className="h-5 w-5 text-purple-500" />}
				/>
			</div>

			<div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
				<div className="flex flex-col gap-4 border-b border-slate-200 p-5 lg:flex-row lg:items-center lg:justify-between">
					<div>
						<h2 className="font-semibold text-slate-900">All remediations</h2>
						<p className="mt-1 text-xs text-slate-500">{filtered.length} remediations</p>
					</div>
					<div className="relative w-full lg:w-80">
						<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
						<input
							type="text"
							placeholder="Search by incident or agent..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
						/>
					</div>
				</div>

				<div className="hidden grid-cols-[1fr_150px_100px_120px_40px] gap-4 border-b border-slate-100 bg-slate-50/60 px-5 py-3 text-xs font-medium uppercase tracking-wide text-slate-400 lg:grid">
					<span>Incident</span>
					<span>Stage</span>
					<span>Confidence</span>
					<span>Started</span>
					<span />
				</div>

				<div className="divide-y divide-slate-100">
					{filtered.map((rem) => (
						<Link
							key={rem.id}
							href={`/remediation/${rem.id}`}
							className="group grid grid-cols-1 gap-4 p-5 transition hover:bg-slate-50 lg:grid-cols-[1fr_150px_100px_120px_40px] lg:items-center"
						>
							<div className="flex items-center gap-3">
								<div className="rounded-xl bg-blue-50 p-2.5">
									<GitPullRequest className="h-5 w-5 text-blue-600" />
								</div>
								<div>
									<p className="text-sm font-medium text-slate-900">{rem.incident}</p>
									<p className="mt-1 font-mono text-xs text-slate-400">{rem.agent}</p>
								</div>
							</div>
							<div>
								<p className="mb-1 text-xs text-slate-400 lg:hidden">Stage</p>
								<StageBadge stage={rem.stage} />
							</div>
							<div>
								<p className="mb-1 text-xs text-slate-400 lg:hidden">Confidence</p>
								<p className="text-sm font-semibold text-slate-900">{rem.confidence}%</p>
							</div>
							<div>
								<p className="mb-1 text-xs text-slate-400 lg:hidden">Started</p>
								<p className="text-sm font-medium text-slate-700">{rem.started}</p>
							</div>
							<div className="hidden justify-end lg:flex">
								<ChevronRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-500" />
							</div>
						</Link>
					))}
					{filtered.length === 0 && (
						<div className="p-12 text-center">
							<Wrench className="mx-auto h-8 w-8 text-slate-300" />
							<p className="mt-3 text-sm font-medium text-slate-700">No remediations found</p>
							<p className="mt-1 text-xs text-slate-400">Try another search term.</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

function OverviewCard({
	label,
	value,
	detail,
	icon,
	detailClassName = "text-slate-400",
}: {
	label: string;
	value: string;
	detail: string;
	icon: React.ReactNode;
	detailClassName?: string;
}) {
	return (
		<div className="rounded-xl border border-slate-200 bg-white p-5">
			<div className="flex items-center justify-between">
				<span className="text-sm text-slate-500">{label}</span>
				{icon}
			</div>
			<p className="mt-3 text-2xl font-bold text-slate-900">{value}</p>
			<p className={`mt-1 text-xs ${detailClassName}`}>{detail}</p>
		</div>
	);
}