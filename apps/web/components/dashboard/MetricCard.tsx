/** Renders a compact light-themed metric card. */
export function MetricCard({ label, value, detail }: { label: string; value: string | number; detail?: string }) {
	return <div className="rounded-lg border bg-white p-5"><p className="text-sm text-neutral-500">{label}</p><p className="mt-2 text-2xl font-semibold">{value}</p>{detail && <p className="mt-1 text-xs text-neutral-500">{detail}</p>}</div>;
}