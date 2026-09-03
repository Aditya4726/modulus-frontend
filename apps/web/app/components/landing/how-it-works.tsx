"use client";

import { useEffect, useState } from "react";
import {
	AlertCircle,
	Search,
	RotateCcw,
	Wrench,
	ShieldCheck,
	GitPullRequest,
	UserCheck,
	type LucideIcon,
} from "lucide-react";

const STEPS: { label: string; sub: string; icon: LucideIcon }[] = [
	{ label: "Detect", sub: "Alert fires from your monitors", icon: AlertCircle },
	{ label: "Diagnose", sub: "Trace the failure to its source", icon: Search },
	{ label: "Reproduce", sub: "Recreate it in a safe sandbox", icon: RotateCcw },
	{ label: "Fix", sub: "Draft a candidate patch", icon: Wrench },
	{ label: "Verify", sub: "Run the full test suite", icon: ShieldCheck },
	{ label: "PR", sub: "Push the fix for review", icon: GitPullRequest },
	{ label: "Human approval", sub: "A teammate signs off", icon: UserCheck },
];

export function HowItWorks() {
	const [active, setActive] = useState(0);

	useEffect(() => {
		const iv = setInterval(() => setActive((a) => (a + 1) % STEPS.length), 1500);
		return () => clearInterval(iv);
	}, []);

	return (
		<section id="how-it-works" className="bg-white py-24">
			<div className="max-w-7xl mx-auto px-6">
				<div className="max-w-xl mb-16">
					<p className="text-sm font-semibold text-blue-600 mb-2">How it works</p>
					<h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
						From incident to fix, automatically.
					</h2>
					<p className="text-slate-500 text-base mt-3">
						A single run through this pipeline, end to end.
					</p>
				</div>

				<div className="hidden lg:grid grid-cols-7 gap-3">
					{STEPS.map((step, i) => {
						const Icon = step.icon;
						const isDone = i < active;
						const isActive = i === active;
						return (
							<div key={step.label} className="flex flex-col items-center text-center">
								<div className="flex items-center w-full">
									<div
										className={[
											"flex-1 h-0.5",
											i === 0 ? "opacity-0" : isDone || isActive ? "bg-blue-600" : "bg-slate-200",
										].join(" ")}
									/>
									<div
										className={[
											"w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-2 transition-all duration-300",
											isDone
												? "bg-[#00c875] border-[#00c875]"
												: isActive
												? "bg-blue-600 border-blue-600 scale-110 shadow-[0_0_0_6px_rgba(37,99,235,0.12)]"
												: "bg-white border-slate-200",
										].join(" ")}
									>
										<Icon
											className={`w-5 h-5 ${isDone || isActive ? "text-white" : "text-slate-400"}`}
											strokeWidth={2.25}
										/>
									</div>
									<div
										className={[
											"flex-1 h-0.5",
											i === STEPS.length - 1 ? "opacity-0" : isDone ? "bg-[#00c875]" : "bg-slate-200",
										].join(" ")}
									/>
								</div>
								<p
									className={[
										"text-sm font-bold mt-3 transition-colors",
										isActive ? "text-blue-600" : isDone ? "text-slate-700" : "text-slate-400",
									].join(" ")}
								>
									{step.label}
								</p>
								<p className="text-xs text-slate-400 mt-1 leading-snug">{step.sub}</p>
							</div>
						);
					})}
				</div>

				{/* Mobile: vertical list */}
				<div className="flex lg:hidden flex-col gap-5">
					{STEPS.map((step, i) => {
						const Icon = step.icon;
						const isDone = i < active;
						const isActive = i === active;
						return (
							<div key={step.label} className="flex items-center gap-4">
								<div
									className={[
										"w-11 h-11 rounded-full flex items-center justify-center shrink-0 border-2 transition-all duration-300",
										isDone
											? "bg-[#00c875] border-[#00c875]"
											: isActive
											? "bg-blue-600 border-blue-600 scale-110"
											: "bg-white border-slate-200",
									].join(" ")}
								>
									<Icon
										className={`w-4.5 h-4.5 ${isDone || isActive ? "text-white" : "text-slate-400"}`}
										strokeWidth={2.25}
									/>
								</div>
								<div>
									<p
										className={[
											"text-sm font-bold",
											isActive ? "text-blue-600" : isDone ? "text-slate-700" : "text-slate-400",
										].join(" ")}
									>
										{step.label}
									</p>
									<p className="text-xs text-slate-400">{step.sub}</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}