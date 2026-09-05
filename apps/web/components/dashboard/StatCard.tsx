export function StatCard({ label, value, detail, tone = "light" }: { label: string; value: string | number; detail?: string; tone?: "light" | "dark" }) {
	const isDark = tone === "dark";
	const surfaceClassName = isDark ? "border-teal-900 bg-[#071012] text-white" : "border-teal-100 bg-white text-[#102522]";
	const labelClassName = isDark ? "text-teal-200/70" : "text-slate-500";
	const detailClassName = isDark ? "text-slate-400" : "text-slate-500";
	return <article className={`rounded-xl border p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${surfaceClassName}`}><p className={`text-sm ${labelClassName}`}>{label}</p><p className="mt-2 text-3xl font-semibold tracking-tight">{value}</p>{detail && <p className={`mt-2 text-xs ${detailClassName}`}>{detail}</p>}</article>;
}