/*
 * REAL: GET /health/deep.
 * Params: none.
 * Response: ApiResponse<Record<string, "ok" | "error">>.
 * REAL fields: postgres, redis, and qdrant status entries.
 * No local health values are generated; the backend response is authoritative.
 */
import { apiFetch } from "./client";

export type HealthStatus = "ok" | "error";
export type HealthChecks = Record<string, HealthStatus>;

/** Loads deep service health from the backend. */
export async function getDeepHealth(): Promise<HealthChecks> {
	return apiFetch<HealthChecks>("/health/deep");
}

export const healthApi = {
	deep: getDeepHealth,
};