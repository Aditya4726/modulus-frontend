"use client";

import { FormEvent, useState } from "react";
import { projectsApi } from "../../lib/api/projects";
import { Button } from "../ui/Button";

/** Renders GitHub token, webhook secret, and pull-request sync controls. */
export function GithubSettingsForm({ projectId }: { projectId: string }) {
	const [token, setToken] = useState("");
	const [secret, setSecret] = useState("");
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");

	async function submit(event: FormEvent) {
		event.preventDefault();
		setError("");
		setMessage("");
		try {
			if (token) await projectsApi.setGithubToken(projectId, token);
			if (secret) await projectsApi.setWebhookSecret(projectId, secret);
			setToken("");
			setSecret("");
			setMessage("GitHub settings updated.");
		} catch (value) {
			setError(value instanceof Error ? value.message : "Unable to update GitHub settings.");
		}
	}

	async function sync() {
		try {
			const result = await projectsApi.syncPrs(projectId);
			setMessage(`Synced ${result.synced} pull requests.`);
		} catch (value) {
			setError(value instanceof Error ? value.message : "Unable to sync pull requests.");
		}
	}

	return <><h1 className="text-3xl font-semibold">GitHub settings</h1><form onSubmit={submit} className="mt-8 space-y-5"><label className="block text-sm font-medium">GitHub token<input type="password" minLength={10} value={token} onChange={(event) => setToken(event.target.value)} className="mt-2 w-full rounded-md border p-3" /></label><label className="block text-sm font-medium">Webhook secret<input type="password" minLength={10} value={secret} onChange={(event) => setSecret(event.target.value)} className="mt-2 w-full rounded-md border p-3" /></label><div className="flex gap-3"><Button>Save settings</Button><Button type="button" className="bg-white text-neutral-900 ring-1 ring-neutral-300" onClick={() => void sync()}>Sync PRs</Button></div></form>{message && <p className="mt-4 text-sm text-emerald-700">{message}</p>}{error && <p className="mt-4 text-sm text-rose-600">{error}</p>}</>;
}