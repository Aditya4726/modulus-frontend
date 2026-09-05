"use client";

import { useCallback, useEffect, useState } from "react";
import { incidentsApi } from "../lib/api/incidents";
import type { Incident, IncidentSeverity, IncidentStatus } from "../types/incident";

/** Loads incident pages and appends additional cursor-based results. */
export function useIncidents(projectId: string, filters: { status?: IncidentStatus; severity?: IncidentSeverity } = {}) {
	const [items, setItems] = useState<Incident[]>([]);
	const [nextCursor, setNextCursor] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);
	const load = useCallback(async (append = false) => {
		setLoading(true);
		try {
			const result = await incidentsApi.list(projectId, { ...filters, cursor: append ? nextCursor ?? undefined : undefined });
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
	}, [projectId, filters.status, filters.severity]);

	return { items, nextCursor, loading, error, loadMore: () => load(true), reload: () => load(false) };
}