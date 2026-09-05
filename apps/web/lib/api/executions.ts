/*
 * REAL: GET /api/executions?projectId=&status=&agentId=&cursor=&limit=.
 * REAL: GET /api/executions/:id.
 * Responses: paginated ApiResponse<Execution[]> or ApiResponse<Execution>.
 */
import { apiFetch, apiFetchPaginated } from "./client";
import type { Execution, ExecutionStatus } from "../../types/execution";

export interface ExecutionFilters {
	status?: ExecutionStatus;
	agent?: string;
	limit?: number;
}

/** Lists executions using the backend cursor contract. */
export async function list(projectId: string, filters: ExecutionFilters = {}, cursor?: string) {
	const query = new URLSearchParams({ projectId, limit: String(filters.limit ?? 25) });
	if (cursor) query.set("cursor", cursor);
	if (filters.status) query.set("status", filters.status);
	if (filters.agent) query.set("agentId", filters.agent);
	return apiFetchPaginated<Execution>(`/api/executions?${query}`);
}

/** Loads one execution by its backend ID. */
export async function getById(id: string): Promise<Execution> {
	return apiFetch<Execution>(`/api/executions/${id}`);
}

export const executionsApi = { list, get: getById };
