import Link from "next/link";
/** Renders links to project settings subsections. */
export default async function ProjectSettingsPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const settingsLinks = [
		{ href: `/projects/${id}/settings/api-keys`, title: "API keys", description: "Create and revoke ingestion keys." },
		{ href: `/projects/${id}/settings/github`, title: "GitHub", description: "Configure repository access and pull request sync." },
	];
	return <main className="hero-shell min-h-[calc(100vh-88px)] p-6 sm:p-8"><div className="hero-reveal max-w-2xl"><p className="font-mono text-xs uppercase tracking-[0.18em] text-[#2DD4BF]">Configuration</p><h1 className="mt-2 text-3xl font-semibold text-[#EAF6F3]">Project settings</h1><div className="mt-8 grid gap-3">{settingsLinks.map((link) => <Link key={link.href} className="hero-panel hero-hover block p-5" href={link.href}><strong className="text-[#EAF6F3]">{link.title}</strong><span className="mt-1 block text-sm text-[#8FA39E]">{link.description}</span></Link>)}</div></div></main>;
}