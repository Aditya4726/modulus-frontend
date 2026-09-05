"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
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
  Boxes,
  Workflow,
  Brain,
  GitPullRequest,
  ArrowRight,
  ScanEye,
  Box,
  ListChecks,
  UserCheck,
  AlertCircle,
  Search,
  RotateCcw,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

type GlowStyle = CSSProperties & { "--glow"?: string };
type Feature = (typeof FEATURES)[number];
type Layer = (typeof LAYERS)[number];
type Adapter = (typeof ADAPTERS)[number];
type Control = (typeof CONTROLS)[number];

const PALETTE = ["#2DD4BF", "#14B8A6", "#67E8F9", "#5EEAD4", "#22D3EE", "#99F6E4"];

// wider spectrum, reserved for the workflow section only
const SPECTRUM = ["#2DD4BF", "#22D3EE", "#38BDF8", "#818CF8", "#C084FC", "#5EEAD4"];

const FEATURES = [
  { label: "Execution observability", description: "Watch every agent run as it happens, not after the fact.", icon: Radar },
  { label: "Execution & trace tracking", description: "Every step, span, and decision your agents make, recorded.", icon: BarChart3 },
  { label: "Tool-call monitoring", description: "See which tools ran, with what inputs, and what came back.", icon: Wrench },
  { label: "Sensitive-data redaction", description: "PII and secrets are stripped before anything is stored.", icon: Lock },
  { label: "OpenTelemetry-first ingestion", description: "Standard OTLP in — no proprietary lock-in on the wire.", icon: Package },
  { label: "Async ingestion", description: "Redis Streams absorb bursts without dropping events.", icon: Zap },
  { label: "Postgres + Prisma", description: "Durable, queryable storage for every trace and incident.", icon: Database },
  { label: "API keys & sessions", description: "Instrument production agents and log in as a team, safely.", icon: KeyRound },
  { label: "Org & role-based access", description: "Projects, teams, and permissions that match how you work.", icon: Users },
  { label: "TypeScript SDK", description: "Instrument any agent or framework in a couple of lines.", icon: Radio },
  { label: "Modular monorepo", description: "Clean workspace boundaries between every service.", icon: Puzzle },
  { label: "Turborepo builds", description: "Fast, cached builds across the whole platform.", icon: Rocket },
  { label: "Full-stack dashboard", description: "One place to see reliability across every agent you run.", icon: Globe },
];

const LAYERS = [
  { title: "Instrumentation", icon: Boxes, color: "#2DD4BF", items: ["LangChain", "CrewAI", "AutoGen", "LlamaIndex", "OTel SDK"] },
  { title: "Ingestion & collection", icon: Workflow, color: "#14B8A6", items: ["OTel Collector", "Normalization", "Redis Streams", "PostgreSQL"] },
  { title: "Intelligence & remediation", icon: Brain, color: "#67E8F9", items: ["Root-cause analysis", "Reproduction", "Fix generation", "Verification"] },
  { title: "Human in the loop", icon: GitPullRequest, color: "#5EEAD4", items: ["Branch", "Commit", "Pull request", "Review", "Merge"] },
];

const ADAPTERS = [
  { mono: "Lc", label: "LangChain", color: "#2DD4BF" },
  { mono: "Cr", label: "CrewAI", color: "#14B8A6" },
  { mono: "AG", label: "AutoGen", color: "#EAF6F3" },
  { mono: "Li", label: "LlamaIndex", color: "#67E8F9" },
  { mono: "OT", label: "OpenTelemetry", color: "#5EEAD4" },
  { mono: "M", label: "Modulus SDK", color: "#22D3EE" },
];

const STEPS = [
  { label: "Detect", sub: "Alert fires from your monitors", icon: AlertCircle },
  { label: "Diagnose", sub: "Trace the failure to its source", icon: Search },
  { label: "Reproduce", sub: "Recreate it in a sandbox", icon: RotateCcw },
  { label: "Fix", sub: "Draft a candidate patch", icon: Wrench },
  { label: "Verify", sub: "Run the full test suite", icon: ShieldCheck },
  { label: "PR", sub: "Push the fix for review", icon: GitPullRequest },
  { label: "Approve", sub: "A teammate signs off", icon: UserCheck },
];

const CONTROLS = [
  { title: "PII redaction", description: "Personal data is stripped before it's ever stored.", icon: Lock },
  { title: "Secret detection", description: "Keys and tokens are caught and masked automatically.", icon: ScanEye },
  { title: "Sandbox isolation", description: "Fixes are tested in isolated containers.", icon: Box },
  { title: "Policy guardrails", description: "Constrained generation keeps fixes inside your rules.", icon: ListChecks },
  { title: "Human approval gate", description: "No fix reaches production without review.", icon: UserCheck },
];

