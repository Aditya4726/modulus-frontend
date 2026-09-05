import { ApiKeysPanel } from "../../../../../components/settings/ApiKeysPanel";

/** Renders project API-key management. */
export default async function ApiKeysPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	return <ApiKeysPanel projectId={id} />;
}

