/** Renders a compact status badge using the requested semantic tone. */
export function Badge({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "success" | "warning" | "danger" }) {
	const colors = {
		neutral: "bg-white/10 text-slate-300",
		success: "bg-emerald-400/10 text-emerald-300",
		warning: "bg-amber-400/10 text-amber-300",
		danger: "bg-rose-400/10 text-rose-300",
	};
	const className = `rounded-full px-2 py-1 text-xs font-medium ${colors[tone]}`;

	return <span className={className}>{children}</span>;
}