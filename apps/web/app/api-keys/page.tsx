"use client";

import { KeyRound, Plus, Copy, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { apiFetch } from "../../lib/api-client";

/* Backend integration: GET /api/projects populates the project selector.
 * POST /api/projects/:projectId/keys creates a project-scoped key and must
 * return the plaintext key once in { success, data: { rawKey, ... } }.
 */

type Project = { id: string; name: string };

type CreatedKey = { id: string; rawKey: string; prefix?: string };

export default function ApiKeysPage() {
	const [projects, setProjects] = useState<Project[]>([]);
	const [projectId, setProjectId] = useState("");
	const [label, setLabel] = useState("");
	const [created, setCreated] = useState<CreatedKey | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [copied, setCopied] = useState(false);
	useEffect(() => { void apiFetch<Project[]>("/api/projects").then((res) => { if (res.data) { setProjects(res.data); setProjectId(res.data[0]?.id ?? ""); } }); }, []);
	async function createKey(event: React.FormEvent<HTMLFormElement>) { event.preventDefault(); setError(null); if (!projectId) { setError("Create a project before issuing a key."); return; } const res = await apiFetch<CreatedKey>(`/api/projects/${projectId}/keys`, { method: "POST", body: JSON.stringify({}) }); if (res.success && res.data) { setCreated(res.data); setLabel(""); } else setError(res.error?.message ?? "Unable to create key."); }
	return <div className="mx-auto flex max-w-5xl flex-col gap-8"><div><p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-600">Platform</p><h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">API keys</h1><p className="mt-1 text-sm text-slate-500">Issue project-scoped keys for trace ingestion. Keys are shown once.</p></div><div className="grid gap-5 lg:grid-cols-[1fr_320px]"><div className="rounded-xl border border-slate-200 bg-white p-6"><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600"><KeyRound className="h-5 w-5" /></span><div><h2 className="font-semibold text-slate-900">Issue an ingestion key</h2><p className="text-xs text-slate-500">Use it in your agent&apos;s Authorization header.</p></div></div><form onSubmit={createKey} className="mt-6 flex flex-col gap-4"><select value={projectId} onChange={(e) => setProjectId(e.target.value)} className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm"><option value="">Select a project</option>{projects.map((project) => <option key={project.id} value={project.id}>{project.name}</option>)}</select><input value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Key label (optional)" className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm" /><button className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"><Plus className="h-4 w-4" />Create key</button></form>{error && <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}</div><div className="rounded-xl border border-slate-200 bg-slate-950 p-6 text-slate-200"><p className="font-mono text-xs text-blue-300">POST /api/ingest/traces</p><p className="mt-4 text-sm leading-relaxed text-slate-400">Existing keys are intentionally not listed by the API. Revoke or rotate keys from the project security controls.</p></div></div>{created && <div className="rounded-xl border border-amber-200 bg-amber-50 p-5"><p className="text-sm font-semibold text-amber-900">Copy this key now. It will not be shown again.</p><div className="mt-3 flex items-center gap-2"><code className="min-w-0 flex-1 truncate rounded-lg bg-white px-3 py-2 font-mono text-xs text-slate-700">{created.rawKey}</code><button type="button" onClick={() => { void navigator.clipboard.writeText(created.rawKey); setCopied(true); }} className="inline-flex items-center gap-2 rounded-lg border border-amber-200 bg-white px-3 py-2 text-xs font-semibold text-amber-900">{copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}{copied ? "Copied" : "Copy"}</button></div></div>}</div>;
}
