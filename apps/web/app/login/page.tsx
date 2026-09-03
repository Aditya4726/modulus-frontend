"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus_Jakarta_Sans } from "next/font/google";
import {
	Radar,
	BarChart3,
	Wrench,
	Lock,
	Package,
	Zap,
	Database,
	KeyRound,
	Users,
	Radio,
	Puzzle,
	Rocket,
	Globe,
	Play,
	Pause,
	type LucideIcon,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

/* Backend integration: better-auth signIn.email handles email/password login;
 * signIn.social handles Google/GitHub with callbackURL /projects. When the API
 * requires a second factor, return auth state that allows /two-factor routing.
 */

const jakarta = Plus_Jakarta_Sans({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700", "800"],
	variable: "--font-jakarta",
});

const PALETTE = ["#e2445c", "#fdab3d", "#00c875", "#579bfc", "#a25ddc", "#00c9c9"];

const FEATURES: { label: string; icon: LucideIcon }[] = [
	{ label: "Agent execution observability", icon: Radar },
	{ label: "Execution & trace tracking", icon: BarChart3 },
	{ label: "Tool-call monitoring", icon: Wrench },
	{ label: "Sensitive-data redaction", icon: Lock },
	{ label: "OpenTelemetry-inspired ingestion", icon: Package },
	{ label: "Async ingestion via BullMQ", icon: Zap },
	{ label: "PostgreSQL + Prisma", icon: Database },
	{ label: "API-key & session auth", icon: KeyRound },
	{ label: "Org & role-based access", icon: Users },
	{ label: "TypeScript SDK", icon: Radio },
	{ label: "Modular monorepo", icon: Puzzle },
	{ label: "Turborepo builds", icon: Rocket },
	{ label: "Full-stack dashboard", icon: Globe },
];

const DEMO_STEPS = [
	{ text: "Agent started", detail: "run=8f2a1c3d", color: "#579bfc" },
	{ text: "Tool call: web_search", detail: 'query="pricing tiers"', color: "#a25ddc" },
	{ text: "Tool call: fetch_url", detail: "docs.modulus.dev", color: "#a25ddc" },
	{ text: "Redacting sensitive fields", detail: "field=user.email", color: "#fdab3d" },
	{ text: "LLM completion", detail: "model=sonnet-4.6", color: "#00c875" },
	{ text: "Trace saved", detail: "duration=1.42s", color: "#00c875" },
];

function splitRows<T>(arr: T[], rows: number) {
	const out: T[][] = Array.from({ length: rows }, () => []);
	arr.forEach((item, i) => out[i % rows].push(item));
	return out;
}

function Logo({ className }: { className?: string }) {
	return (
		<span className={`rounded-lg bg-blue-600 flex items-center justify-center shrink-0 ${className ?? "w-8 h-8"}`}>
			<Radar className="w-4 h-4 text-white" strokeWidth={2.4} />
		</span>
	);
}

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [demoIndex, setDemoIndex] = useState(-1);
	const [isRunning, setIsRunning] = useState(true);
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const router = useRouter();

	const status = !isRunning ? "idle" : demoIndex >= DEMO_STEPS.length - 1 ? "done" : "running";

	// Auto-plays on mount and loops forever until stopped.
	useEffect(() => {
		if (!isRunning) return;
		let cancelled = false;

		function tick(i: number) {
			if (cancelled) return;
			setDemoIndex(i);
			if (i < DEMO_STEPS.length - 1) {
				timerRef.current = setTimeout(() => tick(i + 1), 650);
			} else {
				timerRef.current = setTimeout(() => {
					if (!cancelled) tick(0);
				}, 1600);
			}
		}
		tick(0);

		return () => {
			cancelled = true;
			if (timerRef.current) clearTimeout(timerRef.current);
		};
	}, [isRunning]);

	function stopDemo() {
		setIsRunning(false);
		if (timerRef.current) clearTimeout(timerRef.current);
		setDemoIndex(-1);
	}

	function startDemo() {
		setIsRunning(true);
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setError(null);
		setLoading(true);
		await authClient.signIn.email(
			{ email, password },
			{
				onSuccess: () => {
					router.push("/two-factor");
				},
				onError: (ctx) => {
					setError(ctx.error.message);
					setLoading(false);
				},
			},
		);
	}

	const featureRows = splitRows(FEATURES, 2);

	return (
		<div className={`${jakarta.variable} h-screen w-full overflow-hidden bg-white flex flex-col font-(family-name:--font-jakarta)`}>
			{/* Header */}
			<div className="flex items-center px-8 py-4 shrink-0">
				<div className="flex items-center gap-2.5">
					<Logo />
					<span className="text-lg font-extrabold text-slate-900 tracking-tight">
						Modulus
					</span>
				</div>
			</div>

			{/* Body */}
			<div className="flex-1 min-h-0 flex px-8 pb-6 gap-8">
				{/* Left: demo + features */}
				<div className="hidden lg:flex lg:w-[58%] flex-col min-h-0">
					<p className="text-sm font-semibold text-blue-600 mb-1.5">
						Agent reliability engineering
					</p>
					<h1 className="text-[1.9rem] leading-[1.15] font-extrabold text-slate-900">
						Your AI engineer&apos;s best friend.
					</h1>
					<p className="text-slate-500 text-sm mt-2 mb-5">
						Modulus watches your agents, catches failures, and helps you fix them
						fast — automatically.
					</p>

					{/* Monitor card */}
					<div className="rounded-lg border border-slate-200 shadow-[0_8px_30px_rgba(0,0,0,0.06)] overflow-hidden shrink-0">
						<div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-200">
							<div className="flex items-center gap-2">
								<Radar className="w-3.5 h-3.5 text-slate-400" strokeWidth={2.2} />
								<span className="text-xs font-semibold text-slate-600">
									Live execution monitor
								</span>
							</div>
							<div className="flex items-center gap-1.5 text-xs font-medium">
								<span
									className={[
										"w-1.5 h-1.5 rounded-full",
										status === "running"
											? "bg-blue-500 animate-pulse"
											: status === "done"
											? "bg-green-500"
											: "bg-slate-300",
									].join(" ")}
								/>
								<span
									className={
										status === "running"
											? "text-blue-600"
											: status === "done"
											? "text-green-600"
											: "text-slate-400"
									}
								>
									{status === "running" ? "running" : status === "done" ? "complete" : "paused"}
								</span>
							</div>
						</div>

						<div className="h-42 px-4 py-3 overflow-hidden bg-white">
							{demoIndex < 0 ? (
								<div className="h-full flex items-center justify-center text-slate-400 text-sm">
									Paused — press start to resume
								</div>
							) : (
								<div className="flex flex-col gap-2.5">
									{DEMO_STEPS.slice(0, demoIndex + 1).map((step) => (
										<div key={step.text} className="demo-row flex items-center gap-2.5">
											<span
												className="w-1.5 h-1.5 rounded-full shrink-0"
												style={{ background: step.color }}
											/>
											<span className="text-xs font-semibold text-slate-700 shrink-0">
												{step.text}
											</span>
											<span className="text-xs text-slate-400 font-mono truncate">
												{step.detail}
											</span>
										</div>
									))}
								</div>
							)}
						</div>

						<div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-t border-slate-200">
							<div className="flex items-center gap-2">
								<button
									onClick={startDemo}
									disabled={isRunning}
									className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-semibold pl-2.5 pr-3 py-1.5 rounded-md transition"
								>
									<Play className="w-3 h-3" fill="white" />
									Start
								</button>
								<button
									onClick={stopDemo}
									disabled={!isRunning}
									className="flex items-center gap-1.5 border border-slate-300 hover:bg-slate-100 disabled:opacity-50 text-slate-600 text-xs font-semibold pl-2.5 pr-3 py-1.5 rounded-lg transition"
								>
									<Pause className="w-3 h-3" fill="currentColor" />
									Stop
								</button>
							</div>
							{status === "done" && (
								<span className="text-xs font-semibold text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
									✓ Trace saved · 1.42s
								</span>
							)}
						</div>
					</div>

					{/* Feature marquee */}
					<div className="mt-5 flex-1 min-h-0 flex flex-col justify-center gap-2.5 overflow-hidden">
						{featureRows.map((row, r) => (
							<div key={r} className="marquee-track-wrap">
								<div className={`marquee-track flex gap-2.5 ${r === 1 ? "reverse" : ""}`}>
									{[...row, ...row].map((f, i) => {
										const Icon = f.icon;
										const color = PALETTE[(r * 7 + i) % PALETTE.length];
										return (
											<span
												key={`${f.label}-${i}`}
												className="flex items-center gap-2 rounded-full border border-slate-200 bg-white pl-1.5 pr-3.5 py-1.5 shrink-0 shadow-sm"
											>
												<span
													className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
													style={{ background: `${color}1A` }}
												>
													<Icon className="w-3.5 h-3.5" style={{ color }} strokeWidth={2.25} />
												</span>
												<span className="text-xs font-semibold text-slate-700 whitespace-nowrap">
													{f.label}
												</span>
											</span>
										);
									})}
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Right: login form */}
				<div className="flex-1 flex items-center justify-center min-h-0">
					<div className="w-full max-w-sm">
						<div className="flex lg:hidden items-center gap-2.5 mb-6 justify-center">
							<Logo />
							<span className="text-lg font-extrabold text-slate-900">Modulus</span>
						</div>

						<div className="rounded-xl border border-slate-200 shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-7">
							<h2 className="text-xl font-extrabold text-slate-900 mb-1">Log in</h2>
							<p className="text-slate-500 text-sm mb-5">
								Welcome back to your dashboard.
							</p>

							<form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
								<div>
									<label className="block text-xs font-semibold text-slate-600 mb-1.5">
										Email
									</label>
									<input
										className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
										type="email"
										placeholder="you@company.com"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										required
									/>
								</div>
								<div>
									<div className="flex items-center justify-between mb-1.5">
										<label className="text-xs font-semibold text-slate-600">
											Password
										</label>
										<a href="/two-factor" className="text-xs font-semibold text-blue-600 hover:text-blue-700">
											Forgot password?
										</a>
									</div>
									<input
										className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
										type="password"
										placeholder="••••••••"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										required
									/>
								</div>

								{error && (
									<p className="text-[#e2445c] text-sm bg-[#e2445c]/5 rounded-lg px-3 py-2">
										{error}
									</p>
								)}

								<button
									className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-md text-sm transition disabled:opacity-60"
									type="submit"
									disabled={loading}
								>
									{loading ? "Logging in..." : "Log in"}
								</button>
							</form>

							<div className="flex items-center gap-3 my-5">
								<div className="h-px bg-slate-200 flex-1" />
								<span className="text-xs text-slate-400 font-medium">or</span>
								<div className="h-px bg-slate-200 flex-1" />
							</div>

							<div className="flex flex-col gap-2">
								<button
									onClick={() =>
										authClient.signIn.social({ provider: "google", callbackURL: "/projects" })
									}
									className="border border-slate-300 rounded-lg py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition flex items-center justify-center gap-2"
								>
									<svg className="w-4 h-4" viewBox="0 0 24 24">
										<path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
										<path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
										<path fill="#FBBC05" d="M5.84 14.09A6.94 6.94 0 015.5 12c0-.73.13-1.43.34-2.09V7.07H2.18A10.94 10.94 0 001 12c0 1.77.42 3.44 1.18 4.93l3.66-2.84z"/>
										<path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
									</svg>
									Continue with Google
								</button>
								<button
									onClick={() =>
										authClient.signIn.social({ provider: "github", callbackURL: "/projects" })
									}
									className="border border-slate-300 rounded-lg py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition flex items-center justify-center gap-2"
								>
									<svg className="w-4 h-4" fill="#0f172a" viewBox="0 0 24 24">
										<path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.04-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 013.01-.4c1.02 0 2.05.14 3.01.4 2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22 0 1.6-.02 2.89-.02 3.29 0 .32.22.7.83.58C20.56 21.79 24 17.29 24 12c0-6.63-5.37-12-12-12z"/>
									</svg>
									Continue with GitHub
								</button>
							</div>
						</div>

						<p className="text-center text-sm text-slate-500 mt-4">
							Don&apos;t have an account?{" "}
							<a href="/register" className="text-blue-600 font-semibold hover:text-blue-700">
								Sign up
							</a>
						</p>
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
				.marquee-track-wrap {
					overflow: hidden;
				}
				.marquee-track {
					width: max-content;
					animation: scrollLeft 22s linear infinite;
				}
				.marquee-track.reverse {
					animation-direction: reverse;
				}
				@keyframes scrollLeft {
					from {
						transform: translateX(0);
					}
					to {
						transform: translateX(-50%);
					}
				}
			`}</style>
		</div>
	);
}