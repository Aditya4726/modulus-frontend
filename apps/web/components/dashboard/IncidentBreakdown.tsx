"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
/** Renders the incident status donut and count legend. */
export function IncidentBreakdown({ incidents }: { incidents: { open: number; acknowledged: number; resolved: number } }) {
	const data = [
		{ name: "Open", value: incidents.open, color: "#f43f5e" },
		{ name: "Acknowledged", value: incidents.acknowledged, color: "#f59e0b" },
		{ name: "Resolved", value: incidents.resolved, color: "#14b8a6" },
	];
	return <section className="rounded-xl border border-teal-100 bg-white p-6"><h2 className="font-semibold">Incident breakdown</h2><div className="mt-3 grid grid-cols-[1fr_1fr] items-center gap-4"><div className="h-48"><ResponsiveContainer><PieChart><Pie data={data} dataKey="value" nameKey="name" innerRadius="60%" outerRadius="88%" paddingAngle={3} animationDuration={900}>{data.map((item) => <Cell key={item.name} fill={item.color} />)}</Pie></PieChart></ResponsiveContainer></div><div className="space-y-3 text-sm">{data.map((item) => <div key={item.name} className="flex items-center justify-between gap-4"><span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />{item.name}</span><strong>{item.value}</strong></div>)}</div></div></section>;
}