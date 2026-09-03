"use client";

import Link from "next/link";
import {
	Activity,
	CheckCircle2,
	ChevronRight,
	Clock3,
	Filter,
	Loader2,
	Search,
	XCircle,
	Zap,
} from "lucide-react";
import { useState } from "react";

const executions = [
	{
		id: "exec_8f2a1c3d",
		agent: "Research Agent",
		status: "Success",
		duration: "1.8s",
		toolCalls: 4,
		started: "2 min ago",
	},
	{
		id: "exec_5b91e2f0",
		agent: "Support Agent",
		status: "Success",
		duration: "2.4s",
		toolCalls: 2,
		started: "6 min ago",
	},
	{
		id: "exec_c4d7a8b1",
		agent: "Data Agent",
		status: "Failed",
		duration: "3.9s",
		toolCalls: 5,
		started: "11 min ago",
	},
	{
		id: "exec_92fe1a77",
		agent: "Research Agent",
		status: "Running",
		duration: "0.6s",
		toolCalls: 1,
		started: "just now",
	},
	{
		id: "exec_a1b3c9d2",
		agent: "Support Agent",
		status: "Success",
		duration: "1.5s",
		toolCalls: 3,
		started: "18 min ago",
	},
];

const STATUS_FILTERS = ["All", "Success", "Failed", "Running"] as const;

function StatusBadge({ status }: { status: string }) {
	if (status === "Success") {
		return (
			<span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-600">
				<CheckCircle2 className="h-3.5 w-3.5" />
				Success
			</span>
		);
	}
	if (status === "Failed") {
		return (
			<span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-600">
				<XCircle className="h-3.5 w-3.5" />
				Failed
			</span>
		);
	}
	return (
		<span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-600">
			<Loader2 className="h-3.5 w-3.5 animate-spin" />
			Running
		</span>
	);
}

export default function ExecutionsPage() {
	const [search, setSearch] = useState("");
	const [statusFilter, setStatusFilter] =
		useState<(typeof STATUS_FILTERS)[number]>("All");

	const filtered = executions.filter((exec) => {
		const matchesSearch =
			exec.agent.toLowerCase().includes(search.toLowerCase()) ||
			exec.id.toLowerCase().includes(search.toLowerCase());
		const matchesStatus = statusFilter === "All" || exec.status === statusFilter;
		return matchesSearch && matchesStatus;
	});

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-xl font-bold text-slate-900">Executions</h1>
				<p className="mt-1 text-sm text-slate-500">
					Every agent run Modulus has captured, in real time.
				</p>
			</div>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
				<OverviewCard
					label="Total Executions"
					value="12,482"
					detail="Last 24 hours"
					icon={<Activity className="h-5 w-5 text-blue-500" />}
				/>
				<OverviewCard
					label="Success Rate"
					value="98.6%"
					detail="+0.4% vs. yesterday"
					detailClassName="text-green-600"
					icon={<CheckCircle2 className="h-5 w-5 text-green-500" />}
				/>
				<OverviewCard
					label="Avg. Duration"
					value="2.1s"
					detail="Across all agents"
					icon={<Clock3 className="h-5 w-5 text-blue-500" />}
				/>
				<OverviewCard
					label="Failed"
					value="27"
					detail="Last 24 hours"
					detailClassName="text-red-500"
					icon={<XCircle className="h-5 w-5 text-red-500" />}
				/>
			</div>

			<div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
				<div className="flex flex-col gap-4 border-b border-slate-200 p-5 lg:flex-row lg:items-center lg:justify-between">
					<div>
						<h2 className="font-semibold text-slate-900">All Executions</h2>
						<p className="mt-1 text-xs text-slate-500">{filtered.length} executions</p>
					</div>
					<div className="flex flex-col gap-3 sm:flex-row sm:items-center">
						<div className="relative w-full sm:w-72">
							<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
							<input
								type="text"
								placeholder="Search by agent or execution id..."
								value={search}
								onChange={(event) => setSearch(event.target.value)}
								className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
							/>
						</div>
						<div className="flex items-center gap-1.5 rounded-lg border border-slate-200 p-1">
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

				<div className="hidden grid-cols-[1fr_120px_100px_100px_120px_40px] gap-4 border-b border-slate-100 bg-slate-50/60 px-5 py-3 text-xs font-medium uppercase tracking-wide text-slate-400 lg:grid">
					<span>Execution</span>
					<span>Status</span>
					<span>Duration</span>
					<span>Tool calls</span>
					<span>Started</span>
					<span />
				</div>

				<div className="divide-y divide-slate-100">
					{filtered.map((exec) => (
						<Link
							key={exec.id}
							href={`/dashboard/executions/${exec.id}`}
							className="group grid grid-cols-1 gap-4 p-5 transition hover:bg-slate-50 lg:grid-cols-[1fr_120px_100px_100px_120px_40px] lg:items-center"
						>
							<div className="flex items-center gap-3">
								<div className="rounded-xl bg-blue-50 p-2.5">
									<Zap className="h-5 w-5 text-blue-600" />
								</div>
								<div>
									<p className="text-sm font-medium text-slate-900">{exec.agent}</p>
									<p className="mt-1 font-mono text-xs text-slate-400">{exec.id}</p>
								</div>
							</div>
							<div>
								<p className="mb-1 text-xs text-slate-400 lg:hidden">Status</p>
								<StatusBadge status={exec.status} />
							</div>
							<div>
								<p className="mb-1 text-xs text-slate-400 lg:hidden">Duration</p>
								<p className="text-sm font-medium text-slate-700">{exec.duration}</p>
							</div>
							<div>
								<p className="mb-1 text-xs text-slate-400 lg:hidden">Tool calls</p>
								<p className="text-sm font-medium text-slate-700">{exec.toolCalls}</p>
							</div>
							<div>
								<p className="mb-1 text-xs text-slate-400 lg:hidden">Started</p>
								<p className="text-sm font-medium text-slate-700">{exec.started}</p>
							</div>
							<div className="hidden justify-end lg:flex">
								<ChevronRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-500" />
							</div>
						</Link>
					))}
					{filtered.length === 0 && (
						<div className="p-12 text-center">
							<Activity className="mx-auto h-8 w-8 text-slate-300" />
							<p className="mt-3 text-sm font-medium text-slate-700">No executions found</p>
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