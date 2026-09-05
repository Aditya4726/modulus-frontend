"use client";

import { useEffect, useState } from "react";
import { getById } from "../../lib/api/incidents";
import type { Incident } from "../../types/incident";
import { DiagnosisPanel } from "./DiagnosisPanel";
import { FixTimeline } from "./FixTimeline";
import { IncidentActions } from "./IncidentActions";
import { ReproductionList } from "./ReproductionList";
import { SeverityBadge } from "./SeverityBadge";
import { StatusBadge } from "./StatusBadge";

/** Loads and renders the full incident detail view. */
export function IncidentDetailView({ incidentId }: { incidentId: string }) {
	const [incident, setIncident] = useState<Incident | null>(null);
	const [error, setError] = useState("");

	useEffect(() => {
		let active = true;
		getById(incidentId)
			.then((value) => { if (active) setIncident(value); })
			.catch((value: unknown) => { if (active) setError(value instanceof Error ? value.message : "Incident not found."); });
		return () => { active = false; };
	}, [incidentId]);

	if (error) return <main className="p-8 text-rose-700">{error}</main>;
	if (!incident) return <main className="p-8 text-slate-500">Loading incident...</main>;

	return <main className="max-w-4xl space-y-6 p-8"><div><div className="flex flex-wrap items-center gap-3"><h1 className="text-3xl font-semibold text-[#102522]">{incident.title}</h1><SeverityBadge severity={incident.severity} /><StatusBadge status={incident.status} /></div><p className="mt-2 font-mono text-xs text-slate-500">{incident.ruleId} · {incident.occurrenceCount} occurrences · last seen {new Date(incident.lastSeen).toLocaleString()}</p></div><IncidentActions incidentId={incident.id} /><DiagnosisPanel diagnosis={incident.diagnosis} /><ReproductionList reproductions={incident.reproductions} /><FixTimeline fix={incident.fix} /></main>;
}