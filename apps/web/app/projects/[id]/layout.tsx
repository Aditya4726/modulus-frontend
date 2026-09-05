import type { ReactNode } from "react";
import { ProjectHeader } from "../../../components/layout/ProjectHeader";
import { ProjectSidebar } from "../../../components/layout/ProjectSidebar";

/** Wraps project routes with the project sidebar and project header. */
export default async function ProjectLayout({
	children,
	params,
}: {
	children: ReactNode;
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	return (
		<div className="hero-shell flex min-h-screen flex-col lg:flex-row">
			<ProjectSidebar projectId={id} />
			<div className="min-w-0 flex-1 bg-[#050807]/70">
				<ProjectHeader projectId={id} />
				<main>{children}</main>
			</div>
		</div>
	);
}
