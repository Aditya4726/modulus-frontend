import type { DashboardMetrics } from "../../lib/api/dashboard";

/** Renders the compact incident count breakdown. */
export function IncidentBreakdownChart({ incidents }: { incidents: DashboardMetrics["incidents"] }) {
	return <div className="rounded-lg border p-5"><h2 className="font-semibold">Incident breakdown</h2><div className="mt-4 grid grid-cols-3 gap-3 text-center text-sm"><div><strong className="block text-xl">{incidents.open}</strong>Open</div><div><strong className="block text-xl">{incidents.acknowledged}</strong>Acknowledged</div><div><strong className="block text-xl">{incidents.resolved}</strong>Resolved</div></div></div>;
}