/*
 * REAL: GET /api/me.
 * Params: none; session cookie authenticates the request.
 * Response: ApiResponse<{ user, organizations }>.
 * REAL fields: user and organizations with id, name, and role.
 * No fallback data is defined in this module.
 */
import { apiFetch } from "./client";
export interface CurrentUser {
	organizations: Array<{ id: string; name: string; role: string }>;
	user: { id: string; email?: string };
}

/** Loads the authenticated user and organization memberships. */
export const meApi = { get: () => apiFetch<CurrentUser>("/api/me") };