"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { githubApi, isGithubConnected } from "../../lib/api/github";
import { Button } from "../ui/Button";

export function GithubConnectionPanel({ projectId }: { projectId: string }) {
	const router = useRouter();
	const [connected, setConnected] = useState(() => isGithubConnected(projectId));
	const [connecting, setConnecting] = useState(false);
	const [error, setError] = useState("");
	async function connect() {
		setConnecting(true);
		setError("");
		try {
			if (process.env.NEXT_PUBLIC_GITHUB_INSTALL_URL) {
				window.location.assign(`${process.env.NEXT_PUBLIC_GITHUB_INSTALL_URL}?state=${encodeURIComponent(projectId)}`);
				return;
			}
			await githubApi.installCallback(projectId, 10001);
			setConnected(true);
			router.refresh();
		} catch (value) {
			setError(value instanceof Error ? value.message : "Unable to connect GitHub.");
		} finally {
			setConnecting(false);
		}
	}
	return <section className="rounded-xl border border-teal-100 bg-white p-6"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="font-mono text-xs uppercase tracking-[0.16em] text-teal-700">Repository integration</p><h1 className="mt-2 text-3xl font-semibold text-[#102522]">GitHub</h1><p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">Connect GitHub to reconcile pull requests and attach generated fixes to your project.</p></div><span className={`rounded-full px-3 py-1.5 text-xs font-medium ${connected ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>{connected ? "Connected" : "Not connected"}</span></div><div className="mt-8"><Button type="button" disabled={connecting || connected} onClick={() => void connect()}>{connected ? "GitHub connected" : connecting ? "Connecting..." : "Connect GitHub"}</Button></div>{error && <p className="mt-4 text-sm text-rose-600">{error}</p>}</section>;
}