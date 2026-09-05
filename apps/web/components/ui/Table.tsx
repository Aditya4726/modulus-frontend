import type { ReactNode } from "react";

/** Wraps table markup with the shared bordered surface treatment. */
export function Table({ children }: { children: ReactNode }) {
	return <div className="overflow-hidden rounded-xl border border-[#2DD4BF]/15 bg-[#0A1211]"><table className="w-full text-left text-sm text-slate-300">{children}</table></div>;
}