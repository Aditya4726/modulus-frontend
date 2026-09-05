"use client";

import { useEffect, useState } from "react";
/** Renders an animated count-up card for estimated debugging time saved. */
export function TimeSavedCard({ minutes, assumptionNote }: { minutes: number; assumptionNote?: string }) {
	const [value, setValue] = useState(0);

	useEffect(() => {
		const start = performance.now();
		const timer = window.setInterval(() => {
			const progress = Math.min(1, (performance.now() - start) / 900);
			setValue(Math.round(minutes * progress));
			if (progress === 1) window.clearInterval(timer);
		}, 30);
		return () => window.clearInterval(timer);
	}, [minutes]);

	const hours = Math.floor(value / 60);
	const remainingMinutes = value % 60;
	const displayValue = hours ? `${hours}h ${remainingMinutes}m` : `${value} min`;
	return <div className="rounded-xl border border-teal-900 bg-[#071012] p-6 text-white"><p className="text-sm text-teal-200/70">Estimated time saved</p><p className="mt-3 text-4xl font-semibold">{displayValue}</p><p className="mt-2 text-xs text-slate-400">Across merged fixes <span title={assumptionNote}>ⓘ</span></p></div>;
}