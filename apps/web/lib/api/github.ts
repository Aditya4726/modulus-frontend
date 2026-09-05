/*
 * REAL: POST /api/github/install-callback.
 * Body: { projectId: string, installationId: number }.
 * Response: ApiResponse<{ installed: boolean }>.
 * REAL fields: installed.
 * No local installation state is maintained; the backend is authoritative.
 */
import { apiFetch } from "./client";

/** Reports that connection status requires a backend project field. */
export function isGithubConnected(projectId: string) {
	void projectId;
	return false;
}

/** Connects a GitHub installation to a project through the backend. */
export async function installCallback(projectId: string, installationId: number) {
	return apiFetch<{ installed: boolean }>("/api/github/install-callback", { method: "POST", body: JSON.stringify({ projectId, installationId }) });
}

export const githubApi = {
	installCallback,
};