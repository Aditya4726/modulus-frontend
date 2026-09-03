"use client";

import Link from "next/link";
import {
	AlertTriangle,
	CheckCircle2,
	ChevronRight,
	Filter,
	Search,
	Search as SearchIcon,
	Timer,
} from "lucide-react";
import { useState } from "react";

const SEVERITIES = ["Critical", "High", "Medium", "Low"] as const;
const STATUSES = ["Open", "Diagnosing", "Fix in progress", "Resolved"] as const;
const STATUS_FILTERS = ["All", ...STATUSES] as const;

type Severity = (typeof SEVERITIES)[number];
type Status = (typeof STATUSES)[number];

const incidents: {
	id: string;
	title: string;
	agent: string;
	severity: Severity;
	status: Status;
	detected: string;
	mttr: string | null;
}[] = [
	{
		id: "inc_8f2a1c3d",
		title: "Null ref in tool_call: payments.charge",
		agent: "checkout-agent",
		severity: "Critical",
		status: "Fix in progress",
		detected: "12 min ago",
		mttr: null,
	},
	{
		id: "inc_5b91e2f0",
		title: "Timeout calling knowledge_base.search",
		agent: "support-agent",
		severity: "Medium",
		status: "Diagnosing",
		detected: "24 min ago",
		mttr: null,
	},
	{
		id: "inc_c4d7a8b1",
		title: "Rate limit exceeded on stripe.refund",
		agent: "refund-agent",
		severity: "High",
		status: "Fix in progress",
		detected: "41 min ago",
		mttr: null,
	},
	{
		id: "inc_92fe1a77",
		title: "Invalid schema in structured output",
		agent: "data-agent",
		severity: "High",
		status: "Open",
		detected: "1 hr ago",
		mttr: null,
	},
	{
		id: "inc_a1b3c9d2",
		title: "Duplicate tool call on retry",
		agent: "research-agent",
		severity: "Low",
		status: "Resolved",
		detected: "3 hr ago",
		mttr: "22m",
	},
	{
		id: "inc_e91a5c02",
		title: "Malformed JSON in agent output parser",
		agent: "data-agent",
		severity: "Medium",
		status: "Resolved",
		detected: "6 hr ago",
		mttr: "31m",
	},
];

const SEVERITY_STYLES: Record<Severity, string> = {
	Critical: "bg-red-50 text-red-600",
	High: "bg-orange-50 text-orange-600",
	Medium: "bg-blue-50 text-blue-600",
	Low: "bg-slate-100 text-slate-500",
};

const STATUS_STYLES: Record<Status, string> = {
	Open: "bg-red-50 text-red-600",
	Diagnosing: "bg-blue-50 text-blue-600",
	"Fix in progress": "bg-purple-50 text-purple-600",
	Resolved: "bg-green-50 text-green-600",
};

function SeverityBadge({ severity }: { severity: Severity }) {
	return (
		<span
			className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${SEVERITY_STYLES[severity]}`}
		>
			{severity}
		</span>
	);
}

function StatusBadge({ status }: { status: Status }) {
	return (
		<span
			className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLES[status]}`}
		>
			{status === "Resolved" && <CheckCircle2 className="h-3.5 w-3.5" />}
			{status}
		</span>
	);
}

