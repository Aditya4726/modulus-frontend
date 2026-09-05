"use client";

import { useEffect, useState } from "react";
import { getDashboardStats } from "../lib/api/dashboard";
import type { DashboardStats } from "../types/dashboard";

/** Loads dashboard metrics and exposes an explicit refresh action. */
export function useDashboardMetrics(projectId: string) {
	const [metrics, setMetrics] = useState<DashboardStats | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);
	const [refreshing, setRefreshing] = useState(false);
	async function refetch() {
		setRefreshing(true);
		setError(null);
		try {
			setMetrics(await getDashboardStats(projectId));
		} catch (value) {
			setError(value as Error);
		} finally {
			setRefreshing(false);
		}
	}

	useEffect(() => {
		let active = true;
		async function loadMetrics() {
			try {
				const values = await getDashboardStats(projectId);
				if (active) setMetrics(values);
			} catch (value) {
				if (active) setError(value as Error);
			} finally {
				if (active) setLoading(false);
			}
		}

		void loadMetrics();
		return () => { active = false; };
	}, [projectId]);
	return { data: metrics, metrics, loading, refreshing, error, refetch };
}