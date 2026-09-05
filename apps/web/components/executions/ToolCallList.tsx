import type { ToolCall } from "../../types/execution";
/** Renders the tool calls recorded during an execution. */
export function ToolCallList({ calls = [] }: { calls?: ToolCall[] }) {
	return <section className="rounded-lg border p-5"><h2 className="font-semibold">Tool calls</h2><ul className="mt-3 space-y-2 text-sm">{calls.map((call) => { const label = call.toolName ?? call.name ?? "Tool call"; const status = call.status ?? "completed"; return <li key={call.id} className="rounded bg-neutral-50 p-3"><strong>{label}</strong><span className="ml-2 text-neutral-500">{status}</span></li>; })}</ul></section>;
}