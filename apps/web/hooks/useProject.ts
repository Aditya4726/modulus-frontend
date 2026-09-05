"use client";

import { useEffect, useState } from "react";
import { getProjects } from "../lib/api/projects";
import type { Project } from "../types/project";
import type { ApiError } from "../types/api";

/** Loads available projects and optionally resolves one project by ID. */
export function useProject(id?: string) {
	const [projects, setProjects] = useState<Project[]>([]);
	const [error, setError] = useState<ApiError | null>(null);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		let active = true;
		async function loadProjects() {
			try {
				const values = await getProjects();
				if (active) setProjects(values);
			} catch (value) {
				if (active) setError(value as ApiError);
			} finally {
				if (active) setLoading(false);
			}
		}

		void loadProjects();
		return () => { active = false; };
	}, []);
	return { projects, project: id ? projects.find((item) => item.id === id) ?? null : null, error, loading };
}