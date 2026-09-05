import { redirect } from "next/navigation";
/** Redirects the project root to its dashboard route. */
export default async function ProjectRoot({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; redirect(`/projects/${id}/dashboard`); }