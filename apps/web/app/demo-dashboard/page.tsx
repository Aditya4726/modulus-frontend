"use client";

import { motion } from "framer-motion";
import { DashboardHeader } from "../../components/layout/DashboardHeader";
import { Sidebar } from "../../components/layout/Sidebar";
import { AgentHealthList } from "../../components/dashboard/AgentHealthList";
import { ActiveIncidentsList } from "../../components/dashboard/ActiveIncidentsList";
import { FailuresDonut } from "../../components/dashboard/FailuresDonut";
import { RecentActivityFeed } from "../../components/dashboard/RecentActivityFeed";
import { ReliabilityChart } from "../../components/dashboard/ReliabilityChart";
import { StatCard } from "../../components/dashboard/StatCard";

const demoStats = [
	{ key: "reliability", label: "Reliability Score", value: "99.92%", detail: "0.48% vs last 7 days" },
	{ key: "incidents", label: "Active Incidents", value: "12", detail: "3 vs last 7 days" },
	{ key: "mttr", label: "MTTR", value: "18m 42s", detail: "12% vs last 7 days" },
	{ key: "resolutions", label: "Automated Resolutions", value: "94.2%", detail: "6.3% vs last 7 days" },
	{ key: "agents", label: "Agents Healthy", value: "24 / 28", detail: "2 vs last 7 days" },
	{ key: "deployments", label: "Deployments", value: "19", detail: "4 vs last 7 days" },
];

const demoReliability = [
	{ date: "May 12", value: 99.3 },
	{ date: "May 13", value: 99.7 },
	{ date: "May 14", value: 99.5 },
	{ date: "May 15", value: 99.9 },
	{ date: "May 16", value: 99.8 },
	{ date: "May 17", value: 99.95 },
	{ date: "May 18", value: 99.92 },
];

const demoIncidents = [
	{ title: "Payment API Timeout", subtitle: "Payment Agent - Production", severity: "critical" as const, time: "2m ago", status: "Investigating" },
	{ title: "Tool Execution Failure", subtitle: "Customer Support Agent - Production", severity: "warning" as const, time: "18m ago", status: "Monitoring" },
	{ title: "High Latency Detected", subtitle: "Research Agent - Staging", severity: "warning" as const, time: "42m ago", status: "Monitoring" },
	{ title: "Vector DB Connection Issue", subtitle: "Data Agent - Production", severity: "resolved" as const, time: "1h ago", status: "Resolved" },
];

const demoAgents = [
	{ name: "Customer Support Agent", framework: "LangChain", status: "healthy" as const, percentage: 99.1 },
	{ name: "Payment Agent", framework: "CrewAI", status: "healthy" as const, percentage: 98.7 },
	{ name: "Research Agent", framework: "AutoGen", status: "degraded" as const, percentage: 92.3 },
	{ name: "Data Agent", framework: "LlamaIndex", status: "unhealthy" as const, percentage: 78.2 },
	{ name: "Analytics Agent", framework: "Custom", status: "healthy" as const, percentage: 97.5 },
];

const demoFailures = [
	{ name: "Timeouts", percentage: 35.7, color: "#a78bfa" },
	{ name: "Tool Failures", percentage: 26.2, color: "#60a5fa" },
	{ name: "API Errors", percentage: 19, color: "#fb923c" },
	{ name: "Validation Errors", percentage: 9.5, color: "#fb7185" },
	{ name: "Others", percentage: 9.5, color: "#64748b" },
];

const demoActivity = [
	{ type: "fix", text: "AI fix generated for Payment API Timeout", time: "4m ago" },
	{ type: "pr", text: "Pull request #128 created", time: "12m ago" },
	{ type: "check", text: "Tool Execution Failure auto-resolved", time: "28m ago" },
	{ type: "deploy", text: "Agent Platform deployed to production", time: "1h ago" },
	{ type: "user", text: "Aditya assigned Research Agent", time: "2h ago" },
];

/** Renders a backend-independent dashboard preview for demonstrations. */
export default function DemoDashboardPage() {
	return <main className="min-h-screen bg-[#0a0a0f] text-slate-300"><div className="flex min-h-screen"><Sidebar /><div className="min-w-0 flex-1"><DashboardHeader /><div className="p-5 lg:p-8"><div className="mb-6 flex items-center justify-between"><div><p className="font-mono text-xs uppercase tracking-[0.18em] text-violet-300">Demo dashboard</p><p className="mt-2 text-sm text-slate-500">This preview shows how the real project dashboard will work.</p></div><span className="rounded-full border border-violet-400/30 bg-violet-400/10 px-3 py-1 text-xs text-violet-200">Demo preview</span></div><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{demoStats.map((card, index) => <motion.div key={card.key} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .06 }}><StatCard label={card.label} value={card.value} detail={card.detail} tone="dark" /></motion.div>)}</div><div className="mt-5 grid gap-5 xl:grid-cols-[1.65fr_1fr]"><ReliabilityChart trend={demoReliability} summary={{ uptime: "99.92%", downtime: "1h 12m", incidents: "42", resolutions: "39" }} /><ActiveIncidentsList incidents={demoIncidents} /></div><div className="mt-5 grid gap-5 xl:grid-cols-3"><AgentHealthList agents={demoAgents} /><FailuresDonut categories={demoFailures} /><RecentActivityFeed activity={demoActivity} /></div></div></div></div></main>;
}