"use client";

import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { useDashboardMetrics } from "../../hooks/useDashboardMetrics";
import { usePolling } from "../../hooks/usePolling";
import { ErrorState } from "../shared/ErrorState";
import { LoadingSkeleton } from "../shared/LoadingSkeleton";
import { StatCard } from "./StatCard";
import { DashboardHeader } from "../layout/DashboardHeader";
import { Sidebar } from "../layout/Sidebar";
import { ReliabilityChart } from "./ReliabilityChart";
import { ActiveIncidentsList } from "./ActiveIncidentsList";
import { AgentHealthList } from "./AgentHealthList";
import { FailuresDonut } from "./FailuresDonut";
import { RecentActivityFeed } from "./RecentActivityFeed";

export function DashboardView({ projectId }: { projectId: string }) {
	const { metrics, loading, refreshing, error, refetch } = useDashboardMetrics(projectId);

	usePolling(refetch, 30, Boolean(metrics));
	if (loading && !metrics) return <LoadingSkeleton />;
	if (error && !metrics) return <ErrorState message={error.message} onRetry={() => void refetch()} />;
	if (!metrics) return <ErrorState message="No dashboard data is available." onRetry={() => void refetch()} />;
	const statCards = [
		{ key: "execution-volume", label: "Execution Volume", value: metrics.executionVolume, detail: `${metrics.windowDays} day window` },
		{ key: "success-rate", label: "Success Rate", value: metrics.successRate === null ? "—" : `${(metrics.successRate * 100).toFixed(1)}%`, detail: "Backend aggregate" },
		{ key: "active-incidents", label: "Active Incidents", value: metrics.incidents.open + metrics.incidents.acknowledged, detail: `${metrics.incidents.resolved} resolved` },
		{ key: "pull-requests", label: "Pull Requests", value: metrics.pullRequests.total, detail: `${metrics.pullRequests.merged} merged` },
		{ key: "time-saved", label: "Estimated Time Saved", value: `${metrics.estimatedTimeSavedMinutes}m`, detail: "Based on merged fixes" },
		{ key: "mttr", label: "MTTR", value: "—", detail: "Not returned by backend" },
		{ key: "agents", label: "Agents Healthy", value: "—", detail: "Not returned by backend" },
	];
	return <main className="min-h-screen bg-[#0a0a0f] text-slate-300"><div className="flex min-h-screen"><Sidebar /><div className="min-w-0 flex-1"><DashboardHeader /><div className="p-5 lg:p-8"><div className="mb-6 flex justify-end gap-3"><select className="rounded-lg border border-white/10 bg-[#13131d] px-3 py-2 text-xs text-slate-300"><option>Backend window</option><option>Last 30 days</option></select><button type="button" onClick={() => void refetch()} className="rounded-lg bg-teal-300 px-4 py-2 text-sm font-medium text-[#031010] hover:bg-teal-200"><RefreshCw className={`mr-2 inline h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />Refresh data</button></div><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{statCards.map((card, index) => <motion.div key={card.key} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .06 }}><StatCard label={card.label} value={card.value} detail={card.detail} tone="dark" /></motion.div>)}</div><div className="mt-5 grid gap-5 xl:grid-cols-[1.65fr_1fr]"><ReliabilityChart trend={metrics.reliabilityTrend} summary={{ uptime: metrics.successRate === null ? "—" : `${(metrics.successRate * 100).toFixed(1)}%`, downtime: "—", incidents: "—", resolutions: "—" }} /><ActiveIncidentsList incidents={metrics.activeIncidents} /></div><div className="mt-5 grid gap-5 xl:grid-cols-3"><AgentHealthList agents={metrics.agents} /><FailuresDonut categories={metrics.failureCategories} /><RecentActivityFeed activity={metrics.activity} /></div></div></div></div></main>;
}
