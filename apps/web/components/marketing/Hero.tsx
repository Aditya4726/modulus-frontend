"use client";

import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";



type ConsoleTone = "dim" | "ok" | "fail";

const CONSOLE_LINES: Array<{ text: string; tone: ConsoleTone; delay: number }> = [
  { text: "$ agent.execute(checkout_flow)", tone: "dim", delay: 250 },
  { text: "├─ tool_call: stripe.charge         ok    142ms", tone: "ok", delay: 420 },
  { text: "├─ tool_call: db.write               ok     38ms", tone: "ok", delay: 420 },
  { text: "└─ tool_call: email.send        failed  9002ms", tone: "fail", delay: 620 },
  { text: "", tone: "dim", delay: 200 },
  { text: "incident #4471 opened · severity: high", tone: "fail", delay: 500 },
  { text: "→ diagnosing root cause…", tone: "ok", delay: 650 },
  { text: "→ reproduced in isolated sandbox", tone: "ok", delay: 650 },
  { text: "→ fix generated · PR #128 opened", tone: "ok", delay: 650 },
  { text: "✓ merged · resolved in 4m12s", tone: "ok", delay: 400 },
];

const TONE_CLASSES: Record<ConsoleTone, string> = {
  dim: "text-[#688079]",
  ok: "text-[#2DD4BF]",
  fail: "text-[#FF8B66]",
};

const PARTICLES = Array.from({ length: 26 }).map((_, i) => ({
  id: i,
  left: (i * 137.5) % 100,
  size: 1.4 + ((i * 37) % 26) / 10,
  delay: (i * 0.6) % 9,
  duration: 11 + ((i * 53) % 16),
}));

// matches the real section ids rendered by FeatureGrid.tsx further down the page
const NAV_LINKS = [
  { id: "hero", label: "Product" },
  { id: "workflow", label: "How it works" },
  { id: "docs", label: "Docs" },
];

