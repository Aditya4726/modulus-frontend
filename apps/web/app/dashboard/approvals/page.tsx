"use client";

import {
	CheckCircle2,
	Clock3,
	ExternalLink,
	Sparkles,
	ThumbsDown,
	ThumbsUp,
	Timer,
	XCircle,
} from "lucide-react";
import { useState } from "react";

type ReviewStatus = "pending" | "approved" | "rejected";

type Approval = {
	id: string;
	incident: string;
	agent: string;
	confidence: number;
	risk: "Low" | "Medium" | "High";
	prUrl: string;
	waiting: string;
	status: ReviewStatus;
};

const INITIAL_APPROVALS: Approval[] = [
	{
		id: "apr_c4d7a8b1",
		incident: "Rate limit exceeded on stripe.refund",
		agent: "refund-agent",
		confidence: 94,
		risk: "Low",
		prUrl: "github.com/acme/refund-agent/pull/128",
		waiting: "41 min",
		status: "pending",
	},
	{
		id: "apr_3f8e21bb",
		incident: "Malformed JSON in agent output parser",
		agent: "data-agent",
		confidence: 79,
		risk: "Medium",
		prUrl: "github.com/acme/data-agent/pull/94",
		waiting: "1 hr",
		status: "pending",
	},
	{
		id: "apr_e91a5c02",
		incident: "Retried tool call sends duplicate charge",
		agent: "checkout-agent",
		confidence: 88,
		risk: "High",
		prUrl: "github.com/acme/checkout-agent/pull/211",
		waiting: "2 hr",
		status: "pending",
	},
];

const RISK_STYLES: Record<Approval["risk"], string> = {
	Low: "bg-green-50 text-green-600",
	Medium: "bg-orange-50 text-orange-600",
	High: "bg-red-50 text-red-600",
};

export default function ApprovalsPage() {
	const [approvals, setApprovals] = useState<Approval[]>(INITIAL_APPROVALS);

	function setStatus(id: string, status: ReviewStatus) {
		setApprovals((prev) =>
			prev.map((a) => (a.id === id ? { ...a, status } : a)),
		);
	}

	const pending = approvals.filter((a) => a.status === "pending");
	const approved = approvals.filter((a) => a.status === "approved");
	const rejected = approvals.filter((a) => a.status === "rejected");

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-xl font-bold text-slate-900">Approvals</h1>
				<p className="mt-1 text-sm text-slate-500">
					Fixes Modulus has generated and verified — nothing merges without your sign-off.
				</p>
			</div>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
				<OverviewCard
					label="Pending review"
					value={String(pending.length)}
					detail="Awaiting your decision"
					icon={<Clock3 className="h-5 w-5 text-orange-500" />}
				/>
				<OverviewCard
					label="Approved"
					value={String(approved.length)}
					detail="This session"
					detailClassName="text-green-600"
					icon={<CheckCircle2 className="h-5 w-5 text-green-500" />}
				/>
				<OverviewCard
					label="Avg. review time"
					value="6m"
					detail="Once assigned to a reviewer"
					icon={<Timer className="h-5 w-5 text-blue-500" />}
				/>
			</div>

			<div className="rounded-xl border border-slate-200 bg-white">
				<div className="border-b border-slate-200 p-5">
					<h2 className="font-semibold text-slate-900">Pending your review</h2>
					<p className="mt-1 text-xs text-slate-500">
						{pending.length} fix{pending.length === 1 ? "" : "es"} waiting
					</p>
				</div>

				<div className="divide-y divide-slate-100">
					{pending.map((item) => (
						<div key={item.id} className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between">
							<div className="flex items-start gap-3">
								<div className="rounded-xl bg-blue-50 p-2.5">
									<Sparkles className="h-5 w-5 text-blue-600" />
								</div>
								<div>
									<p className="text-sm font-medium text-slate-900">{item.incident}</p>
									<div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-slate-500">
										<span className="font-mono">{item.agent}</span>
										<span
											className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-medium ${RISK_STYLES[item.risk]}`}
										>
											{item.risk} risk
										</span>
										<span>{item.confidence}% confidence</span>
										<span>Waiting {item.waiting}</span>
									</div>
									<a
										href={`https://${item.prUrl}`}
										target="_blank"
										rel="noreferrer"
										className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700"
									>
										{item.prUrl}
										<ExternalLink className="h-3 w-3" />
									</a>
								</div>
							</div>

							<div className="flex items-center gap-2 lg:shrink-0">
								<button
									onClick={() => setStatus(item.id, "rejected")}
									className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3.5 py-2 text-sm font-medium text-slate-600 transition hover:bg-red-50 hover:text-red-600"
								>
									<ThumbsDown className="h-3.5 w-3.5" />
									Reject
								</button>
								<button
									onClick={() => setStatus(item.id, "approved")}
									className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
								>
									<ThumbsUp className="h-3.5 w-3.5" />
									Approve & merge
								</button>
							</div>
						</div>
					))}

					{pending.length === 0 && (
						<div className="p-12 text-center">
							<CheckCircle2 className="mx-auto h-8 w-8 text-green-300" />
							<p className="mt-3 text-sm font-medium text-slate-700">All caught up</p>
							<p className="mt-1 text-xs text-slate-400">No fixes waiting on review.</p>
						</div>
					)}
				</div>
			</div>

			{(approved.length > 0 || rejected.length > 0) && (
				<div className="rounded-xl border border-slate-200 bg-white">
					<div className="border-b border-slate-200 p-5">
						<h2 className="font-semibold text-slate-900">Recently reviewed</h2>
					</div>
					<div className="divide-y divide-slate-100">
						{[...approved, ...rejected].map((item) => (
							<div key={item.id} className="flex items-center gap-3 p-5">
								{item.status === "approved" ? (
									<CheckCircle2 className="h-4 w-4 shrink-0 text-green-500" />
								) : (
									<XCircle className="h-4 w-4 shrink-0 text-red-500" />
								)}
								<p className="flex-1 text-sm text-slate-700">{item.incident}</p>
								<span className="font-mono text-xs text-slate-400">{item.agent}</span>
							</div>
						))}
					</div>
				</div>
			)}
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