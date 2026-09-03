"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";

const NAV_LINKS = [
	{ label: "Product", href: "#features" },
	{ label: "Architecture", href: "#architecture" },
	{ label: "How it works", href: "#how-it-works" },
	{ label: "Security", href: "#security" },
];

export function Navbar() {
	const [open, setOpen] = useState(false);

	return (
		<header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
			<div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
				<Link href="/" className="flex items-center gap-2.5">
					<Logo />
					<span className="text-lg font-extrabold text-slate-900 tracking-tight">
						Modulus
					</span>
				</Link>

				<nav className="hidden lg:flex items-center gap-8">
					{NAV_LINKS.map((link) => (
						<a
							key={link.href}
							href={link.href}
							className="text-sm font-medium text-slate-600 hover:text-slate-900 transition"
						>
							{link.label}
						</a>
					))}
				</nav>

				<div className="hidden lg:flex items-center gap-3">
					<Link
						href="/login"
						className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition px-3 py-2"
					>
						Log in
					</Link>
					<Link
						href="/register"
						className="text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md px-4 py-2.5 transition"
					>
						Start free
					</Link>
				</div>

				<button
					onClick={() => setOpen((v) => !v)}
					className="lg:hidden p-2 text-slate-700"
					aria-label="Toggle menu"
				>
					{open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
				</button>
			</div>

			{open && (
				<div className="lg:hidden border-t border-slate-100 bg-white px-6 py-4 flex flex-col gap-1">
					{NAV_LINKS.map((link) => (
						<a
							key={link.href}
							href={link.href}
							onClick={() => setOpen(false)}
							className="text-sm font-medium text-slate-600 hover:text-slate-900 py-2.5"
						>
							{link.label}
						</a>
					))}
					<div className="flex flex-col gap-2 mt-3 pt-3 border-t border-slate-100">
						<Link
							href="/login"
							className="text-sm font-semibold text-slate-700 border border-slate-200 rounded-lg px-4 py-2.5 text-center"
						>
							Log in
						</Link>
						<Link
							href="/register"
							className="text-sm font-semibold text-white bg-blue-600 rounded-md px-4 py-2.5 text-center"
						>
							Start free
						</Link>
					</div>
				</div>
			)}
		</header>
	);
}