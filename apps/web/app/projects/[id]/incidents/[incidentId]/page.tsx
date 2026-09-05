import { IncidentDetailView } from "../../../../../components/incidents/IncidentDetailView";

/** Renders the full incident detail view. */
export default async function IncidentDetailPage({ params }: { params: Promise<{ incidentId: string }> }) { const { incidentId } = await params; return <IncidentDetailView incidentId={incidentId} />; }