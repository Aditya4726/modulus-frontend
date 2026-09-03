"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

/* Backend integration: POST /api/github/install-callback receives
 * { installationId, projectId } after GitHub App installation. Return
 * { success, error } so the page can route to the project dashboard or show failure.
 */

export default function GitHubCallbackContent() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const installationId = searchParams.get("installation_id");
		const projectId = searchParams.get("state");
		if (!installationId || !projectId) {
			setError("Missing installation details");
			return;
		}

		fetch("/api/github/install-callback", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify({
				installationId: Number(installationId),
				projectId,
			}),
		})
			.then((r) => r.json())
			.then((data) => {
				if (data.success) router.push(`/projects/${projectId}/dashboard`);
				else setError(data.error?.message ?? "Failed to link installation");
			});
	}, [searchParams, router]);

	return (
		<div className="mt-20 text-center">{error ?? "Connecting GitHub…"}</div>
	);
}
