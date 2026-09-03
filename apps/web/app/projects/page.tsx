"use client";

import Link from "next/link";
import { FolderKanban, Plus, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { apiFetch } from "../../lib/api-client";

/* Backend integration: GET /api/projects lists the signed-in user's projects.
 * POST /api/projects creates one with { name, organizationId }; GET /api/me
 * supplies organizationId. Return { success, data, error } consistently.
 */

interface Project {
	id: string;
	name: string;
	environment: string;
}

export default function ProjectsPage() {
	const [projects, setProjects] = useState<Project[]>([]);
	const [name, setName] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	async function loadProjects() {
		try {
			const data = await apiFetch<Project[]>("/api/projects");

			if (data.success && data.data) {
				setProjects(data.data);
			}
		} catch {
			setError("Failed to load projects.");
		}
	}

	useEffect(() => {
		const timer = window.setTimeout(() => void loadProjects(), 0);
		return () => window.clearTimeout(timer);
	}, []);

	async function createProject(e: React.SubmitEvent<HTMLFormElement>) {
		e.preventDefault();

		if (!name.trim()) {
			setError("Project name is required.");
			return;
		}

		setError(null);
		setLoading(true);

		try {
			const me = await apiFetch<{ organizations?: { id: string }[] }>("/api/me");

			const organizationId = me.data?.organizations?.[0]?.id;

			if (!me.success || !organizationId) {
				setError("Unable to find your organization.");
				return;
			}

			const data = await apiFetch<Project[]>("/api/projects", {
				method: "POST",
				body: JSON.stringify({
					name: name.trim(),
					organizationId,
				}),
			});

			if (!data.success) {
				setError(data.error?.message ?? "Failed to create project.");
				return;
			}

			setName("");
			await loadProjects();
		} catch {
			setError("Something went wrong. Please try again.");
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="mx-auto flex max-w-6xl flex-col gap-8">
			<div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
				<div>
					<p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-600">Workspace</p>
					<h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">Projects</h1>
					<p className="mt-1 text-sm text-slate-500">Choose a project to inspect its agents, traces, and incidents.</p>
				</div>
				<form onSubmit={createProject} className="flex gap-2">
					<input className="w-52 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" placeholder="New project name" value={name} onChange={(e) => setName(e.target.value)} disabled={loading} />
					<button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50" type="submit" disabled={loading}><Plus className="h-4 w-4" />{loading ? "Creating..." : "Create"}</button>
				</form>
			</div>

			{error && <p className="rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
			{projects.length > 0 ? (
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{projects.map((project) => (
						<Link key={project.id} href={`/projects/${project.id}/dashboard`} className="group rounded-xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-[0_10px_28px_rgba(15,23,42,0.07)]">
							<div className="flex items-start justify-between"><span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600"><FolderKanban className="h-5 w-5" /></span><ArrowRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600" /></div>
							<h2 className="mt-5 text-base font-semibold text-slate-900">{project.name}</h2>
							<p className="mt-1 text-xs text-slate-400">{project.environment} environment</p>
						</Link>
					))}
				</div>
			) : <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center"><FolderKanban className="mx-auto h-8 w-8 text-slate-300" /><p className="mt-3 text-sm font-medium text-slate-700">No projects yet</p><p className="mt-1 text-xs text-slate-400">Create your first project to start collecting traces.</p></div>}
		</div>
	);
}
