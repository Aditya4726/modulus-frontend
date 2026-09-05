import { DashboardView } from "../../../../components/dashboard/DashboardView";

/** Renders the project-scoped dashboard view. */
export default async function DashboardPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	return <DashboardView projectId={id} />;
}