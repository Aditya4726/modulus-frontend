"use client";

import Link from "next/link";
import { useState } from "react";
import { useProject } from "../../hooks/useProject";
import { ProjectSelectorModal } from "../projects/ProjectSelectorModal";

export function ProjectHeader({ projectId }: { projectId: string }) {
	const { project, loading } = useProject(projectId);
	const [selectorOpen, setSelectorOpen] = useState(false);
	const projectName = loading ? "Loading project..." : project?.name ?? "Project";
	const projectMeta = project ? `${project.environment} · ${project.role}` : null;
	return <><header className="border-b border-[#2DD4BF]/15 bg-[#050807]/85 px-6 py-5 backdrop-blur-xl sm:px-8"><div className="mx-auto max-w-7xl"><div className="flex items-center gap-2 font-mono text-xs text-[#7C9490]"><Link href="/projects" className="transition hover:text-[#EAF6F3]">Projects</Link><span>/</span><span>{projectName}</span></div><div className="mt-2 flex flex-wrap items-center justify-between gap-3"><div><h1 className="text-xl font-semibold text-[#EAF6F3]">{projectName}</h1>{projectMeta && <p className="mt-1 text-sm text-[#8FA39E]">{projectMeta}</p>}</div><button type="button" onClick={() => setSelectorOpen(true)} className="hero-hover rounded-lg border border-[#2DD4BF]/25 bg-[#2DD4BF]/5 px-3 py-2 text-sm font-medium text-[#B7F5EB] hover:bg-[#2DD4BF]/10">Switch project</button></div></div></header><ProjectSelectorModal open={selectorOpen} onClose={() => setSelectorOpen(false)} /></>;
}