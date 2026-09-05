import { Badge } from "../ui/Badge";
import type { IncidentStatus } from "../../types/incident";
/** Renders the semantic lifecycle tone for an incident. */
export function StatusBadge({ status }: { status: IncidentStatus }) {
	const tone = status === "resolved" ? "success" : status === "acknowledged" ? "warning" : "danger";
	return <Badge tone={tone}>{status}</Badge>;
}