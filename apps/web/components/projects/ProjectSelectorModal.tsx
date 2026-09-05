"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useProject } from "../../hooks/useProject";

export function ProjectSelectorModal({ open, onClose }: { open: boolean; onClose: () => void }) {
	const router = useRouter();
	const { projects } = useProject();
	const [query, setQuery] = useState("");
	const [active, setActive] = useState(0);
	const inputRef = useRef<HTMLInputElement>(null);
	const normalizedQuery = query.toLowerCase();
	const filtered = projects.filter((project) => project.name.toLowerCase().includes(normalizedQuery) || project.organizationId.toLowerCase().includes(normalizedQuery));
	useEffect(() => { if (open) { // eslint-disable-next-line react-hooks/set-state-in-effect
		setQuery(""); setActive(0); window.setTimeout(() => inputRef.current?.focus(), 0); } }, [open]);
	useEffect(() => {
		if (!open) return;
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") onClose();
			if (event.key === "ArrowDown") { event.preventDefault(); setActive((value) => Math.min(value + 1, Math.max(filtered.length - 1, 0))); }
			if (event.key === "ArrowUp") { event.preventDefault(); setActive((value) => Math.max(value - 1, 0)); }
			if (event.key === "Enter" && filtered[active]) { onClose(); router.push(`/projects/${filtered[active].id}/dashboard`); }
		};
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [active, filtered, onClose, open, router]);

	return <AnimatePresence>{open && <motion.div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/45 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={onClose}><motion.div role="dialog" aria-modal="true" aria-label="Choose project" className="w-full max-w-lg rounded-xl border border-teal-100 bg-white p-5 shadow-2xl" initial={{ opacity: 0, scale: .96, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .96, y: 8 }} transition={{ duration: .18 }} onMouseDown={(event) => event.stopPropagation()}><div className="flex items-center justify-between"><h2 className="text-lg font-semibold text-slate-900">Switch project</h2><button type="button" onClick={onClose} aria-label="Close project selector" className="text-xl text-slate-400">×</button></div><input ref={inputRef} value={query} onChange={(event) => { setQuery(event.target.value); setActive(0); }} placeholder="Search projects..." className="mt-4 w-full rounded-md border border-teal-100 p-3 outline-none focus:border-teal-400" /><div className="mt-3 max-h-72 overflow-y-auto">{filtered.length ? filtered.map((project, index) => <button key={project.id} type="button" className={`flex w-full items-center justify-between rounded-lg p-3 text-left ${index === active ? "bg-teal-50" : "hover:bg-slate-50"}`} onClick={() => { onClose(); router.push(`/projects/${project.id}/dashboard`); }}><span><strong className="block text-sm text-slate-900">{project.name}</strong><span className="text-xs text-slate-500">{project.organizationId}</span></span><span className="rounded-full bg-teal-50 px-2 py-1 text-xs capitalize text-teal-700">{project.role}</span></button>) : <p className="p-6 text-center text-sm text-slate-500">No projects match your search.</p>}</div></motion.div></motion.div>}</AnimatePresence>;
}