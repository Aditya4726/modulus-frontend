/** Renders the shared dashboard-shaped loading skeleton. */
export function LoadingSkeleton() {
	return <main className="hero-shell grid min-h-screen place-items-center p-6 sm:p-10"><div className="text-center"><span className="inline-block h-10 w-10 animate-spin rounded-full border-2 border-[#2DD4BF]/20 border-t-[#2DD4BF]" aria-label="Loading" /><p className="mt-4 text-sm text-[#8FA39E]">Loading dashboard data...</p></div></main>;
}