import { GithubSettingsForm } from "../../../../../components/settings/GithubSettingsForm";
import { GithubConnectionPanel } from "../../../../../components/settings/GithubConnectionPanel";

/** Renders GitHub connection and repository settings. */
export default async function GithubSettingsPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	return <main className="max-w-3xl space-y-6 p-8"><GithubConnectionPanel projectId={id} /><GithubSettingsForm projectId={id} /></main>;
}