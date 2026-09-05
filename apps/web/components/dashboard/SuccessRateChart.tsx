/** Renders the compact success-rate progress chart. */
export function SuccessRateChart({ rate }: { rate: number | null }) {
	const percentage = Math.max(0, Math.min(100, (rate ?? 0) * 100));
	const description = rate === null ? "No executions yet" : `${(rate * 100).toFixed(1)}% of executions succeeded`;
	return <div className="rounded-lg border p-5"><h2 className="font-semibold">Success rate</h2><div className="mt-4 h-3 rounded-full bg-neutral-100"><div className="h-3 rounded-full bg-emerald-500" style={{ width: `${percentage}%` }} /></div><p className="mt-2 text-sm text-neutral-500">{description}</p></div>;
}