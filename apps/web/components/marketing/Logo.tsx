/** Renders the animated Modulus logo mark and optional wordmark. */
export default function Logo({ withWordmark = true, className = "" }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <style>{`
        @keyframes radarSweep { to { transform: rotate(360deg); } }
        @keyframes ringPing {
          0% { transform: scale(0.35); opacity: .9; }
          100% { transform: scale(2.3); opacity: 0; }
        }
        @keyframes markGlow {
          0%, 100% { box-shadow: 0 0 6px 0 rgba(45,212,191,0.55), 0 0 0 0 rgba(45,212,191,0); }
          50% { box-shadow: 0 0 16px 2px rgba(45,212,191,0.85), 0 0 26px 6px rgba(45,212,191,0.25); }
        }
      `}</style>

      <span
        className="relative flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-[8px] bg-black"
        style={{ border: "1px solid rgba(45,212,191,0.55)", animation: "markGlow 2.6s ease-in-out infinite" }}
      >
        <span
          className="absolute inset-0"
          style={{
            background: "conic-gradient(from 0deg, rgba(45,212,191,0.5), transparent 30%)",
            animation: "radarSweep 3s linear infinite",
          }}
        />
        <span
          className="absolute h-2 w-2 rounded-full bg-[#2DD4BF]/70"
          style={{ animation: "ringPing 2.2s ease-out infinite" }}
        />
        <span className="relative h-[5px] w-[5px] rounded-full bg-[#2DD4BF]" style={{ boxShadow: "0 0 6px #2DD4BF" }} />
      </span>

      {withWordmark && (
        <span className="text-[17px] font-semibold tracking-tight text-[#EAF6F3]">
          Modulus
        </span>
      )}
    </span>
  );
}