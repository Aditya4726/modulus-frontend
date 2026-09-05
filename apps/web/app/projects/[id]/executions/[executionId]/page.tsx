import { ExecutionDetail } from "../../../../../components/executions/ExecutionDetail";

/** Renders tool calls and events for one execution. */
export default async function ExecutionDetailPage({ params }: { params: Promise<{ executionId: string }> }) {
	const { executionId } = await params;
	return <ExecutionDetail executionId={executionId} />;
}

