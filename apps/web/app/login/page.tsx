"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient, useAuth } from "@/lib/auth-client";
import { projectsApi } from "@/lib/api/projects";

// lucide-react v1 removed all brand/logo icons (GitHub included) — see
// https://lucide.dev/guide/react/migration. Using a plain inline SVG instead
// of pulling in a separate icon package for two glyphs.
function GithubIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.58 2 12.2c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.42.2 2.47.1 2.73.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.2C22 6.58 17.52 2 12 2z" />
    </svg>
  );
}

function Logo() {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span className="logo-mark relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-teal-300/55 bg-black">
        <span className="radar absolute inset-[-35%] bg-[conic-gradient(from_0deg,rgba(45,212,191,.72),transparent_28%,transparent)]" />
        <span className="ping absolute h-3 w-3 rounded-full bg-teal-300/50" />
        <span className="relative h-1.5 w-1.5 rounded-full bg-teal-200 shadow-[0_0_12px_#67e8f9]" />
      </span>
      <span className="text-lg font-semibold tracking-normal text-slate-50">Modulus</span>
    </span>
  );
}

function GoogleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.3-1.7 3.9-5.5 3.9a6.1 6.1 0 0 1 0-12.2c1.9 0 3.2.8 4 1.5l2.7-2.6A10 10 0 0 0 12 2 10 10 0 1 0 22 12.2c0-.7-.1-1.3-.2-2H12z" />
    </svg>
  );
}

// Ambient proof-of-life, not a second demo panel — ~14% opacity, small mono
// type, blurred by nothing but distance, faded at the edges. It should read
// as texture in the background, the way faint server-room readouts do,
// never compete with the sign-in card for attention.
const AMBIENT_LINES = [
  "execution #8821 succeeded  118ms",
  "tool_call: stripe.charge      ok",
  "trace ingested  proj_9f2a",
  "execution #8822 succeeded   94ms",
  "incident #4471 diagnosing…",
  "tool_call: db.write            ok",
  "reproduced in sandbox",
  "fix generated · PR #128",
  "execution #8823 succeeded  142ms",
  "webhook received  github",
  "PR #128 merged",
  "execution #8824 succeeded  87ms",
  "tool_call: email.send      failed",
  "redaction applied  2 fields",
  "execution #8825 succeeded  103ms",
];

