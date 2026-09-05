"use client";

import { useHealth } from "../../../hooks/useHealth";
import { Badge } from "../../../components/ui/Badge";
import { Button } from "../../../components/ui/Button";
import { ErrorState } from "../../../components/shared/ErrorState";
import { LoadingSkeleton } from "../../../components/shared/LoadingSkeleton";

/** Renders backend PostgreSQL, Redis, and Qdrant health status. */
export default function AdminStatusPage() {
	const { checks, loading, error, refresh } = useHealth();
	const entries = Object.entries(checks ?? {});
	if (loading && !checks) return <LoadingSkeleton />;
	if (error && !checks) return <ErrorState message={error.message} onRetry={() => void refresh()} />;
	const statusEntries = entries.map(([name, status]) => ({ name, status }));
	return <main className="mx-auto max-w-2xl p-8"><div className="flex items-start justify-between"><div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">Operations</p><h1 className="mt-2 text-3xl font-semibold">System status</h1></div><Button type="button" onClick={() => void refresh()} disabled={loading}>{loading ? "Checking..." : "Refresh"}</Button></div>{error && <p className="mt-6 rounded-md bg-amber-50 p-4 text-sm text-amber-700">One or more checks could not be refreshed. Showing the last result.</p>}<div className="mt-8 divide-y rounded-lg border bg-white">{statusEntries.length ? statusEntries.map(({ name, status }) => <div key={name} className="flex items-center justify-between p-4"><span className="font-medium capitalize">{name}</span><Badge tone={status === "ok" ? "success" : "danger"}>{status}</Badge></div>) : <p className="p-6 text-sm text-neutral-500">No health checks returned.</p>}</div></main>;
}