export default function IncidentsPage() {
	const [search, setSearch] = useState("");
	const [statusFilter, setStatusFilter] =
		useState<(typeof STATUS_FILTERS)[number]>("All");

	const filtered = incidents.filter((inc) => {
		const matchesSearch =
			inc.title.toLowerCase().includes(search.toLowerCase()) ||
			inc.agent.toLowerCase().includes(search.toLowerCase());
		const matchesStatus = statusFilter === "All" || inc.status === statusFilter;
		return matchesSearch && matchesStatus;
	});

	const openCount = incidents.filter((i) => i.status !== "Resolved").length;
	const criticalCount = incidents.filter((i) => i.severity === "Critical").length;
	const resolvedToday = incidents.filter((i) => i.status === "Resolved").length;

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-xl font-bold text-slate-900">Incidents</h1>
				<p className="mt-1 text-sm text-slate-500">
					Every failure Modulus has caught, from first detection to resolution.
				</p>
			</div>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
				<OverviewCard
					label="Open incidents"
					value={String(openCount)}
					detail="Needs attention"
					icon={<AlertTriangle className="h-5 w-5 text-orange-500" />}
				/>
				<OverviewCard
					label="Critical"
					value={String(criticalCount)}
					detail="Highest priority"
					detailClassName="text-red-500"
					icon={<AlertTriangle className="h-5 w-5 text-red-500" />}
				/>
				<OverviewCard
					label="Avg. MTTR"
					value="18m"
					detail="-12% vs. last period"
					detailClassName="text-green-600"
					icon={<Timer className="h-5 w-5 text-blue-500" />}
				/>
				<OverviewCard
					label="Resolved"
					value={String(resolvedToday)}
					detail="Last 24 hours"
					detailClassName="text-green-600"
					icon={<CheckCircle2 className="h-5 w-5 text-green-500" />}
				/>
			</div>

			<div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
				<div className="flex flex-col gap-4 border-b border-slate-200 p-5 lg:flex-row lg:items-center lg:justify-between">
					<div>
						<h2 className="font-semibold text-slate-900">All incidents</h2>
						<p className="mt-1 text-xs text-slate-500">{filtered.length} incidents</p>
					</div>
					<div className="flex flex-col gap-3 sm:flex-row sm:items-center">
						<div className="relative w-full sm:w-72">
							<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
							<input
								type="text"
								placeholder="Search by title or agent..."
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
							/>
						</div>
						<div className="flex flex-wrap items-center gap-1.5 rounded-lg border border-slate-200 p-1">
							<Filter className="ml-1.5 h-3.5 w-3.5 text-slate-400" />
							{STATUS_FILTERS.map((status) => (
								<button
									key={status}
									onClick={() => setStatusFilter(status)}
									className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition ${
										statusFilter === status
											? "bg-blue-600 text-white"
											: "text-slate-500 hover:bg-slate-50"
									}`}
								>
									{status}
								</button>
							))}
						</div>
					</div>
				</div>

				<div className="hidden grid-cols-[1fr_110px_150px_120px_80px_40px] gap-4 border-b border-slate-100 bg-slate-50/60 px-5 py-3 text-xs font-medium uppercase tracking-wide text-slate-400 lg:grid">
					<span>Incident</span>
					<span>Severity</span>
					<span>Status</span>
					<span>Detected</span>
					<span>MTTR</span>
					<span />
				</div>

				<div className="divide-y divide-slate-100">
					{filtered.map((inc) => (
						<Link
							key={inc.id}
							href={`/incidents/${inc.id}`}
							className="group grid grid-cols-1 gap-4 p-5 transition hover:bg-slate-50 lg:grid-cols-[1fr_110px_150px_120px_80px_40px] lg:items-center"
						>
							<div className="flex items-center gap-3">
								<div className="rounded-xl bg-red-50 p-2.5">
									<AlertTriangle className="h-5 w-5 text-red-500" />
								</div>
								<div>
									<p className="text-sm font-medium text-slate-900">{inc.title}</p>
									<p className="mt-1 font-mono text-xs text-slate-400">{inc.agent}</p>
								</div>
							</div>
							<div>
								<p className="mb-1 text-xs text-slate-400 lg:hidden">Severity</p>
								<SeverityBadge severity={inc.severity} />
							</div>
							<div>
								<p className="mb-1 text-xs text-slate-400 lg:hidden">Status</p>
								<StatusBadge status={inc.status} />
							</div>
							<div>
								<p className="mb-1 text-xs text-slate-400 lg:hidden">Detected</p>
								<p className="text-sm font-medium text-slate-700">{inc.detected}</p>
							</div>
							<div>
								<p className="mb-1 text-xs text-slate-400 lg:hidden">MTTR</p>
								<p className="text-sm font-medium text-slate-700">{inc.mttr ?? "—"}</p>
							</div>
							<div className="hidden justify-end lg:flex">
								<ChevronRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-500" />
							</div>
						</Link>
					))}
					{filtered.length === 0 && (
						<div className="p-12 text-center">
							<SearchIcon className="mx-auto h-8 w-8 text-slate-300" />
							<p className="mt-3 text-sm font-medium text-slate-700">No incidents found</p>
							<p className="mt-1 text-xs text-slate-400">Try another search term or filter.</p>
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