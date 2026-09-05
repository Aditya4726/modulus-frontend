import type { Execution } from "./execution";

export type IncidentStatus = "open" | "acknowledged" | "resolved";
export type IncidentSeverity = "low" | "medium" | "high" | "critical";

export interface Diagnosis {
	id: string;
	status?: string;
	rootCause?: string | null;
	summary?: string | null;
	[key: string]: unknown;
}

export interface Reproduction {
	id: string;
	status?: string;
	createdAt: string;
	[key: string]: unknown;
}

export interface Fix {
	id: string;
	status?: string;
	pullRequest?: Record<string, unknown> | null;
	testRuns?: Record<string, unknown>[];
	[key: string]: unknown;
}

export interface Incident {
	id: string;
	projectId: string;
	title: string;
	ruleId: string;
	severity: IncidentSeverity;
	status: IncidentStatus;
	occurrenceCount: number;
	lastSeen: string;
	createdAt?: string;
	diagnosis?: Diagnosis | null;
	reproductions?: Reproduction[];
	fix?: Fix | null;
	executions?: Array<{ execution: Execution }>;
	[key: string]: unknown;
}

export interface PullRequest {
	url: string;
	status: string;
	prNumber?: number;
}