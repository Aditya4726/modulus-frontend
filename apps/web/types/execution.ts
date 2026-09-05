export type ExecutionStatus = "running" | "succeeded" | "failed";

export interface ToolCall {
	id: string;
	name?: string;
	toolName?: string;
	input?: unknown;
	output?: unknown;
	status?: string;
	createdAt?: string;
	[key: string]: unknown;
}

export interface ExecutionEvent {
	id: string;
	timestamp: string;
	type?: string;
	name?: string;
	message?: string;
	payload?: unknown;
	[key: string]: unknown;
}

export interface Execution {
	id: string;
	status: ExecutionStatus;
	agent: { name: string; projectId?: string; id?: string };
	toolCallsCount: number;
	startedAt: string;
	endedAt: string | null;
	toolCalls?: ToolCall[];
	events?: ExecutionEvent[];
	[key: string]: unknown;
}