"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { projectsApi } from "../../lib/api/projects";
import { meApi } from "../../lib/api/me";
import { Button } from "../ui/Button";

export function NewProjectForm() {
	const router = useRouter();
	const [name, setName] = useState("");
	const [environment, setEnvironment] = useState("development");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	/** Submits the authenticated project creation form. */
	async function submit(event: FormEvent) {
		event.preventDefault();
		setLoading(true);
		setError("");
		try {
			const me = await meApi.get();
			const organizationId = me.organizations[0]?.id;
			if (!organizationId) throw new Error("No organization is available for this account.");
			await projectsApi.create({ organizationId, name: name.trim(), environment });
			router.push("/dashboard");
		} catch (value) {
			setError(value instanceof Error ? value.message : "Unable to create project.");
		} finally {
			setLoading(false);
		}
	}
	return <form onSubmit={submit} className="mt-8 space-y-5"><label className="block text-sm font-medium">Name<input required value={name} onChange={(event) => setName(event.target.value)} className="mt-2 w-full rounded-md border p-3" /></label><label className="block text-sm font-medium">Environment<select value={environment} onChange={(event) => setEnvironment(event.target.value)} className="mt-2 w-full rounded-md border p-3"><option>development</option><option>staging</option><option>production</option></select></label>{error && <p className="text-sm text-rose-600">{error}</p>}<Button disabled={loading}>{loading ? "Creating..." : "Create project"}</Button></form>;
}