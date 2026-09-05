"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
	{ label: "Dashboard", segment: "dashboard" },
	{ label: "Executions", segment: "executions" },
	{ label: "Incidents", segment: "incidents" },
	{ label: "Settings", segment: "settings" },
];

export function ProjectSidebar({ projectId }: { projectId: string }) {
	const pathname = usePathname();
	return <aside className="w-full border-b border-[#2DD4BF]/15 bg-[#071012] p-4 text-slate-100 lg:min-h-screen lg:w-64 lg:border-b-0 lg:border-r"><Link href="/projects" className="block px-3 text-sm font-semibold tracking-wide text-teal-200">Modulus</Link><nav className="mt-7 grid grid-cols-2 gap-1 lg:block lg:space-y-1">{tabs.map((tab) => { const href = `/projects/${projectId}/${tab.segment}`; const active = pathname === href || pathname.startsWith(`${href}/`); return <Link key={tab.segment} href={href} className={`hero-hover block rounded-lg px-3 py-2.5 text-sm transition ${active ? "bg-teal-300 text-[#071012]" : "text-slate-400 hover:bg-white/10 hover:text-white"}`}>{tab.label}</Link>; })}</nav></aside>;
}