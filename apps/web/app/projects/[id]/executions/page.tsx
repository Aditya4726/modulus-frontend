"use client";

import { use, useCallback, useEffect, useState } from "react";
import { apiFetch } from "../../../../lib/api-client";

/* Backend integration: GET /api/executions?projectId=:id&limit=25 accepts the
 * optional status and cursor query parameters. Return { success, data, nextCursor };
 * each row needs id, status, startedAt, endedAt, agent.name, and _count.toolCalls.
 */

interface ExecutionRow {
	id: string;
	status: "running" | "succeeded" | "failed";
	startedAt: string;
	endedAt: string | null;
	agent: {
		name: string;
	};
	_count: {
		toolCalls: number;
	};
}

export default function ExecutionsPage({ params }: { params: Promise<{ id: string }>}) {
	const { id } = use(params);

	const [rows, setRows] = useState<ExecutionRow[]>([]);
	const [status, setStatus] = useState("");
	const [nextCursor, setNextCursor] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const load = useCallback(
		async (append = false, cursorOverride?: string | null) => {
			try {
				setLoading(true);

				const query = new URLSearchParams({
					projectId: id,
					limit: "25",
				});

				if (status) {
					query.set("status", status);
				}

				if (append && cursorOverride) {
					query.set("cursor", cursorOverride);
				}

				const data = await apiFetch<ExecutionRow[]>(`/api/executions?${query.toString()}`);

				if (data.success && data.data) {
					const items = data.data;
					setRows((prev) => (append ? [...prev, ...items] : items));

					setNextCursor(data.nextCursor ?? null);
				}
			} finally {
				setLoading(false);
			}
		},
		[id, status],
	);

	useEffect(() => {
		void load(false);
	}, [load]);

	return (
		<div className="p-8">
			<h1 className="mb-1 text-2xl font-semibold">Executions</h1>

			<p className="mb-6 text-sm text-gray-500">
				All agent executions for this project.
			</p>

			<div className="mb-4 flex items-center gap-2">
				<select
					value={status}
					onChange={(e) => setStatus(e.target.value)}
					className="ml-auto rounded border px-3 py-1.5 text-sm"
				>
					<option value="">All statuses</option>
					<option value="running">Running</option>
					<option value="succeeded">Succeeded</option>
					<option value="failed">Failed</option>
				</select>
			</div>

			<div className="overflow-hidden rounded border">
				<table className="w-full text-sm">
					<thead className="bg-gray-50 text-left text-gray-500">
						<tr>
							<th className="p-3">Time</th>
							<th className="p-3">Execution ID</th>
							<th className="p-3">Agent</th>
							<th className="p-3">Status</th>
							<th className="p-3">Tool calls</th>
							<th className="p-3">Duration</th>
						</tr>
					</thead>

					<tbody>
						{rows.map((row) => (
							<tr
								key={row.id}
								className="cursor-pointer border-t hover:bg-gray-50"
							>
								<td className="p-3 text-gray-500">
									{new Date(row.startedAt).toLocaleString()}
								</td>

								<td className="p-3 font-mono text-xs">
									{row.id.slice(0, 12)}…
								</td>

								<td className="p-3">{row.agent.name}</td>

								<td className="p-3">
									<StatusBadge status={row.status} />
								</td>

								<td className="p-3">{row._count.toolCalls}</td>

								<td className="p-3">
									{row.endedAt
										? `${(
												(new Date(row.endedAt).getTime() -
													new Date(row.startedAt).getTime()) /
												1000
											).toFixed(2)}s`
										: "—"}
								</td>
							</tr>
						))}

						{!loading && rows.length === 0 && (
							<tr>
								<td colSpan={6} className="p-8 text-center text-gray-500">
									No executions found.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			{nextCursor && (
				<button
					type="button"
					onClick={() => {
						void load(true, nextCursor);
					}}
					disabled={loading}
					className="mt-4 rounded border px-4 py-2 text-sm disabled:opacity-50"
				>
					{loading ? "Loading…" : "Load more"}
				</button>
			)}
		</div>
	);
}

function StatusBadge({ status }: { status: ExecutionRow["status"] }) {
	const colors: Record<ExecutionRow["status"], string> = {
		succeeded: "bg-green-100 text-green-700",
		failed: "bg-red-100 text-red-700",
		running: "bg-yellow-100 text-yellow-700",
	};

	return (
		<span className={`rounded px-2 py-0.5 text-xs ${colors[status]}`}>
			{status}
		</span>
	);
}
