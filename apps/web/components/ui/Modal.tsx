import type { ReactNode } from "react";

/** Renders a centered accessible dialog surface with a close action. */
export function Modal({ title, children, onClose }: { title: string; children: ReactNode; onClose: () => void }) {
	return <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 backdrop-blur-sm"><div className="hero-panel w-full max-w-lg p-6"><div className="mb-4 flex items-center justify-between"><h2 className="text-lg font-semibold text-[#EAF6F3]">{title}</h2><button type="button" onClick={onClose} aria-label="Close" className="text-xl text-slate-500 transition hover:text-[#EAF6F3]">×</button></div>{children}</div></div>;
}