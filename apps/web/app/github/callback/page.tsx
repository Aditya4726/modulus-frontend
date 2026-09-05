import { Suspense } from "react";
import GitHubCallbackContent from "./content";

/** Provides the Suspense boundary for GitHub installation callback parsing. */
export default function GitHubCallbackPage() {
	return (
		<Suspense
			fallback={<div className="mt-20 text-center">Connecting GitHub…</div>}
		>
			<GitHubCallbackContent />
		</Suspense>
	);
}
