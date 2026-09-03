"use client";

import { FileText, ShieldCheck } from "lucide-react";

const events = [
	{ action: "Audit stream ready", detail: "Live event retrieval will appear here when the API endpoint is enabled.", time: "System" },
	{ action: "Project and key mutations are recorded", detail: "Creation, revocation, status changes, and GitHub updates are persisted by the API.", time: "API" },
];

export default function AuditLogsPage() {
	return <div className="mx-auto flex max-w-5xl flex-col gap-8"><div><p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-600">Governance</p><h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">Audit logs</h1><p className="mt-1 text-sm text-slate-500">A record of security-sensitive changes across your workspace.</p></div><div className="rounded-xl border border-slate-200 bg-white"><div className="flex items-center gap-3 border-b border-slate-200 p-5"><FileText className="h-5 w-5 text-blue-600" /><div><h2 className="font-semibold text-slate-900">Event history</h2><p className="text-xs text-slate-500">Read access is being wired to the audit API.</p></div></div><div className="divide-y divide-slate-100">{events.map((event) => <div key={event.action} className="flex gap-4 p-5"><span className="mt-1 h-2 w-2 rounded-full bg-blue-600" /><div className="flex-1"><p className="text-sm font-medium text-slate-800">{event.action}</p><p className="mt-1 text-sm text-slate-500">{event.detail}</p></div><span className="text-xs font-mono text-slate-400">{event.time}</span></div>)}</div></div><div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 p-5"><ShieldCheck className="mt-0.5 h-5 w-5 text-blue-600" /><p className="text-sm text-blue-900">Audit records are written by the API for traceability. This page will become queryable when the read endpoint is added.</p></div></div>;
}
