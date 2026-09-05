import Link from "next/link";
import type { Execution } from "../../types/execution";
import { Table } from "../ui/Table";
import { Badge } from "../ui/Badge";
/** Renders executions as links with status badges and tool-call counts. */
export function ExecutionTable({ projectId, executions }: { projectId: string; executions: Execution[] }) {
	const headings = ["Time", "Agent", "Status", "Tool calls"];
	return <Table><thead className="bg-neutral-50 text-neutral-500"><tr>{headings.map((heading) => <th key={heading} className="p-3 font-medium">{heading}</th>)}</tr></thead><tbody>{executions.map((execution) => { const tone = execution.status === "succeeded" ? "success" : execution.status === "failed" ? "danger" : "warning"; return <tr key={execution.id} className="border-t border-neutral-100"><td className="p-3"><Link className="font-mono text-xs hover:underline" href={`/projects/${projectId}/executions/${execution.id}`}>{new Date(execution.startedAt).toLocaleString()}</Link></td><td className="p-3">{execution.agent.name}</td><td className="p-3"><Badge tone={tone}>{execution.status}</Badge></td><td className="p-3">{execution.toolCallsCount}</td></tr>; })}</tbody></Table>;
}