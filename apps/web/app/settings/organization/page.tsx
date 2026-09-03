"use client";

import { Building2, Users, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { apiFetch } from "../../../lib/api-client";

/* Backend integration: GET /api/me returns the authenticated user and
 * organizations[]. The first organization is the workspace displayed here;
 * expose a stable organization id/name payload for future member mutations.
 */

type Organization = { id: string; name: string; role?: string };

export default function OrganizationPage() {
	const [organization, setOrganization] = useState<Organization | null>(null);
	useEffect(() => { void apiFetch<{ organizations?: Organization[] }>("/api/me").then((res) => setOrganization(res.data?.organizations?.[0] ?? null)); }, []);
	return <div className="mx-auto flex max-w-5xl flex-col gap-8"><div><p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-600">Settings</p><h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">Organization</h1><p className="mt-1 text-sm text-slate-500">Manage the workspace that owns your projects and telemetry.</p></div><div className="grid gap-5 lg:grid-cols-[1fr_280px]"><div className="rounded-xl border border-slate-200 bg-white p-6"><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600"><Building2 className="h-5 w-5" /></span><div><h2 className="font-semibold text-slate-900">Workspace profile</h2><p className="text-xs text-slate-500">Loaded from your current session.</p></div></div><dl className="mt-6 space-y-4"><div className="flex justify-between border-b border-slate-100 pb-3"><dt className="text-sm text-slate-500">Name</dt><dd className="text-sm font-semibold text-slate-900">{organization?.name ?? "Loading..."}</dd></div><div className="flex justify-between"><dt className="text-sm text-slate-500">Your role</dt><dd className="text-sm font-semibold text-slate-900">{organization?.role ?? "Administrator"}</dd></div></dl></div><div className="rounded-xl border border-slate-200 bg-white p-6"><Users className="h-5 w-5 text-blue-600" /><h2 className="mt-4 font-semibold text-slate-900">Members</h2><p className="mt-1 text-sm text-slate-500">Member management endpoints are ready to connect.</p><button className="mt-5 inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"><UserPlus className="h-4 w-4" />Invite member</button></div></div></div>;
}
