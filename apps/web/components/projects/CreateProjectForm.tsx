"use client";

import { type FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createProject } from "../../lib/api/projects";
import { Button } from "../ui/Button";

/** Submits the standalone project creation form. */
export function CreateProjectForm() {
	const router = useRouter();
	const [name, setName] = useState("");
	const [environment, setEnvironment] = useState("development");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	async function submit(event: FormEvent) {
		event.preventDefault();
		setLoading(true);
		setError("");
		try {
			await createProject({ name: name.trim(), environment });
			router.push("/projects");
		} catch (value) {
			setError(value instanceof Error ? value.message : "Unable to create project.");
		} finally {
			setLoading(false);
		}
	}

	return <form onSubmit={submit} className="mt-8 space-y-5"><label className="block text-sm font-medium text-[#EAF6F3]">Project name<input required value={name} onChange={(event) => setName(event.target.value)} className="mt-2 w-full rounded-lg border border-[#2DD4BF]/15 bg-black/25 p-3 text-white outline-none focus:border-[#2DD4BF]/60" placeholder="Checkout Agent" /></label><label className="block text-sm font-medium text-[#EAF6F3]">Environment<select value={environment} onChange={(event) => setEnvironment(event.target.value)} className="mt-2 w-full rounded-lg border border-[#2DD4BF]/15 bg-[#0A1211] p-3 text-white outline-none focus:border-[#2DD4BF]/60"><option>development</option><option>staging</option><option>production</option></select></label>{error && <p className="rounded-lg border border-rose-300/20 bg-rose-400/10 px-3 py-2 text-sm text-rose-200">{error}</p>}<Button className="bg-[#2DD4BF] text-black hover:bg-[#5EEAD4]" disabled={loading}>{loading ? "Creating..." : "Create project"}</Button></form>;
}