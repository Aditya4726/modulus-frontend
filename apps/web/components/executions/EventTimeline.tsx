import type { ExecutionEvent } from "../../types/execution";
/** Renders execution lifecycle events in chronological order. */
export function EventTimeline({ events = [] }: { events?: ExecutionEvent[] }) {
	return <section className="rounded-lg border p-5"><h2 className="font-semibold">Event timeline</h2><ol className="mt-3 space-y-3">{events.map((event) => { const label = event.message ?? event.type ?? event.name ?? "Event"; return <li key={event.id} className="border-l-2 border-neutral-200 pl-3 text-sm"><time className="text-xs text-neutral-500">{new Date(event.timestamp).toLocaleString()}</time><p>{label}</p></li>; })}</ol></section>;
}