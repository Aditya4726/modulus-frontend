"use client";

import { useState } from "react";
import { Button } from "../ui/Button";
import { triggerDiagnose, triggerFix, triggerReproduce } from "../../lib/api/incidents";

/** Renders queued diagnosis, reproduction, and fix actions for an incident. */
export function IncidentActions({ incidentId }: { incidentId: string }) {
	const [pending, setPending] = useState<string | null>(null);
	async function run(action: string, task: (id: string) => Promise<unknown>) {
		setPending(action);
		try {
			await task(incidentId);
		} finally {
			setPending(null);
		}
	}
	const actions: Array<[string, string, (id: string) => Promise<unknown>]> = [["diagnose", "Diagnose", triggerDiagnose], ["reproduce", "Reproduce", triggerReproduce], ["fix", "Generate Fix", triggerFix]];
	return <div className="flex flex-wrap gap-3">{actions.map(([key, label, action]) => <Button key={key} type="button" disabled={pending !== null} onClick={() => void run(key, action)}>{pending === key ? "Queued..." : label}</Button>)}</div>;
}