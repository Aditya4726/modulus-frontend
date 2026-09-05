/*
 * REAL: GET /dashboard/:projectId.
 * Params: projectId is a path parameter.
 * Response: ApiResponse<DashboardStats> with backend-defined dashboard fields.
 * Unsupported UI sections must render empty or "—" states in components.
 */
import { apiFetch } from "./client";
import type { DashboardStats } from "../../types/dashboard";
export type { DashboardMetrics } from "../../types/dashboard";

/** Loads dashboard statistics from the real backend endpoint. */
export async function getDashboardStats(projectId: string): Promise<DashboardStats> {
	return apiFetch<DashboardStats>(`/dashboard/${projectId}`);
}

export const dashboardApi = { get: getDashboardStats };
