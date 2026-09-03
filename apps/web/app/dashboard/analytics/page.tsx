"use client";

import {
	Activity,
	AlertTriangle,
	ArrowDownRight,
	ArrowUpRight,
	CheckCircle2,
	Timer,
} from "lucide-react";
import { useState } from "react";

const RANGES = ["24h", "7d", "30d", "90d"] as const;

const FAILURE_TREND = [
	18, 22, 15, 27, 20, 31, 24, 19, 26, 14, 21, 17, 12, 9,
];

const AGENT_RELIABILITY = [
	{ name: "Research Agent", score: 99.8 },
	{ name: "Support Agent", score: 98.9 },
	{ name: "Refund Agent", score: 96.4 },
	{ name: "Data Agent", score: 94.2 },
];

const FAILURE_PATTERNS = [
	{ label: "Tool timeout", count: 41, pct: 34, color: "#fdab3d" },
	{ label: "Invalid tool arguments", count: 29, pct: 24, color: "#579bfc" },
	{ label: "Rate limit exceeded", count: 22, pct: 18, color: "#a25ddc" },
	{ label: "Null / unhandled response", count: 17, pct: 14, color: "#e2445c" },
	{ label: "Auth / permission error", count: 12, pct: 10, color: "#00c9c9" },
];

const MTTR_TREND = [
	{ week: "W1", minutes: 34 },
	{ week: "W2", minutes: 29 },
	{ week: "W3", minutes: 31 },
	{ week: "W4", minutes: 22 },
	{ week: "W5", minutes: 18 },
];

function OverviewCard({
	label,
	value,
	delta,
	trend,
	icon,
}: {
	label: string;
	value: string;
	delta: string;
	trend: "up" | "down";
	icon: React.ReactNode;
}) {
	const positive = trend === "up";
	const TrendIcon = positive ? ArrowUpRight : ArrowDownRight;

	return (
		<div className="rounded-xl border border-slate-200 bg-white p-5">
			<div className="flex items-center justify-between">
				<span className="text-sm text-slate-500">{label}</span>
				{icon}
			</div>
			<p className="mt-3 text-2xl font-bold text-slate-900">{value}</p>
			<p
				className={`mt-1 flex items-center gap-0.5 text-xs font-medium ${
					positive ? "text-green-600" : "text-red-500"
				}`}
			>
				<TrendIcon className="h-3 w-3" />
				{delta}
			</p>
		</div>
	);
}

export default function AnalyticsPage() {
	const [range, setRange] = useState<(typeof RANGES)[number]>("7d");
	const maxFailure = Math.max(...FAILURE_TREND);
	const maxMttr = Math.max(...MTTR_TREND.map((m) => m.minutes));

	return (
		<div className="space-y-6">
			<div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
				<div>
					<h1 className="text-xl font-bold text-slate-900">Analytics</h1>
					<p className="mt-1 text-sm text-slate-500">
						Reliability trends, MTTR, and failure patterns across every agent.
					</p>
				</div>
				<div className="flex items-center gap-1 rounded-lg border border-slate-200 p-1">
					{RANGES.map((r) => (
						<button
							key={r}
							onClick={() => setRange(r)}
							className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
								range === r
									? "bg-blue-600 text-white"
									: "text-slate-500 hover:bg-slate-50"
							}`}
						>
							{r}
						</button>
					))}
				</div>
			</div>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
				<OverviewCard
					label="Reliability score"
					value="98.6%"
					delta="+0.4% vs. last period"
					trend="up"
					icon={<CheckCircle2 className="h-5 w-5 text-green-500" />}
				/>
				<OverviewCard
					label="MTTR"
					value="18m"
					delta="-12% vs. last period"
					trend="up"
					icon={<Timer className="h-5 w-5 text-blue-500" />}
				/>
				<OverviewCard
					label="Change failure rate"
					value="4.2%"
					delta="+0.6% vs. last period"
					trend="down"
					icon={<AlertTriangle className="h-5 w-5 text-orange-500" />}
				/>
				<OverviewCard
					label="Incidents resolved"
					value="121"
					delta="+18 vs. last period"
					trend="up"
					icon={<Activity className="h-5 w-5 text-blue-500" />}
				/>
			</div>

			<div className="grid gap-4 lg:grid-cols-3">
				{/* Failure trend */}
				<div className="rounded-xl border border-slate-200 bg-white p-5 lg:col-span-2">
					<div className="mb-6 flex items-center justify-between">
						<div>
							<h2 className="font-semibold text-slate-900">Failure trend</h2>
							<p className="mt-1 text-xs text-slate-500">Failed executions per day</p>
						</div>
						<span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-500">
							Trending down
						</span>
					</div>
					<div className="flex h-36 items-end gap-2">
						{FAILURE_TREND.map((v, i) => (
							<div
								key={i}
								className="flex-1 rounded-t-sm bg-blue-100"
								style={{ height: `${(v / maxFailure) * 100}%` }}
							/>
						))}
					</div>
				</div>

				{/* Reliability by agent */}
				<div className="rounded-xl border border-slate-200 bg-white p-5">
					<h2 className="mb-5 font-semibold text-slate-900">Reliability by agent</h2>
					<div className="space-y-4">
						{AGENT_RELIABILITY.map((agent) => (
							<div key={agent.name}>
								<div className="mb-1.5 flex items-center justify-between">
									<span className="text-xs font-medium text-slate-600">{agent.name}</span>
									<span className="text-xs font-semibold text-slate-900">{agent.score}%</span>
								</div>
								<div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
									<div
										className="h-full rounded-full bg-blue-500"
										style={{ width: `${agent.score}%` }}
									/>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			<div className="grid gap-4 lg:grid-cols-3">
				{/* Failure patterns */}
				<div className="rounded-xl border border-slate-200 bg-white p-5 lg:col-span-2">
					<h2 className="mb-1 font-semibold text-slate-900">Top failure patterns</h2>
					<p className="mb-5 text-xs text-slate-500">
						Most common causes of agent failure this period
					</p>
					<div className="space-y-4">
						{FAILURE_PATTERNS.map((pattern) => (
							<div key={pattern.label} className="flex items-center gap-4">
								<span className="w-44 shrink-0 text-sm text-slate-700">
									{pattern.label}
								</span>
								<div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
									<div
										className="h-full rounded-full"
										style={{ width: `${pattern.pct}%`, background: pattern.color }}
									/>
								</div>
								<span className="w-10 shrink-0 text-right text-sm font-semibold text-slate-900">
									{pattern.count}
								</span>
							</div>
						))}
					</div>
				</div>

				{/* MTTR trend */}
				<div className="rounded-xl border border-slate-200 bg-white p-5">
					<h2 className="mb-1 font-semibold text-slate-900">MTTR trend</h2>
					<p className="mb-5 text-xs text-slate-500">Minutes to resolve, by week</p>
					<div className="flex h-28 items-end gap-3">
						{MTTR_TREND.map((m) => (
							<div key={m.week} className="flex flex-1 flex-col items-center gap-2">
								<div
									className="w-full rounded-t-sm bg-blue-500"
									style={{ height: `${(m.minutes / maxMttr) * 100}%` }}
								/>
								<span className="text-[10px] font-medium text-slate-400">{m.week}</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}