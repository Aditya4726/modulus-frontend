"use client";

import Link from "next/link";
import { ProjectCard } from "../../components/projects/ProjectCard";
import { useProject } from "../../hooks/useProject";
import { EmptyState } from "../../components/shared/EmptyState";
import { ErrorState } from "../../components/shared/ErrorState";
import { LoadingSkeleton } from "../../components/shared/LoadingSkeleton";

/** Renders the project collection with loading, error, and empty states. */
export default function ProjectsPage() {
	const { projects, error, loading } = useProject();
	if (loading) return <LoadingSkeleton />;
	if (error) return <ErrorState message={error.message} onRetry={() => window.location.reload()} />;
	if (!projects.length) return <main className="hero-shell p-8"><EmptyState title="No projects yet" message="Create your first project to begin." /></main>;

	return (
		<main className="hero-shell px-6 py-10 sm:px-10 lg:px-16"><div className="mx-auto max-w-6xl hero-reveal"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#2DD4BF]">Workspace</p><h1 className="mt-2 text-4xl font-semibold tracking-tight text-[#EAF6F3]">Your projects</h1><p className="mt-2 text-sm text-[#8FA39E]">Choose a project to open its reliability dashboard.</p></div><Link href="/projects/new" className="hero-hover rounded-lg bg-[#2DD4BF] px-4 py-2 text-sm font-semibold text-black shadow-[0_0_18px_rgba(45,212,191,.2)] hover:bg-[#5EEAD4]">New project</Link></div><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{projects.map((project) => <ProjectCard key={project.id} project={project} />)}</div></div></main>
	);
}
