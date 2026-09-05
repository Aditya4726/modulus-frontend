"use client";

import { useCallback, useEffect, useState } from "react";
import { getDeepHealth, type HealthChecks } from "../lib/api/health";

/** Loads deep dependency health and exposes a manual refresh action. */
export function useHealth() {
	const [checks, setChecks] = useState<HealthChecks | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);
	const refresh = useCallback(async () => {
		setLoading(true);
		try {
			setChecks(await getDeepHealth());
			setError(null);
		} catch (value) {
			setError(value instanceof Error ? value : new Error("Unable to load health checks."));
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		void refresh();
	}, [refresh]);

	return { checks, loading, error, refresh };
}