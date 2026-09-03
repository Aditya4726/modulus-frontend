"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Radar, ArrowRight, Play, Pause } from "lucide-react";

const DEMO_STEPS = [
	{ text: "Failure detected", detail: "checkout-agent · latency spike", color: "#e2445c" },
	{ text: "Analyzing traces", detail: "span=agent.execute run=8f2a1c3d", color: "#579bfc" },
	{ text: "Root cause found", detail: "null ref in tool_call: payments.charge", color: "#a25ddc" },
	{ text: "Reproducing failure", detail: "sandbox=docker · isolated", color: "#a25ddc" },
	{ text: "Generating fix + tests", detail: "confidence=0.94", color: "#fdab3d" },
	{ text: "Opening pull request", detail: "github.com/acme/checkout-agent", color: "#00c875" },
	{ text: "Awaiting human approval", detail: "assigned to @dana", color: "#00c875" },
];

const PIPELINE = ["Detect", "Diagnose", "Reproduce", "Fix", "Verify", "PR", "Human Approval"];

export function Hero() {
	const [demoIndex, setDemoIndex] = useState(-1);
	const [isRunning, setIsRunning] = useState(true);
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const status = !isRunning ? "idle" : demoIndex >= DEMO_STEPS.length - 1 ? "done" : "running";

	useEffect(() => {
		if (!isRunning) return;
		let cancelled = false;

		function tick(i: number) {
			if (cancelled) return;
			setDemoIndex(i);
			if (i < DEMO_STEPS.length - 1) {
				timerRef.current = setTimeout(() => tick(i + 1), 700);
			} else {
				timerRef.current = setTimeout(() => {
					if (!cancelled) tick(0);
				}, 2000);
			}
		}
		tick(0);

		return () => {
			cancelled = true;
			if (timerRef.current) clearTimeout(timerRef.current);
		};
	}, [isRunning]);

	return (
		<section className="relative overflow-hidden bg-white pt-16 pb-24">
			<div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">
				{/* Copy */}
				<div>
					<p className="text-sm font-semibold text-blue-600 mb-3">
						Agent reliability engineering
					</p>
					<h1 className="text-[2.9rem] sm:text-[4.25rem] leading-[0.98] font-black tracking-[-0.04em] text-slate-950 max-w-xl">
						Your AI engineer&apos;s best friend.
					</h1>
					<p className="text-slate-500 text-lg mt-5 max-w-lg leading-relaxed">
						Modulus watches every agent execution, catches failures the moment
						they happen, and walks the whole way to a reviewed pull request —
						automatically.
					</p>

					<div className="flex flex-wrap items-center gap-3 mt-8">
						<Link
							href="/register"
							className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-5 py-3 rounded-md transition"
						>
							Start free
							<ArrowRight className="w-4 h-4" />
						</Link>
						<a
							href="#how-it-works"
							className="flex items-center gap-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-sm px-5 py-3 rounded-lg transition"
						>
							See how it works
						</a>
					</div>

					<div className="flex flex-wrap items-center gap-x-1.5 gap-y-2 mt-9 text-xs font-semibold text-slate-400">
						{PIPELINE.map((step, i) => (
							<span key={step} className="flex items-center gap-1.5">
								<span className={i === 0 ? "text-slate-600" : ""}>{step}</span>
								{i < PIPELINE.length - 1 && <span>→</span>}
							</span>
						))}
					</div>
				</div>

				{/* Monitor demo */}
				<div className="rounded-xl border border-slate-200 shadow-[0_20px_60px_rgba(15,23,42,0.08)] overflow-hidden bg-white">
					<div className="flex items-center justify-between px-4 py-3 bg-linear-to-r from-blue-600 to-indigo-600 border-b border-blue-700">
						<div className="flex items-center gap-2">
								<Radar className="w-3.5 h-3.5 text-white/80" strokeWidth={2.2} />
								<span className="text-xs font-semibold text-white">
								Live execution monitor
							</span>
						</div>
						<div className="flex items-center gap-1.5 text-xs font-medium">
							<span
								className={[
									"w-1.5 h-1.5 rounded-full",
									status === "running"
											? "bg-white animate-pulse"
										: status === "done"
										? "bg-green-500"
										: "bg-slate-300",
								].join(" ")}
							/>
							<span
								className={
									status === "running"
											? "text-white"
										: status === "done"
										? "text-green-600"
										: "text-slate-400"
								}
							>
								{status === "running" ? "running" : status === "done" ? "resolved" : "paused"}
							</span>
						</div>
					</div>

					<div className="h-70 px-5 py-4 overflow-hidden bg-white">
						{demoIndex < 0 ? (
							<div className="h-full flex items-center justify-center text-slate-400 text-sm">
								Paused — press start to resume
							</div>
						) : (
							<div className="flex flex-col gap-3">
								{DEMO_STEPS.slice(0, demoIndex + 1).map((step) => (
									<div key={step.text} className="demo-row flex items-start gap-3">
										<span
											className="w-2 h-2 rounded-full shrink-0 mt-1.5"
											style={{ background: step.color }}
										/>
										<div>
											<p className="text-sm font-semibold text-slate-800">{step.text}</p>
											<p className="text-xs text-slate-400 font-mono">{step.detail}</p>
										</div>
									</div>
								))}
							</div>
						)}
					</div>

					<div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-t border-slate-200">
						<div className="flex items-center gap-2">
							<button
								onClick={() => setIsRunning(true)}
								disabled={isRunning}
									className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-semibold pl-2.5 pr-3 py-1.5 rounded-md transition"
							>
								<Play className="w-3 h-3" fill="white" />
								Start
							</button>
							<button
								onClick={() => {
									setIsRunning(false);
									if (timerRef.current) clearTimeout(timerRef.current);
									setDemoIndex(-1);
								}}
								disabled={!isRunning}
								className="flex items-center gap-1.5 border border-slate-300 hover:bg-slate-100 disabled:opacity-50 text-slate-600 text-xs font-semibold pl-2.5 pr-3 py-1.5 rounded-lg transition"
							>
								<Pause className="w-3 h-3" fill="currentColor" />
								Stop
							</button>
						</div>
						{status === "done" && (
							<span className="text-xs font-semibold text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
								✓ PR merged
							</span>
						)}
					</div>
				</div>
			</div>

			<style jsx>{`
				.demo-row {
					animation: rowIn 0.35s ease-out;
				}
				@keyframes rowIn {
					from {
						opacity: 0;
						transform: translateY(6px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}
			`}</style>
		</section>
	);
}