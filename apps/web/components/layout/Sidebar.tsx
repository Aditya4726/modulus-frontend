"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../lib/auth-client";
/** Renders the global dark application sidebar. */
export function Sidebar() {
	const router = useRouter();
	const { logout } = useAuth();

	async function handleLogout() {
		await logout();
		router.replace("/login");
	}

	return <aside className="hidden w-60 shrink-0 border-r border-white/10 bg-[#0d0d15] p-5 text-white md:block"><Link href="/dashboard" className="text-lg font-semibold">Modulus</Link><nav className="mt-8 space-y-1 text-sm text-slate-300"><Link className="block rounded px-3 py-2 hover:bg-white/10" href="/dashboard">Dashboard</Link><Link className="block rounded px-3 py-2 hover:bg-white/10" href="/projects">Projects</Link><Link className="block rounded px-3 py-2 hover:bg-white/10" href="/settings/security">Security</Link></nav><button type="button" onClick={() => void handleLogout()} className="mt-8 rounded px-3 py-2 text-sm text-slate-400 hover:bg-white/10 hover:text-white">Log out</button></aside>;
}