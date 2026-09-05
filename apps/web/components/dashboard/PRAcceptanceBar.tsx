"use client";

import { motion } from "framer-motion";
/** Renders the animated merged-versus-total pull request bar. */
export function PRAcceptanceBar({ total, merged, rate }: { total: number; merged: number; rate: number | null }) {
	const percent = Math.max(0, Math.min(100, (rate ?? 0) * 100));
	const displayRate = rate === null ? "—" : `${percent.toFixed(1)}%`;
	return <section className="rounded-xl border border-teal-100 bg-white p-6"><div className="flex items-start justify-between"><div><h2 className="font-semibold">Pull request acceptance</h2><p className="mt-1 text-sm text-slate-500">Merged fixes compared with generated PRs</p></div><strong className="text-2xl text-teal-700">{displayRate}</strong></div><div className="mt-8 h-4 overflow-hidden rounded-full bg-teal-50"><motion.div initial={{ width: 0 }} animate={{ width: `${percent}%` }} transition={{ duration: 1 }} className="h-full rounded-full bg-teal-500" /></div><p className="mt-3 text-sm text-slate-500">{merged} merged of {total} total</p></section>;
}