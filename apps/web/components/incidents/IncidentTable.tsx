import Link from "next/link";
import type { Incident } from "../../types/incident";
import { Table } from "../ui/Table";
import { StatusBadge } from "./StatusBadge";
import { SeverityBadge } from "./SeverityBadge";
/** Renders incidents as links with severity and status badges. */
export function IncidentTable({ projectId, incidents }: { projectId: string; incidents: Incident[] }) {
	const headings = ["Title", "Severity", "Status", "Occurrences", "Last seen"];
	return <Table><thead className="bg-neutral-50 text-neutral-500"><tr>{headings.map((heading) => <th key={heading} className="p-3 font-medium">{heading}</th>)}</tr></thead><tbody>{incidents.map((incident) => <tr key={incident.id} className="border-t border-neutral-100"><td className="p-3"><Link className="font-medium hover:underline" href={`/projects/${projectId}/incidents/${incident.id}`}>{incident.title}</Link></td><td className="p-3"><SeverityBadge severity={incident.severity} /></td><td className="p-3"><StatusBadge status={incident.status} /></td><td className="p-3">{incident.occurrenceCount}</td><td className="p-3 text-neutral-500">{new Date(incident.lastSeen).toLocaleString()}</td></tr>)}</tbody></Table>;
}