import { Badge } from "../ui/Badge";
import type { IncidentSeverity } from "../../types/incident";
/** Renders the semantic severity tone for an incident. */
export function SeverityBadge({ severity }: { severity: IncidentSeverity }) {
	const tone = severity === "critical" || severity === "high" ? "danger" : severity === "medium" ? "warning" : "neutral";
	return <Badge tone={tone}>{severity}</Badge>;
}