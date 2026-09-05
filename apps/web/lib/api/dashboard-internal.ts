/*
 * REAL: GET /api/metrics/:projectId/internal
 * Params: projectId is a path parameter.
 * Response: ApiResponse<InternalDashboardMetrics>.
 * REAL fields: diagnosisCostUsd, diagnosisCacheHitRate,
 * reproductionConfirmationRate, fixRiskDistribution, and fixStatusFunnel.
 * No fallback data is defined in this module.
 */
import { apiFetch } from "./client";
import type { InternalDashboardMetrics } from "../../types/dashboard";

/** Loads admin-only internal diagnosis, reproduction, and fix metrics. */
export const dashboardInternalApi = {
	get: (projectId: string) => apiFetch<InternalDashboardMetrics>(`/api/metrics/${projectId}/internal`),
};