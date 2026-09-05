/*
 * REAL: GET /api/incidents?projectId=&status=&severity=&cursor=&limit=.
 * REAL: GET /api/incidents/:id.
 * REAL: PATCH /api/incidents/:id with { status }.
 * REAL: POST /api/incidents/:id/diagnose, /reproduce, and /fix.
 */
import { apiFetch, apiFetchPaginated } from "./client";
import type { Incident, IncidentSeverity, IncidentStatus } from "../../types/incident";

/** Lists incidents with backend status, severity, and cursor filters. */
export async function list(projectId: string, options: { cursor?: string; limit?: number; status?: IncidentStatus; severity?: IncidentSeverity } = {}) {
	const query = new URLSearchParams({ projectId, limit: String(options.limit ?? 25) });
	if (options.cursor) query.set("cursor", options.cursor);
	if (options.status) query.set("status", options.status);
	if (options.severity) query.set("severity", options.severity);
	return apiFetchPaginated<Incident>(`/api/incidents?${query}`);
}

/** Loads one incident by its backend ID. */
export async function getById(id: string): Promise<Incident> {
	return apiFetch<Incident>(`/api/incidents/${id}`);
}

/** Updates an incident status through the backend PATCH endpoint. */
export async function patchStatus(id: string, status: Exclude<IncidentStatus, "open">) {
	return apiFetch<Incident>(`/api/incidents/${id}`, { method: "PATCH", body: JSON.stringify({ status }) });
}

/** Queues backend diagnosis for an incident. */
export function triggerDiagnose(id: string) {
	return apiFetch<{ queued: true }>(`/api/incidents/${id}/diagnose`, { method: "POST" });
}

/** Queues backend reproduction for an incident. */
export function triggerReproduce(id: string) {
	return apiFetch<{ queued: true }>(`/api/incidents/${id}/reproduce`, { method: "POST" });
}

/** Queues backend fix generation for an incident. */
export function triggerFix(id: string) {
	return apiFetch<{ queued: true }>(`/api/incidents/${id}/fix`, { method: "POST" });
}

export const incidentsApi = { list, get: getById, setStatus: patchStatus, diagnose: triggerDiagnose, reproduce: triggerReproduce, fix: triggerFix };
