"use client";

import { RadialBar, RadialBarChart, ResponsiveContainer } from "recharts";
/** Renders the animated success-rate radial gauge. */
export function SuccessRateGauge({ rate }: { rate: number | null }) {
	if (rate === null) {
		return <section className="rounded-xl border border-teal-100 bg-white p-6"><h2 className="font-semibold">Success rate</h2><p className="mt-12 text-center text-sm text-slate-500">No data yet</p></section>;
	}

	const color = rate >= 0.95 ? "#14b8a6" : rate >= 0.8 ? "#f59e0b" : "#f43f5e";
	const chartData = [{ value: rate * 100 }];
	return <section className="rounded-xl border border-teal-100 bg-white p-6"><h2 className="font-semibold">Success rate</h2><div className="relative mt-2 h-48"><ResponsiveContainer><RadialBarChart innerRadius="70%" outerRadius="100%" startAngle={90} endAngle={-270} data={chartData}><RadialBar dataKey="value" cornerRadius={8} fill={color} animationDuration={1100} background={{ fill: "#e8f4f1" }} /></RadialBarChart></ResponsiveContainer><strong className="absolute inset-0 grid place-items-center text-3xl">{(rate * 100).toFixed(1)}%</strong></div><p className="text-center text-sm text-slate-500">Successful executions</p></section>;
}