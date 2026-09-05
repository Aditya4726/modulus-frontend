"use client";

import { useEffect, useState } from "react";

/** Repeats a refetch callback while the document is visible. */
export function usePolling<T>(refetch: () => Promise<T>, intervalSeconds = 30, enabled = true) {
	const [value, setValue] = useState<T | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);
	useEffect(() => {
		if (!enabled) return;
		let active = true;
		const run = () => {
			if (document.visibilityState !== "visible") return;
			setLoading(true);
			refetch()
				.then((result) => { if (active) setValue(result); })
				.catch((reason: unknown) => { if (active) setError(reason as Error); })
				.finally(() => { if (active) setLoading(false); });
		};
		const timer = window.setInterval(run, intervalSeconds * 1000);
		const onVisibility = () => {
			if (document.visibilityState === "visible") run();
		};
		document.addEventListener("visibilitychange", onVisibility);
		return () => { active = false; window.clearInterval(timer); document.removeEventListener("visibilitychange", onVisibility); };
	}, [enabled, intervalSeconds, refetch]);
	return { value, loading, error };
}