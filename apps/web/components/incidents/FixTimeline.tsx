import type { Fix } from "../../types/incident";

/** Renders the fix pipeline status and its empty state. */
export function FixTimeline({ fix }: { fix?: Fix | null }) {
	const status = fix ? `Status: ${fix.status ?? "in progress"}` : "No fix has been started.";
	return <section className="rounded-lg border p-5"><h2 className="font-semibold">Fix pipeline</h2><p className="mt-3 text-sm text-neutral-600">{status}</p></section>;
}