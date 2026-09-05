import Link from "next/link";
/** Renders project section navigation links. */
export function ProjectNav({ projectId }: { projectId: string }) {
	const links = [["Dashboard", `/projects/${projectId}/dashboard`], ["Executions", `/projects/${projectId}/executions`], ["Incidents", `/projects/${projectId}/incidents`], ["Settings", `/projects/${projectId}/settings`]];
	return <nav className="flex flex-wrap gap-2 border-b border-[#2DD4BF]/10 px-6 py-3 text-sm">{links.map(([label, href]) => <Link key={label} href={href} className="hero-hover rounded-lg px-3 py-2 text-[#8FA39E] hover:bg-[#2DD4BF]/10 hover:text-[#EAF6F3]">{label}</Link>)}</nav>;
}