"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { installCallback } from "../../../lib/api/github";

/** Processes GitHub installation query parameters and completes the callback. */
export default function GitHubCallbackContent() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const installationId = searchParams.get("installation_id");
		const projectId = searchParams.get("state");
		if (!installationId || !projectId) {
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setError("Missing installation details");
			return;
		}

		installCallback(projectId, Number(installationId))
			.then(() => router.push(`/projects/${projectId}/settings/github`))
			.catch((reason: unknown) => setError(reason instanceof Error ? reason.message : "Failed to link installation"));
	}, [searchParams, router]);

	return (
		<div className="mt-20 text-center">{error ?? "Connecting GitHub…"}</div>
	);
}