/** Renders the animated public marketing hero and console preview. */
export default function Hero() {
  const [visible, setVisible] = useState<number[]>([]);
  const [cycle, setCycle] = useState(0);
  const [active, setActive] = useState("hero");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible([]);
    let elapsed = 0;

    CONSOLE_LINES.forEach((line, index) => {
      elapsed += line.delay;
      timers.current.push(setTimeout(() => setVisible((current) => [...current, index]), elapsed));
    });

    timers.current.push(setTimeout(() => setCycle((current) => current + 1), elapsed + 3000));
    return () => timers.current.forEach(clearTimeout);
  }, [cycle]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    NAV_LINKS.forEach((link) => {
      const element = document.getElementById(link.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          8% { opacity: .8; }
          90% { opacity: .4; }
          100% { transform: translateY(-640px) translateX(12px); opacity: 0; }
        }
        @keyframes drift {
          0%, 100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(4%, -5%) scale(1.08); }
        }
        @keyframes blink { 50% { opacity: 0; } }
        @keyframes scanline { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }
        .particle { position: absolute; bottom: -20px; border-radius: 9999px; background: #2DD4BF;
          animation-name: floatUp; animation-timing-function: ease-in; animation-iteration-count: infinite; }
        .orb { position: absolute; border-radius: 9999px; filter: blur(90px); animation: drift 15s ease-in-out infinite; }
        .scanline { animation: scanline 4.5s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; }
        }
      `}</style>

      {/* nav */}
      <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-[#2DD4BF]/15 bg-[#050807]/85 px-6 py-4 backdrop-blur-xl sm:px-10 lg:px-16">
        <a href="#hero"><Logo /></a>
        <div className="hidden items-center gap-9 font-mono text-[13.5px] text-[#7C9490] md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={`relative pb-1 transition ${active === l.id ? "text-[#EAF6F3]" : "hover:text-[#EAF6F3]"}`}
            >
              {l.label}
              <span
                className="absolute -bottom-[1px] left-0 h-[1.5px] bg-[#2DD4BF] transition-all duration-300"
                style={{ width: active === l.id ? "100%" : "0%" }}
              />
            </a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <a href="/login" className="hidden text-sm font-medium text-[#EAF6F3] transition hover:text-[#7C9490] sm:inline">
            Log in
          </a>
          <a
            href="/register"
            className="rounded-lg bg-[#2DD4BF] px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#5EEAD4]"
            style={{ boxShadow: "0 0 18px 0 rgba(45,212,191,0.25)" }}
          >
            Get started
          </a>
        </div>
      </nav>

      {/* hero */}
      <section id="hero" className="relative isolate w-full overflow-hidden bg-[#050807] pt-32 pb-24 sm:pt-36">
        <div
          className="pointer-events-none absolute inset-0 -z-20 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(45,212,191,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(45,212,191,0.7) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 15%, rgba(45,212,191,0.10), transparent 42%), radial-gradient(circle at 82% 70%, rgba(94,234,212,0.07), transparent 45%)",
          }}
        />
        <div className="orb h-[26rem] w-[26rem] bg-[#2DD4BF]/12 -left-32 -top-24" />
        <div className="orb h-[22rem] w-[22rem] bg-[#5EEAD4]/10 -right-24 top-28" style={{ animationDelay: "3s" }} />

        {PARTICLES.map((p) => (
          <span
            key={p.id}
            className="particle"
            style={{
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}

        <div className="relative px-6 sm:px-10 lg:px-16">
          <div className="relative z-10 mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#2DD4BF]/30 bg-[#2DD4BF]/6 px-3.5 py-1.5 font-mono text-xs text-[#B7F5EB]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2DD4BF] opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#2DD4BF]" />
                </span>
                Your Ai Engineer Best Friend
              </div>

              <h1 className="max-w-xl text-[2.5rem] font-semibold leading-[1.08] tracking-tight text-[#EAF6F3] sm:text-6xl">
                Catch what your agents get wrong. Fix it before anyone notices.
              </h1>

              <p className="mt-6 max-w-md text-lg leading-relaxed text-[#8FA39E]">
                Modulus traces every execution, tool call, and failure your agents produce — then diagnoses the
                incident, reproduces it, and opens a pull request to fix it. No paging, no guesswork.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href="/register"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#2DD4BF] px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-[#5EEAD4]"
                  style={{ boxShadow: "0 0 22px 0 rgba(45,212,191,0.3)" }}
                >
                  Start tracing
                </a>
                <a
                  href="#workflow"
                  className="inline-flex items-center gap-2 rounded-lg border border-[#2DD4BF]/25 px-6 py-3.5 text-sm font-medium text-[#EAF6F3] transition hover:border-[#2DD4BF]/60 hover:bg-[#2DD4BF]/5"
                >
                  See how it works
                </a>
              </div>

              <div className="mt-11 flex gap-10 border-t border-[#2DD4BF]/10 pt-6 font-mono text-xs text-[#7C9490]">
                <div><b className="font-medium text-[#EAF6F3]">45min</b> avg. debugging time saved per fix</div>
                <div><b className="font-medium text-[#EAF6F3]">5 lines</b> drop-in SDK setup</div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-[#2DD4BF]/20 bg-[#0A1211] shadow-[0_50px_100px_-30px_rgba(0,0,0,0.85)]">
              <div
                className="scanline pointer-events-none absolute inset-x-0 top-0 z-10 h-16"
                style={{ background: "linear-gradient(180deg, rgba(45,212,191,0.10), transparent)" }}
              />
              <div className="flex items-center gap-2 border-b border-[#2DD4BF]/10 bg-[#0D1615] px-4 py-3.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#FF8B66]" style={{ boxShadow: "0 0 6px 0 rgba(255,139,102,0.6)" }} />
                <span className="h-2.5 w-2.5 rounded-full bg-[#FFD166]" style={{ boxShadow: "0 0 6px 0 rgba(255,209,102,0.6)" }} />
                <span className="h-2.5 w-2.5 rounded-full bg-[#2DD4BF]" style={{ boxShadow: "0 0 6px 0 rgba(45,212,191,0.6)" }} />
                <span className="ml-2 font-mono text-xs text-[#7C9490]">incident #4471 · checkout_flow</span>
              </div>
              <div className="min-h-[18.5rem] px-5 py-6 font-mono text-[13px] leading-[1.95]">
                {CONSOLE_LINES.map((line, i) => {
                  const isLast = i === CONSOLE_LINES.length - 1;
                  const shown = visible.includes(i);
                  return (
                    <div
                      key={`${cycle}-${i}`}
                      className={`whitespace-pre transition-all duration-300 ${TONE_CLASSES[line.tone]} ${
                        shown ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
                      }`}
                    >
                      {line.text || "\u00A0"}
                      {shown && isLast && visible.length === CONSOLE_LINES.length && (
                        <span
                          className="ml-1 inline-block h-3.5 w-1.5 bg-[#2DD4BF] align-middle"
                          style={{ animation: "blink 1s step-end infinite" }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}