/** Tracks when a section enters the viewport for its reveal animation. */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, shown] as const;
}

/** Renders a shared marketing section heading with reveal animation. */
function SectionHead({ eyebrow, color, title, sub }: { eyebrow: string; color: string; title: string; sub: string }) {
  const [ref, shown] = useReveal();
  return (
    <div
      ref={ref}
      className={`mb-12 max-w-xl transition-all duration-700 ${shown ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
    >
      <p className="mb-2 font-mono text-sm font-semibold" style={{ color }}>
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold leading-tight tracking-tight text-[#EAF6F3] sm:text-4xl">{title}</h2>
      <p className="mt-3 text-base leading-relaxed text-[#8FA39E]">{sub}</p>
    </div>
  );
}

/** Renders the marketing platform, architecture, workflow, and safety sections. */
export default function FeatureGrid() {
  const [active, setActive] = useState(0);
  const [stepRef, stepShown] = useReveal();

  useEffect(() => {
    if (!stepShown) return;
    const iv = setInterval(() => setActive((a) => (a + 1) % STEPS.length), 1500);
    return () => clearInterval(iv);
  }, [stepShown]);

  return (
    <div className="relative min-h-screen w-full bg-[#050807] font-['Space_Grotesk',sans-serif]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');
        .font-mono { font-family: 'IBM Plex Mono', monospace; }
        @keyframes cardIn { from { opacity: 0; transform: translateY(18px) scale(.98);} to { opacity:1; transform:none;} }
        .card-in { animation: cardIn .55s cubic-bezier(.2,.8,.2,1) both; }
        @keyframes glowCycle { 0%,100% { box-shadow: 0 0 0 rgba(0,0,0,0);} 50% { box-shadow: 0 0 34px -6px var(--glow); } }
        .glow-hover:hover { animation: glowCycle 1.6s ease-in-out infinite; border-color: var(--glow); }
        @keyframes spinBorder { to { transform: rotate(360deg); } }
        .rotating-border { position: absolute; inset: -1px; z-index: 0; animation: spinBorder 6s linear infinite; }
        @keyframes gridDrift { 0% { background-position: 0 0; } 100% { background-position: 64px 64px; } }
        .bg-grid { animation: gridDrift 18s linear infinite; }
        @keyframes flowDash { to { stroke-dashoffset: -24; } }
        .flow-dash { stroke-dasharray: 4 6; animation: flowDash 1s linear infinite; }
        @keyframes iconFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
        .icon-float { animation: iconFloat 3.2s ease-in-out infinite; }

        /* ---- workflow section: layered aurora + orbiting spectrum + sparkle bursts ---- */
        @keyframes auroraDrift {
          0%   { background-position: 0% 30%, 100% 70%, 50% 0%; }
          50%  { background-position: 100% 60%, 0% 30%, 30% 100%; }
          100% { background-position: 0% 30%, 100% 70%, 50% 0%; }
        }
        .aurora-layer {
          animation: auroraDrift 22s ease-in-out infinite;
          background-size: 220% 220%, 200% 200%, 260% 260%;
          mix-blend-mode: screen;
        }
        @keyframes hueSpin { to { filter: hue-rotate(360deg); } }
        .hue-spin { animation: hueSpin 16s linear infinite; }
        @keyframes ringSpin { to { transform: rotate(360deg); } }
        .ring-spin { animation: ringSpin 3.2s linear infinite; }
        @keyframes ringSpinReverse { to { transform: rotate(-360deg); } }
        .ring-spin-reverse { animation: ringSpinReverse 5s linear infinite; }
        @keyframes sparkleOut {
          0%   { transform: translate(-50%,-50%) rotate(var(--angle)) translateY(0) scale(0); opacity: 1; }
          70%  { opacity: 1; }
          100% { transform: translate(-50%,-50%) rotate(var(--angle)) translateY(-34px) scale(1); opacity: 0; }
        }
        .sparkle { animation: sparkleOut 0.9s ease-out both; }
        @keyframes nodePop {
          0% { transform: scale(1); }
          35% { transform: scale(1.16); }
          100% { transform: scale(1.1); }
        }
        .node-pop { animation: nodePop 0.5s cubic-bezier(.34,1.56,.64,1) both; }
        @keyframes trailPulse {
          0% { offset-distance: 0%; opacity: 0; transform: scale(0.6); }
          10% { opacity: 1; transform: scale(1); }
          90% { opacity: 1; }
          100% { offset-distance: 100%; opacity: 0; }
        }
        .trail-dot { animation-name: trailPulse; animation-timing-function: cubic-bezier(.4,0,.2,1); animation-iteration-count: infinite; }
        @keyframes labelGlow {
          0%, 100% { text-shadow: 0 0 0 rgba(0,0,0,0); }
          50% { text-shadow: 0 0 18px currentColor; }
        }
        .label-glow { animation: labelGlow 1.4s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; } }
      `}</style>

      <div
        className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(45,212,191,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(45,212,191,0.8) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 12% 8%, rgba(45,212,191,0.06), transparent 40%), radial-gradient(circle at 88% 60%, rgba(94,234,212,0.06), transparent 45%)",
        }}
      />

      {/* ---------- feature bento ---------- */}
      <section id="docs" className="mx-auto max-w-7xl scroll-mt-24 border-t border-[#2DD4BF]/10 px-6 py-24 sm:px-10 lg:px-16">
        <SectionHead
          eyebrow="Platform"
          color="#2DD4BF"
          title="Everything reliability engineering needs, built in."
          sub="Modulus is a full observability and remediation stack for agentic applications — not another dashboard bolted on top."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div
            className="glow-hover relative overflow-hidden rounded-2xl border border-[#2DD4BF]/15 bg-[#0A1211] p-7 sm:col-span-2 lg:col-span-2 lg:row-span-2"
            style={{ "--glow": "#2DD4BF55" } as GlowStyle}
          >
            <span
              className="rotating-border"
              style={{
                background: "conic-gradient(from 0deg, transparent 0%, #2DD4BF55 18%, transparent 32%, #14B8A655 55%, transparent 70%, #67E8F955 88%, transparent 100%)",
              }}
            />
            <div className="relative z-1">
              <span className="mb-4 inline-block font-mono text-xs text-[#2DD4BF]">the difference</span>
              <h3 className="text-xl font-semibold text-[#EAF6F3]">Automatic incident response</h3>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-[#8FA39E]">
                When a tool call fails, Modulus opens an incident, diagnoses the cause, reproduces it in an isolated run,
                and generates a fix — submitted as a real pull request against your repository, reviewed like any other change.
              </p>
              <div className="mt-8 flex items-center gap-2 font-mono text-xs text-[#2DD4BF]">
                incident → diagnosis → repro → fix → PR
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </div>
          </div>

          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            const color = PALETTE[i % PALETTE.length];
            return <FeatureCard key={f.label} f={f} Icon={Icon} color={color} index={i} />;
          })}
        </div>
      </section>

      {/* ---------- architecture ---------- */}
      <section id="github" className="mx-auto max-w-7xl scroll-mt-24 border-t border-[#2DD4BF]/10 px-6 py-24 sm:px-10 lg:px-16">
        <SectionHead
          eyebrow="Architecture"
          color="#14B8A6"
          title="One pipeline, from telemetry to a merged fix."
          sub="Every layer is independently scalable — traces flow in over OpenTelemetry, and a fix flows out as a reviewed pull request."
        />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
          {LAYERS.map((layer, i) => (
            <div key={layer.title} className="relative">
              <LayerCard layer={layer} index={i} />
              {i < LAYERS.length - 1 && (
                <svg className="pointer-events-none absolute -right-4 top-1/2 z-10 hidden h-3 w-8 -translate-y-1/2 lg:block" viewBox="0 0 32 12">
                  <line x1="0" y1="6" x2="32" y2="6" stroke={layer.color} strokeWidth="2" className="flow-dash" opacity="0.7" />
                </svg>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ---------- how it works — the loud one ---------- */}
      <section
        id="workflow"
        className="relative scroll-mt-24 overflow-hidden border-y border-[#22D3EE]/25 bg-[#050e11] px-6 py-28 sm:px-10 lg:px-16"
      >
        {/* three blurred, hue-shifting color fields blended together */}
        <div
          className="aurora-layer hue-spin pointer-events-none absolute inset-[-20%] -z-10 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle, #2DD4BF, transparent 60%), radial-gradient(circle, #818CF8, transparent 60%), radial-gradient(circle, #C084FC, transparent 55%)",
            filter: "blur(70px)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(56,189,248,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.8) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <SectionHead
          eyebrow="Workflow"
          color="#67E8F9"
          title="From incident to fix, automatically."
          sub="A single run through this pipeline, end to end — watch it cycle."
        />

        <div ref={stepRef} className="relative hidden lg:block">
          {/* connecting track with three color-cycling trail dots riding it */}
          <svg viewBox="0 0 1200 24" className="absolute left-6 right-6 top-6 h-6 w-[calc(100%-3rem)]" preserveAspectRatio="none">
            <path id="workflow-track" d="M0,12 L1200,12" stroke="rgba(103,232,249,0.14)" strokeWidth="2" fill="none" />
            {SPECTRUM.map((c, i) => (
              <circle
                key={c}
                r="4.5"
                fill={c}
                className="trail-dot"
                style={{
                  offsetPath: "path('M0,12 L1200,12')",
                  animationDuration: "4.2s",
                  animationDelay: `${i * 0.7}s`,
                }}
              />
            ))}
          </svg>

          <div className="grid grid-cols-7 gap-3 pt-2">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              const isDone = i < active;
              const isActive = i === active;
              const color = SPECTRUM[i % SPECTRUM.length];
              return (
                <div key={step.label} className="flex flex-col items-center text-center">
                  <div className={`relative flex h-12 w-12 items-center justify-center ${isActive ? "node-pop" : ""}`}>
                    {isActive && (
                      <>
                        <span
                          className="ring-spin absolute -inset-2 rounded-full"
                          style={{ background: `conic-gradient(from 0deg, transparent 0%, ${color} 20%, transparent 40%)` }}
                        />
                        <span
                          className="ring-spin-reverse absolute -inset-3.5 rounded-full opacity-70"
                          style={{ background: `conic-gradient(from 90deg, transparent 0%, #C084FC 15%, transparent 35%)` }}
                        />
                        <span key={active} className="pointer-events-none absolute inset-0">
                          {Array.from({ length: 8 }).map((_, s) => (
                            <span
                              key={s}
                              className="sparkle absolute left-1/2 top-1/2 h-1 w-1 rounded-full"
                              style={{ background: SPECTRUM[s % SPECTRUM.length], "--angle": `${s * 45}deg`, animationDelay: `${s * 0.02}s` } as CSSProperties}
                            />
                          ))}
                        </span>
                      </>
                    )}
                    <div
                      className={`relative z-10 flex h-11 w-11 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                        isDone ? "border-transparent" : isActive ? "border-transparent" : "border-[#2DD4BF]/10 bg-[#0A1211]"
                      }`}
                      style={isDone || isActive ? { background: color, boxShadow: `0 0 22px 2px ${color}77` } : undefined}
                    >
                      <Icon className={`h-5 w-5 ${isDone || isActive ? "text-black" : "text-[#8FA39E]"}`} strokeWidth={2.25} />
                    </div>
                  </div>
                  <p
                    className={`mt-3 text-sm font-semibold transition-colors ${isActive ? "label-glow" : ""}`}
                    style={{ color: isActive ? color : isDone ? "#EAF6F3" : "#8FA39E" }}
                  >
                    {step.label}
                  </p>
                  <p className="mt-1 text-xs leading-snug text-[#6E877F]">{step.sub}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-5 lg:hidden">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            const isDone = i < active;
            const isActive = i === active;
            const color = SPECTRUM[i % SPECTRUM.length];
            return (
              <div key={step.label} className="flex items-center gap-4">
                <div
                  className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                    isDone || isActive ? "border-transparent" : "border-[#2DD4BF]/10 bg-[#0A1211]"
                  }`}
                  style={isDone || isActive ? { background: color, boxShadow: `0 0 18px 1px ${color}66` } : undefined}
                >
                  <Icon className={`h-[18px] w-[18px] ${isDone || isActive ? "text-black" : "text-[#8FA39E]"}`} strokeWidth={2.25} />
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: isActive ? color : isDone ? "#EAF6F3" : "#8FA39E" }}>
                    {step.label}
                  </p>
                  <p className="text-xs text-[#6E877F]">{step.sub}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ---------- integrations ---------- */}
      <section className="mx-auto max-w-7xl border-t border-[#2DD4BF]/10 px-6 py-24 sm:px-10 lg:px-16">
        <SectionHead
          eyebrow="Integrations"
          color="#5EEAD4"
          title="Works with the frameworks you already use."
          sub="Auto-instrumentation for the popular agent frameworks, with a generic OpenTelemetry path for everything else."
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ADAPTERS.map((a, i) => (
            <AdapterCard key={a.label} a={a} index={i} />
          ))}
        </div>
      </section>

      {/* ---------- security ---------- */}
      <section className="mx-auto max-w-7xl border-t border-[#2DD4BF]/10 px-6 py-24 sm:px-10 lg:px-16">
        <SectionHead
          eyebrow="Security & safety"
          color="#22D3EE"
          title="Autonomous, within limits you set."
          sub="Modulus can diagnose and draft a fix on its own — it never merges one without a human in the loop."
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {CONTROLS.map((c, i) => (
            <ControlCard key={c.title} c={c} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}

/** Renders one feature card in the platform grid. */
function FeatureCard({ f, Icon, color, index }: { f: Feature; Icon: LucideIcon; color: string; index: number }) {
  const [ref, shown] = useReveal();
  return (
    <div
      ref={ref}
      className={`glow-hover rounded-2xl border border-[#2DD4BF]/10 bg-[#0A1211] p-6 transition-transform duration-300 hover:-translate-y-1 ${
        shown ? "card-in" : "opacity-0"
      }`}
      style={{ animationDelay: `${(index % 6) * 70}ms`, "--glow": `${color}66` } as GlowStyle}
    >
      <span
        className="icon-float mb-4 flex h-10 w-10 items-center justify-center rounded-xl"
        style={{ background: `${color}1f`, animationDelay: `${(index % 6) * 0.3}s` }}
      >
        <Icon className="h-5 w-5" style={{ color }} strokeWidth={2.25} />
      </span>
      <h3 className="mb-1.5 text-sm font-semibold text-[#EAF6F3]">{f.label}</h3>
      <p className="text-[13px] leading-relaxed text-[#8FA39E]">{f.description}</p>
    </div>
  );
}

/** Renders one architecture layer card. */
function LayerCard({ layer, index }: { layer: Layer; index: number }) {
  const Icon = layer.icon;
  const [ref, shown] = useReveal();
  return (
    <div
      ref={ref}
      className={`glow-hover rounded-2xl border border-[#2DD4BF]/10 bg-[#0A1211] p-5 ${shown ? "card-in" : "opacity-0"}`}
      style={{ animationDelay: `${index * 90}ms`, "--glow": `${layer.color}66` } as GlowStyle}
    >
      <span
        className="icon-float mb-4 flex h-9 w-9 items-center justify-center rounded-lg"
        style={{ background: `${layer.color}22`, animationDelay: `${index * 0.25}s` }}
      >
        <Icon className="h-[18px] w-[18px]" style={{ color: layer.color }} strokeWidth={2.25} />
      </span>
      <p className="mb-3 text-sm font-semibold text-[#EAF6F3]">{layer.title}</p>
      <div className="flex flex-wrap gap-1.5">
        {layer.items.map((item) => (
          <span key={item} className="rounded-full border border-[#2DD4BF]/10 bg-[#2DD4BF]/3 px-2.5 py-1 font-mono text-[11px] text-[#8FA39E]">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Renders one framework integration card. */
function AdapterCard({ a, index }: { a: Adapter; index: number }) {
  const [ref, shown] = useReveal();
  return (
    <div
      ref={ref}
      className={`glow-hover flex items-center gap-3.5 rounded-xl border border-[#2DD4BF]/10 bg-[#0A1211] p-4 transition-transform duration-300 hover:-translate-y-0.5 ${
        shown ? "card-in" : "opacity-0"
      }`}
      style={{ animationDelay: `${index * 60}ms`, "--glow": `${a.color}66` } as GlowStyle}
    >
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-xs font-extrabold"
        style={{ background: a.color, color: "#050807" }}
      >
        {a.mono}
      </span>
      <p className="text-sm font-semibold text-[#EAF6F3]">{a.label}</p>
    </div>
  );
}

/** Renders one safety and control card. */
function ControlCard({ c, index }: { c: Control; index: number }) {
  const Icon = c.icon;
  const [ref, shown] = useReveal();
  return (
    <div
      ref={ref}
      className={`glow-hover rounded-2xl border border-[#2DD4BF]/10 bg-[#0A1211] p-5 ${shown ? "card-in" : "opacity-0"}`}
      style={{ animationDelay: `${index * 80}ms`, "--glow": "#2DD4BF66" } as GlowStyle}
    >
      <span
        className="icon-float mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#2DD4BF]/15"
        style={{ animationDelay: `${index * 0.3}s` }}
      >
        <Icon className="h-5 w-5 text-[#2DD4BF]" strokeWidth={2.25} />
      </span>
      <h3 className="mb-1.5 text-sm font-semibold text-[#EAF6F3]">{c.title}</h3>
      <p className="text-[13px] leading-relaxed text-[#8FA39E]">{c.description}</p>
    </div>
  );
}