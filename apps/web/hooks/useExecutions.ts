"use client";

import { useCallback, useEffect, useState } from "react";
import { list } from "../lib/api/executions";
import type { Execution, ExecutionStatus } from "../types/execution";

/** Loads execution pages and appends additional cursor-based results. */
export function useExecutions(projectId: string, filters: { status?: ExecutionStatus; agent?: string } = {}) {
	const [items, setItems] = useState<Execution[]>([]);
	const [nextCursor, setNextCursor] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);
	const load = useCallback(async (append = false) => {
		setLoading(true);
		try {
			const result = await list(projectId, { ...filters }, append ? nextCursor ?? undefined : undefined);
			setItems((current) => {
				return append ? [...current, ...result.items] : result.items;
			});
			setNextCursor(result.nextCursor);
		} catch (value) {
			setError(value as Error);
		} finally {
			setLoading(false);
		}
	}, [filters, nextCursor, projectId]);
	// eslint-disable-next-line react-hooks/set-state-in-effect
	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		void load();
	}, [projectId, filters.status, filters.agent]);

	return { items, nextCursor, loading, error, loadMore: () => load(true), reload: () => load(false) };
}