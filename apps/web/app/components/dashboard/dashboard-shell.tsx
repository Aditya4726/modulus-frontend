import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

export function DashboardShell({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen bg-slate-50">
			<Sidebar />
			<Topbar />
			<main className="ml-62.5 pt-17">
				<div className="p-7">{children}</div>
			</main>
		</div>
	);
}
