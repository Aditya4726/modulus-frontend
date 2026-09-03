import Link from "next/link";
import { Logo } from "./logo";

const COLUMNS = [
	{
		title: "Product",
		links: [
			{ label: "Features", href: "#features" },
			{ label: "Architecture", href: "#architecture" },
			{ label: "How it works", href: "#how-it-works" },
			{ label: "Security", href: "#security" },
		],
	},
	{
		title: "Developers",
		links: [
			{ label: "Documentation", href: "/docs" },
			{ label: "TypeScript SDK", href: "/docs/sdk" },
			{ label: "API reference", href: "/docs/api" },
			{ label: "Changelog", href: "/changelog" },
		],
	},
	{
		title: "Company",
		links: [
			{ label: "About", href: "/about" },
			{ label: "Blog", href: "/blog" },
			{ label: "Careers", href: "/careers" },
			{ label: "Contact", href: "/contact" },
		],
	},
];

export function Footer() {
	return (
		<footer className="bg-white border-t border-slate-100 pt-16 pb-8">
			<div className="max-w-7xl mx-auto px-6">
				<div className="grid sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10 pb-12">
					<div>
						<div className="flex items-center gap-2.5 mb-3">
							<Logo />
							<span className="text-lg font-extrabold text-slate-900">Modulus</span>
						</div>
						<p className="text-sm text-slate-500 max-w-xs leading-relaxed">
							Agent reliability engineering. Your AI engineer&apos;s best
							friend.
						</p>
					</div>

					{COLUMNS.map((col) => (
						<div key={col.title}>
							<p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-4">
								{col.title}
							</p>
							<ul className="flex flex-col gap-2.5">
								{col.links.map((link) => (
									<li key={link.label}>
										<Link
											href={link.href}
											className="text-sm text-slate-600 hover:text-slate-900 transition"
										>
											{link.label}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				<div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
					<p className="text-xs text-slate-400">
						&copy; {new Date().getFullYear()} Modulus. All rights reserved.
					</p>
					<div className="flex items-center gap-5">
						<Link href="/privacy" className="text-xs text-slate-400 hover:text-slate-600">
							Privacy
						</Link>
						<Link href="/terms" className="text-xs text-slate-400 hover:text-slate-600">
							Terms
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}