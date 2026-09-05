"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useRouter } from "next/navigation";
import {
	AlertCircle,
	ArrowRight,
	GitPullRequest,
	Lock,
	RotateCcw,
	Search,
	ShieldCheck,
	Wrench,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

type GlowStyle = CSSProperties & Record<`--${string}`, string | number | undefined>;

function Logo() {
	return (
		<span className="inline-flex items-center gap-2.5">
			<span className="logo-mark relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-teal-300/55 bg-black">
				<span className="radar absolute inset-[-35%] bg-[conic-gradient(from_0deg,rgba(45,212,191,.72),transparent_28%,transparent)]" />
				<span className="ping absolute h-3 w-3 rounded-full bg-teal-300/50" />
				<span className="relative h-1.5 w-1.5 rounded-full bg-teal-200 shadow-[0_0_12px_#67e8f9]" />
			</span>
			<span className="text-lg font-semibold tracking-[0] text-slate-50">Modulus</span>
		</span>
	);
}

// ---- Pipeline flow demo ----------------------------------------------------

const STAGES = [
	{ key: "detect", label: "Detect", icon: AlertCircle, at: 0.02 },
	{ key: "diagnose", label: "Diagnose", icon: Search, at: 0.22 },
	{ key: "reproduce", label: "Reproduce", icon: RotateCcw, at: 0.42 },
	{ key: "fix", label: "Fix", icon: Wrench, at: 0.62 },
	{ key: "verify", label: "Verify", icon: ShieldCheck, at: 0.82 },
	{ key: "pr", label: "PR opened", icon: GitPullRequest, at: 0.98 },
];

const LOG_LINES = [
	"detecting anomaly in checkout-agent...",
	"root cause: null ref in payments.charge",
	"reproducing in sandbox... confirmed",
	"generating patch (confidence 94%)",
	"running verification suite... 42/42 passed",
	"opening pull request #211",
];

const PATH_D = "M 10 60 C 90 10, 170 110, 250 60 S 410 10, 490 60";

function useTypewriterLog(activeIndex: number) {
	const [displayed, setDisplayed] = useState<string[]>([]);
	const lastIndex = useRef(-1);

	useEffect(() => {
		if (activeIndex === lastIndex.current) return;
		lastIndex.current = activeIndex;
		const fullLine = LOG_LINES[activeIndex];
		if (!fullLine) return;

		let i = 0;
		setDisplayed((prev) => [...prev, ""]);
		const interval = setInterval(() => {
			i += 1;
			setDisplayed((prev) => {
				const next = [...prev];
				next[next.length - 1] = fullLine.slice(0, i);
				return next;
			});
			if (i >= fullLine.length) clearInterval(interval);
		}, 22);

		return () => clearInterval(interval);
	}, [activeIndex]);

	return displayed;
}

function useCountUp(target: number, durationMs: number, restartKey: number) {
	const [value, setValue] = useState(0);

	useEffect(() => {
		let raf: number;
		const start = performance.now();
		function tick(now: number) {
			const progress = Math.min(1, (now - start) / durationMs);
			setValue(Math.round(target * (1 - Math.pow(1 - progress, 3))));
			if (progress < 1) raf = requestAnimationFrame(tick);
		}
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, [target, durationMs, restartKey]);

	return value;
}

function PipelineFlowDemo() {
	const pathRef = useRef<SVGPathElement>(null);
	const [progress, setProgress] = useState(0);
	const [loopCount, setLoopCount] = useState(0);
	const [dotPos, setDotPos] = useState({ x: 10, y: 60 });

	useEffect(() => {
		const path = pathRef.current;
		if (!path) return;
		const length = path.getTotalLength();
		const durationMs = 8000;
		let raf: number;
		let start: number | null = null;

		function tick(now: number) {
			if (start === null) start = now;
			const elapsed = (now - start) % durationMs;
			const t = elapsed / durationMs;
			if (elapsed < 16 && start !== null && now - start > durationMs) {
				setLoopCount((c) => c + 1);
			}
			setProgress(t);
			const point = path!.getPointAtLength(t * length);
			setDotPos({ x: point.x, y: point.y });
			raf = requestAnimationFrame(tick);
		}
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, []);

	const activeStageIndex = STAGES.reduce(
		(acc, stage, i) => (progress >= stage.at ? i : acc),
		0,
	);
	const logLines = useTypewriterLog(activeStageIndex);
	const traces = useCountUp(18432, 3200, loopCount);
	const fixes = useCountUp(128, 2600, loopCount);

	return (
		<div className="relative z-10 mt-10">
			{/* Path + nodes */}
			<div className="relative h-[120px] w-full">
				<svg viewBox="0 0 500 120" className="h-full w-full overflow-visible">
					<path
						ref={pathRef}
						d={PATH_D}
						fill="none"
						stroke="rgba(153,246,228,0.18)"
						strokeWidth={2}
					/>
					<path
						d={PATH_D}
						fill="none"
						stroke="url(#flowGradient)"
						strokeWidth={2}
						strokeDasharray="6 10"
						style={{ strokeDashoffset: -progress * 260 }}
					/>
					<defs>
						<linearGradient id="flowGradient" x1="0" y1="0" x2="1" y2="0">
							<stop offset="0%" stopColor="rgba(45,212,191,0.9)" />
							<stop offset="100%" stopColor="rgba(103,232,249,0.9)" />
						</linearGradient>
					</defs>
					{/* traveling glow packet */}
					<circle cx={dotPos.x} cy={dotPos.y} r={7} fill="rgba(103,232,249,0.9)">
						<animate attributeName="opacity" values="1;0.6;1" dur="1.1s" repeatCount="indefinite" />
					</circle>
					<circle cx={dotPos.x} cy={dotPos.y} r={13} fill="none" stroke="rgba(103,232,249,0.35)" strokeWidth={1.5} />
				</svg>

				<div className="pointer-events-none absolute inset-0 flex items-center justify-between px-1">
					{STAGES.map((stage, i) => {
						const Icon = stage.icon;
						const isActive = i === activeStageIndex;
						const isDone = i < activeStageIndex;
						return (
							<div key={stage.key} className="flex flex-col items-center gap-1.5">
								<span
									className={[
										"flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300",
										isActive
											? "scale-110 border-cyan-200 bg-cyan-200/15 shadow-[0_0_18px_rgba(103,232,249,0.55)]"
											: isDone
											? "border-teal-300/50 bg-teal-300/10"
											: "border-white/10 bg-black/30",
									].join(" ")}
								>
									<Icon
										className={[
											"h-4 w-4 transition-colors",
											isActive ? "text-cyan-100" : isDone ? "text-teal-200" : "text-slate-500",
										].join(" ")}
									/>
								</span>
								<span
									className={[
										"font-mono text-[10px] transition-colors",
										isActive ? "text-cyan-100" : "text-slate-500",
									].join(" ")}
								>
									{stage.label}
								</span>
							</div>
						);
					})}
				</div>
			</div>

			{/* Typewriter log */}
			<div className="mt-6 rounded-xl border border-teal-200/15 bg-black/35 p-4 font-mono text-xs text-slate-300">
				<div className="flex items-center gap-2 border-b border-white/5 pb-2 text-[10px] uppercase tracking-wide text-slate-500">
					<span className="h-1.5 w-1.5 rounded-full bg-teal-300 shadow-[0_0_8px_#2dd4bf]" />
					live trace
				</div>
				<div className="mt-2 flex flex-col gap-1 h-[92px] overflow-hidden">
					{logLines.slice(-4).map((line, i) => (
						<p key={`${line}-${i}`} className="truncate">
							<span className="text-teal-300">{">"}</span> {line}
							{i === logLines.slice(-4).length - 1 && (
								<span className="ml-0.5 inline-block h-3 w-1.5 animate-pulse bg-teal-300 align-middle" />
							)}
						</p>
					))}
				</div>
			</div>

			{/* Live counters */}
			<div className="mt-5 grid grid-cols-3 gap-3">
				<div className="rounded-xl border border-white/10 bg-black/25 p-3.5 text-center">
					<p className="text-xl font-semibold text-white">{traces.toLocaleString()}</p>
					<p className="mt-0.5 font-mono text-[10px] uppercase text-slate-500">traces analyzed</p>
				</div>
				<div className="rounded-xl border border-white/10 bg-black/25 p-3.5 text-center">
					<p className="text-xl font-semibold text-white">{fixes}</p>
					<p className="mt-0.5 font-mono text-[10px] uppercase text-slate-500">fixes verified</p>
				</div>
				<div className="rounded-xl border border-white/10 bg-black/25 p-3.5 text-center">
					<p className="text-xl font-semibold text-white">97%</p>
					<p className="mt-0.5 font-mono text-[10px] uppercase text-slate-500">safe merge rate</p>
				</div>
			</div>
		</div>
	);
}

// ---- Register page ---------------------------------------------------------

export default function RegisterPage() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [notice, setNotice] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setError(null);
		setNotice(null);
		setLoading(true);

		try {
			const { error } = await authClient.signUp.email({
				name,
				email,
				password,
				callbackURL: `${window.location.origin}/projects`,
			});

			if (error) {
				setError(error.message ?? "Registration failed");
				return;
			}

			const { data: sessionData } = await authClient.getSession();
			if (!sessionData?.user) {
				setNotice("Account created. Check your email and confirm your address to open your projects.");
				return;
			}

			router.push("/projects");
			router.refresh();
		} catch {
			setError("Something went wrong. Please try again.");
		} finally {
			setLoading(false);
		}
	}

	return (
		<main className="relative min-h-screen overflow-hidden bg-[#030607] font-['Space_Grotesk',sans-serif] text-white">
			<style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');
        @keyframes radarSweep { to { transform: rotate(360deg); } }
        @keyframes ringPing { 0% { transform: scale(.45); opacity: .95; } 100% { transform: scale(2.75); opacity: 0; } }
        @keyframes markGlow { 0%,100% { box-shadow: 0 0 10px rgba(45,212,191,.45), inset 0 0 18px rgba(45,212,191,.08); } 50% { box-shadow: 0 0 28px rgba(103,232,249,.8), inset 0 0 20px rgba(45,212,191,.2); } }
        @keyframes floatUp { 0% { transform: translateY(0); opacity: 0; } 10% { opacity: .8; } 100% { transform: translateY(-760px) translateX(18px); opacity: 0; } }
        @keyframes gridDrift { to { background-position: 64px 64px; } }
        @keyframes shine { from { transform: translateX(-130%) skewX(-18deg); } to { transform: translateX(170%) skewX(-18deg); } }
        @keyframes panelIn { from { opacity: 0; transform: translateY(18px) scale(.985); } to { opacity: 1; transform: none; } }
        @keyframes shimmer { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        .logo-mark { animation: markGlow 2.8s ease-in-out infinite; }
        .radar { animation: radarSweep 3s linear infinite; }
        .ping { animation: ringPing 2.1s ease-out infinite; }
        .bg-grid { animation: gridDrift 18s linear infinite; }
        .particle { animation: floatUp var(--duration) ease-in infinite; animation-delay: var(--delay); }
        .panel-in { animation: panelIn .72s cubic-bezier(.2,.8,.2,1) both; }
        .gradient-text { background: linear-gradient(90deg,#fff,#99f6e4,#67e8f9,#fff); background-size: 220% 100%; -webkit-background-clip: text; background-clip: text; color: transparent; animation: shimmer 6s ease-in-out infinite; }
        .shine-button::before { content: ""; position: absolute; inset: -20% auto -20% -35%; width: 38%; background: linear-gradient(90deg,transparent,rgba(255,255,255,.65),transparent); animation: shine 2.7s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; } }
      `}</style>

			<div
				className="bg-grid pointer-events-none fixed inset-0 opacity-[0.045]"
				style={{
					backgroundImage:
						"linear-gradient(rgba(45,212,191,.75) 1px, transparent 1px), linear-gradient(90deg, rgba(45,212,191,.75) 1px, transparent 1px)",
					backgroundSize: "64px 64px",
				}}
			/>
			<div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(45,212,191,.18),transparent_34%),radial-gradient(circle_at_82%_56%,rgba(103,232,249,.14),transparent_38%),linear-gradient(180deg,rgba(3,6,7,.08),#030607_86%)]" />

			{Array.from({ length: 30 }).map((_, i) => (
				<span
					key={i}
					className="particle pointer-events-none fixed bottom-[-16px] rounded-full bg-teal-300"
					style={{
						left: `${(i * 137) % 100}%`,
						width: 1.5 + ((i * 31) % 26) / 10,
						height: 1.5 + ((i * 31) % 26) / 10,
						opacity: 0.42,
						"--delay": `${(i * 0.55) % 9}s`,
						"--duration": `${12 + ((i * 47) % 14)}s`,
					} as GlowStyle}
				/>
			))}

			<div className="relative z-10 mx-auto grid min-h-screen max-w-6xl items-center gap-8 px-5 py-24 lg:grid-cols-[0.92fr_1.08fr]">
				<section className="panel-in overflow-hidden rounded-xl border border-teal-300/18 bg-[#071012]/90 shadow-[0_45px_120px_-45px_rgba(45,212,191,.65)] backdrop-blur-xl">
					<div className="border-b border-teal-300/12 bg-white/[.035] px-6 py-5">
						<Logo />
					</div>

					<div className="px-6 py-7 sm:px-8 sm:py-8">
						<p className="font-mono text-xs font-medium text-teal-200">create workspace</p>
						<h1 className="mt-2 text-3xl font-semibold tracking-[0] text-white">
							Start building with <span className="gradient-text">Modulus</span>
						</h1>
						<p className="mt-3 text-sm leading-relaxed text-slate-400">
							Create your account and open the dashboard for agent traces, incidents, and automated fix reviews.
						</p>

						<form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-4">
							<label className="flex flex-col gap-2 text-sm font-medium text-slate-200">
								Name
								<input
									className="h-11 rounded-lg border border-teal-300/14 bg-black/35 px-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-teal-300/65 focus:ring-4 focus:ring-teal-300/10 disabled:opacity-60"
									type="text"
									placeholder="Your name"
									value={name}
									onChange={(e) => setName(e.target.value)}
									required
									disabled={loading}
								/>
							</label>

							<label className="flex flex-col gap-2 text-sm font-medium text-slate-200">
								Email
								<input
									className="h-11 rounded-lg border border-teal-300/14 bg-black/35 px-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-teal-300/65 focus:ring-4 focus:ring-teal-300/10 disabled:opacity-60"
									type="email"
									placeholder="you@company.com"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
									disabled={loading}
								/>
							</label>

							<label className="flex flex-col gap-2 text-sm font-medium text-slate-200">
								Password
								<input
									className="h-11 rounded-lg border border-teal-300/14 bg-black/35 px-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-teal-300/65 focus:ring-4 focus:ring-teal-300/10 disabled:opacity-60"
									type="password"
									placeholder="Create a password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
									disabled={loading}
								/>
							</label>

							{error && (
								<p className="rounded-lg border border-rose-300/20 bg-rose-400/10 px-3 py-2 text-sm text-rose-200">
									{error}
								</p>
							)}

							{notice && (
								<p className="rounded-lg border border-teal-300/20 bg-teal-300/10 px-3 py-2 text-sm text-teal-100">
									{notice}
								</p>
							)}

							<button
								className="shine-button relative mt-1 h-11 overflow-hidden rounded-lg bg-teal-300 px-4 text-sm font-semibold text-black shadow-[0_0_28px_rgba(45,212,191,.34)] transition hover:-translate-y-0.5 hover:bg-cyan-200 hover:shadow-[0_0_38px_rgba(103,232,249,.42)] disabled:cursor-not-allowed disabled:opacity-60"
								type="submit"
								disabled={loading}
							>
								<span className="relative z-10 inline-flex items-center justify-center gap-2">
									{loading ? "Creating account..." : "Create account"}
									{!loading && <ArrowRight className="h-4 w-4" />}
								</span>
							</button>
						</form>

						<p className="mt-6 text-center text-sm text-slate-500">
							Already have an account?{" "}
							<a href="/login" className="font-semibold text-teal-200 transition hover:text-cyan-200">
								Sign in
							</a>
						</p>
					</div>
				</section>

				<section
					className="panel-in relative hidden min-h-[560px] overflow-hidden rounded-xl border border-cyan-200/22 bg-[linear-gradient(135deg,#05252b,#071012_48%,#0b3035)] p-6 shadow-[0_45px_140px_-55px_rgba(103,232,249,.85)] lg:block"
					style={{ animationDelay: "120ms" }}
				>
					<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_36%,rgba(103,232,249,.2),transparent_30%),linear-gradient(rgba(153,246,228,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(153,246,228,.08)_1px,transparent_1px)] bg-[length:100%_100%,44px_44px,44px_44px]" />

					<div className="relative z-10 flex items-center justify-between">
						<div>
							<p className="font-mono text-xs text-cyan-100">product demo</p>
							<h2 className="mt-2 text-3xl font-semibold tracking-[0] text-white">
								Watch a fix travel the pipeline
							</h2>
						</div>
						<span className="rounded-full border border-teal-200/30 bg-teal-200/10 px-3 py-1.5 font-mono text-xs text-teal-100">
							online
						</span>
					</div>

					<PipelineFlowDemo />

					<div className="relative z-10 mt-6 rounded-xl border border-teal-200/15 bg-black/25 p-4 font-mono text-xs text-slate-300">
						<div className="flex items-center gap-2 text-teal-100">
							<Lock className="h-4 w-4" />
							<span>redaction enabled - secrets masked - review required</span>
						</div>
					</div>
				</section>
			</div>
		</main>
	);
}