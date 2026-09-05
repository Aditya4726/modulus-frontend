"use client";

import { useApiKeys } from "../../hooks/useApiKeys";
import { Button } from "../ui/Button";
import { ApiKeyRevealModal } from "../shared/ApiKeyRevealModal";

/** Renders masked API keys and the one-time creation reveal flow. */
export function ApiKeysPanel({ projectId }: { projectId: string }) {
	const { keys, createdKey, setCreatedKey, loading, error, createKey, revokeKey } = useApiKeys(projectId);
	return <><div className="flex items-start justify-between"><div><h1 className="text-3xl font-semibold">API keys</h1><p className="mt-2 text-sm text-neutral-500">Raw values are revealed once at creation. Stored keys remain masked.</p></div><Button type="button" disabled={loading} onClick={() => void createKey()}>{loading ? "Working..." : "Create key"}</Button></div>{error && <p className="mt-4 text-sm text-rose-600">{error.message}</p>}<div className="mt-8 divide-y rounded-lg border bg-white">{keys.length ? keys.map((key) => <div key={key.id} className="flex items-center justify-between p-4"><div><span className="font-mono text-sm">{key.prefix}••••••••</span><p className="mt-1 text-xs text-slate-500">Created {new Date(key.createdAt).toLocaleDateString()}</p></div><Button type="button" disabled={loading} className="bg-white text-rose-700 ring-1 ring-rose-200" onClick={() => void revokeKey(key.id)}>Revoke</Button></div>) : <p className="p-6 text-sm text-neutral-500">No API keys yet.</p>}</div>{createdKey && <ApiKeyRevealModal apiKey={createdKey} onClose={() => setCreatedKey(null)} />}</>;
}