function AmbientColumn({ side, speed }: { side: "left" | "right"; speed: number }) {
  return (
    <div
      className={`ambient-col pointer-events-none fixed top-0 hidden h-screen w-56 select-none overflow-hidden font-mono text-[11px] leading-[2.1] text-teal-200/[0.14] sm:block ${
        side === "left" ? "left-6" : "right-6 text-right"
      }`}
      style={{
        maskImage: "linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)",
      }}
    >
      <div className="ambient-scroll" style={{ animationDuration: `${speed}s` }}>
        {[...AMBIENT_LINES, ...AMBIENT_LINES].map((line, i) => (
          <p key={i} className="whitespace-nowrap">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await login(email, password);
      if (result.error) {
        setError(result.error.message);
        return;
      }
      if (result.data?.twoFactorRedirect) {
        router.push("/two-factor");
        return;
      }
      void projectsApi.list().then(() => {
        router.push("/dashboard");
      }).catch(() => router.push("/projects"));
    } catch {
      setError("Unable to sign in. Please try again.");
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
        @keyframes shimmer { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        @keyframes gridDrift { to { background-position: 64px 64px; } }
        @keyframes panelIn { from { opacity: 0; transform: translateY(18px) scale(.985); } to { opacity: 1; transform: none; } }
        @keyframes buttonLift { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-2px); } }
        @keyframes buttonSheen { from { transform: translateX(-140%) skewX(-18deg); } to { transform: translateX(220%) skewX(-18deg); } }
        .logo-mark { animation: markGlow 2.8s ease-in-out infinite; }
        .radar { animation: radarSweep 3s linear infinite; }
        .ping { animation: ringPing 2.1s ease-out infinite; }
        .bg-grid { animation: gridDrift 18s linear infinite; }
        .particle { animation: floatUp var(--duration) ease-in infinite; animation-delay: var(--delay); }
        .panel-in { animation: panelIn .7s cubic-bezier(.2,.8,.2,1) both; }
        .action-button { position: relative; overflow: hidden; animation: buttonLift 2.8s ease-in-out infinite; }
        .action-button::before { content: ""; position: absolute; inset: -20% auto -20% -45%; width: 32%; background: linear-gradient(90deg, transparent, rgba(255,255,255,.5), transparent); animation: buttonSheen 3.8s ease-in-out infinite; }
        .gradient-text { background: linear-gradient(90deg,#fff,#99f6e4,#67e8f9,#fff); background-size: 220% 100%; -webkit-background-clip: text; background-clip: text; color: transparent; animation: shimmer 6s ease-in-out infinite; }
        @keyframes ambientScroll { from { transform: translateY(0); } to { transform: translateY(-50%); } }
        .ambient-scroll { animation-name: ambientScroll; animation-timing-function: linear; animation-iteration-count: infinite; }
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
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(45,212,191,.18),transparent_34%),radial-gradient(circle_at_78%_58%,rgba(103,232,249,.12),transparent_38%),linear-gradient(180deg,rgba(3,6,7,.1),#030607_86%)]" />

      <AmbientColumn side="left" speed={38} />
      <AmbientColumn side="right" speed={44} />

      {Array.from({ length: 26 }).map((_, i) => (
        <span
          key={i}
          className="particle pointer-events-none fixed -bottom-4 rounded-full bg-teal-300"
          style={
            {
              left: `${(i * 137) % 100}%`,
              width: 1.5 + ((i * 31) % 24) / 10,
              height: 1.5 + ((i * 31) % 24) / 10,
              opacity: 0.42,
              "--delay": `${(i * 0.55) % 9}s`,
              "--duration": `${12 + ((i * 47) % 14)}s`,
            } as React.CSSProperties & Record<`--${string}`, string | number>
          }
        />
      ))}

      <div className="relative z-10 flex min-h-screen items-center justify-center px-5 py-24">
        <div className="panel-in w-full max-w-105 overflow-hidden rounded-xl border border-teal-300/18 bg-[#071012]/90 shadow-[0_45px_120px_-45px_rgba(45,212,191,.65)] backdrop-blur-xl">
          <div className="border-b border-teal-300/12 bg-white/[.035] px-6 py-5">
            <Logo />
          </div>

          <div className="px-6 py-7 sm:px-8 sm:py-8">
            <p className="font-mono text-xs font-medium text-teal-200">secure access</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-normal text-white">
              Sign in to <span className="gradient-text">Modulus</span>
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Continue monitoring agent runs, incidents, and pull requests from your dashboard.
            </p>

            <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-4">
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-200">
                Email
                <input
                  className="h-11 rounded-lg border border-teal-300/14 bg-black/35 px-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-teal-300/65 focus:ring-4 focus:ring-teal-300/10"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>

              <label className="flex flex-col gap-2 text-sm font-medium text-slate-200">
                Password
                <input
                  className="h-11 rounded-lg border border-teal-300/14 bg-black/35 px-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-teal-300/65 focus:ring-4 focus:ring-teal-300/10"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>

              {error && (
                <p className="rounded-lg border border-rose-300/20 bg-rose-400/10 px-3 py-2 text-sm text-rose-200">
                  {error}
                </p>
              )}

              <button
                className="action-button mt-1 h-11 rounded-lg bg-teal-300 px-4 text-sm font-semibold text-black shadow-[0_8px_24px_rgba(45,212,191,.28)] transition hover:bg-cyan-200 hover:shadow-[0_10px_30px_rgba(103,232,249,.38)] disabled:cursor-not-allowed disabled:opacity-60"
                type="submit"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            <div className="my-6 flex items-center gap-3">
              <span className="h-px flex-1 bg-teal-300/12" />
              <span className="font-mono text-[11px] uppercase text-slate-500">or</span>
              <span className="h-px flex-1 bg-teal-300/12" />
            </div>

            <div className="grid gap-3">
              <button
                onClick={() =>
                  authClient.signIn.social({
                    provider: "google",
                    callbackURL: "/projects",
                  })
                }
                className="action-button flex h-11 items-center justify-center gap-2 rounded-lg border border-teal-300/14 bg-white/[.035] px-4 text-sm font-semibold text-slate-100 transition hover:border-teal-300/45 hover:bg-teal-300/8"
              >
                <GoogleIcon />
                Continue with Google
              </button>
              <button
                onClick={() =>
                  authClient.signIn.social({
                    provider: "github",
                    callbackURL: "/projects",
                  })
                }
                className="action-button flex h-11 items-center justify-center gap-2 rounded-lg border border-teal-300/14 bg-white/[.035] px-4 text-sm font-semibold text-slate-100 transition hover:border-teal-300/45 hover:bg-teal-300/8"
              >
                <GithubIcon />
                Continue with GitHub
              </button>
            </div>

            <p className="mt-6 text-center text-sm text-slate-500">
              New to Modulus?{" "}
              <a href="/register" className="font-semibold text-teal-200 transition hover:text-cyan-200">
                Create an account
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}