/*
 * REAL: GET /api/projects and GET /api/projects/:id.
 * REAL: POST /api/projects with { organizationId, name, environment }.
 * REAL: POST /api/projects/:id/keys and DELETE /api/projects/:id/keys/:keyId.
 * REAL: PATCH /api/projects/:id/github-token with { token }.
 * REAL: PATCH /api/projects/:id/github-webhook-secret with { secret }.
 * REAL: POST /api/projects/:id/sync-prs.
 * Response shapes: ApiResponse<Project>, ApiResponse<Project[]>,
 * ApiResponse<CreatedProjectKey>, ApiResponse<null>, or operation-specific data.
 * REAL fields: project identity, role, organization, environment, key prefix,
 * and one-time rawKey creation response.
 * No fallback data is defined; all functions use the backend.
 */
import { apiFetch } from "./client";
import type { CreatedProjectKey, Project, ProjectKey } from "../../types/project";

export async function getProjects(): Promise<Project[]> {
	return apiFetch<Project[]>("/api/projects");
}

/** Creates a project through the real project endpoint. */
export async function createProject(input: { name: string; organizationId?: string; environment?: string }): Promise<Project> {
	return apiFetch<Project>("/api/projects", { method: "POST", body: JSON.stringify(input) });
}

/** Lists masked API keys for a project. */
export async function listApiKeys(projectId: string): Promise<ProjectKey[]> {
	return apiFetch<ProjectKey[]>(`/api/projects/${projectId}/keys`);
}

/** Creates an API key and returns its raw value exactly once. */
export async function createApiKey(projectId: string): Promise<CreatedProjectKey> {
	return apiFetch<CreatedProjectKey>(`/api/projects/${projectId}/keys`, { method: "POST", body: "{}" });
}

/** Revokes an API key for a project. */
export async function revokeApiKey(projectId: string, keyId: string): Promise<null> {
	return apiFetch<null>(`/api/projects/${projectId}/keys/${keyId}`, { method: "DELETE" });
}

export const projectsApi = {
	list: () => apiFetch<Project[]>("/api/projects"),
	get: (id: string) => apiFetch<Project>(`/api/projects/${id}`),
	create: (input: { organizationId: string; name: string; environment?: string }) => apiFetch<Project>("/api/projects", { method: "POST", body: JSON.stringify(input) }),
	createKey: createApiKey,
	revokeKey: revokeApiKey,
	setGithubToken: (id: string, token: string) => apiFetch<{ githubTokenConfigured: boolean }>(`/api/projects/${id}/github-token`, { method: "PATCH", body: JSON.stringify({ token }) }),
	setWebhookSecret: (id: string, secret: string) => apiFetch<{ githubWebhookConfigured: boolean }>(`/api/projects/${id}/github-webhook-secret`, { method: "PATCH", body: JSON.stringify({ secret }) }),
	syncPrs: (id: string) => apiFetch<{ synced: number }>(`/api/projects/${id}/sync-prs`, { method: "POST" }),
	keys: listApiKeys,
};