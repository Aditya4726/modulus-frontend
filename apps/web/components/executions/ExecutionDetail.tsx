"use client";

import { useEffect, useState } from "react";
import { getById } from "../../lib/api/executions";
import type { Execution } from "../../types/execution";
import { ToolCallList } from "./ToolCallList";
import { EventTimeline } from "./EventTimeline";
import { ErrorState } from "../shared/ErrorState";
import { LoadingSkeleton } from "../shared/LoadingSkeleton";

export function ExecutionDetail({ executionId }: { executionId: string }) {
	const [execution, setExecution] = useState<Execution | null>(null);
	const [error, setError] = useState("");

	useEffect(() => {
		getById(executionId).then(setExecution).catch((value: unknown) => setError(value instanceof Error ? value.message : "Unable to load execution."));
	}, [executionId]);

	if (error) return <ErrorState message={error} onRetry={() => window.location.reload()} />;
	if (!execution) return <LoadingSkeleton />;
	return <main className="space-y-6 p-8"><div><p className="text-sm text-neutral-500">{execution.agent.name}</p><h1 className="text-3xl font-semibold">Execution detail</h1><p className="mt-2 font-mono text-xs text-neutral-500">{execution.id}</p></div><ToolCallList calls={execution.toolCalls} /><EventTimeline events={execution.events} /></main>;
}