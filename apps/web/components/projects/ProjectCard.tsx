import Link from "next/link";
import type { Project } from "../../types/project";

/** Renders one project card linked to the standalone dashboard. */
export function ProjectCard({ project }: { project: Project }) {
	return (
		<Link href={`/projects/${project.id}/dashboard`} className="hero-panel hero-hover group block p-5">
			<div className="flex items-start justify-between gap-4">
				<div><p className="text-lg font-semibold text-[#EAF6F3]">{project.name}</p><p className="mt-1 text-sm text-[#8FA39E]">{project.environment}</p></div>
				<span className="rounded-full bg-[#2DD4BF]/10 px-2.5 py-1 text-xs font-medium capitalize text-[#B7F5EB]">{project.role}</span>
			</div>
			<span className="mt-6 block font-mono text-sm font-medium text-[#2DD4BF] group-hover:text-[#5EEAD4]">Open dashboard →</span>
		</Link>
	);
}