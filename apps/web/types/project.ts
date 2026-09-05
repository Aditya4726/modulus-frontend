export interface Project {
	id: string;
	name: string;
	role: string;
	organizationId: string;
	environment: string;
	repositoryUrl?: string | null;
	githubInstallationId?: number | null;
	createdAt?: string;
	updatedAt?: string;
}

export interface ProjectKey {
	id: string;
	prefix: string;
	createdAt: string;
	revokedAt?: string | null;
}

export interface CreatedProjectKey extends ProjectKey {
	rawKey: string;
}