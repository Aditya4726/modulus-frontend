"use client";

import { useState } from "react";
import { ExecutionTable } from "../../../../components/executions/ExecutionTable";
import { Pagination } from "../../../../components/shared/Pagination";
import { EmptyState } from "../../../../components/shared/EmptyState";
import { useExecutions } from "../../../../hooks/useExecutions";
import type { ExecutionStatus } from "../../../../types/execution";

export default function ExecutionsPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = use(params);
	const [status, setStatus] = useState<ExecutionStatus | undefined>();
	const [agent, setAgent] = useState("");
	const { items, nextCursor, loading, error, loadMore } = useExecutions(id, { status, agent: agent || undefined });
	const statusOptions: Array<[string, string]> = [["", "All statuses"], ["running", "Running"], ["succeeded", "Succeeded"], ["failed", "Failed"]];
	const agentOptions = ["", "Checkout Agent", "Support Copilot"];
	return <main className="p-8"><div className="flex flex-wrap items-end justify-between gap-4"><div><h1 className="text-3xl font-semibold text-[#102522]">Executions</h1><p className="mt-2 text-sm text-slate-500">Trace every agent run, tool call, and outcome.</p></div><div className="flex gap-2"><select value={status ?? ""} onChange={(event) => setStatus((event.target.value || undefined) as ExecutionStatus | undefined)} className="rounded-md border border-teal-100 bg-white px-3 py-2 text-sm">{statusOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select><select value={agent} onChange={(event) => setAgent(event.target.value)} className="rounded-md border border-teal-100 bg-white px-3 py-2 text-sm">{agentOptions.map((value) => <option key={value} value={value}>{value || "All agents"}</option>)}</select></div></div>{error && <p className="mt-6 rounded-md bg-rose-50 p-4 text-sm text-rose-700">{error.message}</p>}{items.length ? <div className="mt-8"><ExecutionTable projectId={id} executions={items} /><Pagination nextCursor={nextCursor} loading={loading} onNext={() => void loadMore()} /></div> : !loading && <div className="mt-8"><EmptyState title="No executions found" message="Try changing the status or agent filters." /></div>}{loading && <p className="mt-6 text-sm text-slate-500">Loading executions...</p>}</main>;
}

import { use } from "react";