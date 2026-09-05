"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, KeyRound, LockKeyhole, ShieldCheck } from "lucide-react";
import { authClient, useAuth } from "@/lib/auth-client";
import { projectsApi } from "@/lib/api/projects";

/** Renders the Better Auth two-factor verification step. */
export default function TwoFactorPage() {
	const [code, setCode] = useState("");
	const [useBackupCode, setUseBackupCode] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const { refresh } = useAuth();

	async function verify(e: React.FormEvent) {
		e.preventDefault();
		setError(null);
		setLoading(true);
		try {
			const { error } = useBackupCode
				? await authClient.twoFactor.verifyBackupCode({ code, trustDevice: true })
				: await authClient.twoFactor.verifyTotp({ code, trustDevice: true });

			if (error) {
				setError(error.message ?? "Invalid code");
				return;
			}

			await refresh();
			void projectsApi.list().then(() => {
				router.push("/dashboard");
			}).catch(() => router.push("/projects"));
		} catch {
			setError("Unable to verify your code. Please try again.");
		} finally {
			setLoading(false);
		}
	}

	return (
		<main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#030607] px-5 py-12 font-['Space_Grotesk',sans-serif] text-white">
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(45,212,191,.16),transparent_38%),linear-gradient(180deg,#071012,#030607_78%)]" />
			<div className="pointer-events-none absolute inset-0 opacity-[0.045]" style={{ backgroundImage: "linear-gradient(rgba(45,212,191,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(45,212,191,.7) 1px, transparent 1px)", backgroundSize: "64px 64px" }} />

			<section className="relative w-full max-w-md overflow-hidden rounded-2xl border border-teal-300/20 bg-[#071012]/90 shadow-[0_35px_100px_-35px_rgba(45,212,191,.55)] backdrop-blur-xl">
				<div className="border-b border-teal-300/12 px-6 py-5 sm:px-8">
					<div className="flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-xl border border-teal-300/30 bg-teal-300/10 text-teal-200">
							<ShieldCheck className="h-5 w-5" />
						</div>
						<div>
							<p className="text-sm font-semibold text-slate-100">Modulus</p>
							<p className="font-mono text-[10px] uppercase tracking-[0.18em] text-teal-200/70">Secure access</p>
						</div>
					</div>
				</div>

				<div className="px-6 py-8 sm:px-8 sm:py-9">
					<div className="mb-7">
						<p className="font-mono text-xs uppercase tracking-[0.18em] text-teal-200">Identity checkpoint</p>
						<h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">Verify your identity</h1>
						<p className="mt-3 text-sm leading-relaxed text-slate-400">
							Enter the {useBackupCode ? "backup code" : "authentication code"} from your trusted security method to continue.
						</p>
					</div>

					<form onSubmit={verify} className="flex flex-col gap-4">
						<label className="flex flex-col gap-2 text-sm font-medium text-slate-200">
							{useBackupCode ? "Backup code" : "Authentication code"}
							<div className="relative">
								<KeyRound className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-teal-200/60" />
								<input
									className="h-12 w-full rounded-lg border border-teal-300/14 bg-black/35 pl-10 pr-3.5 text-center text-base tracking-[0.28em] text-white outline-none transition placeholder:text-slate-600 focus:border-teal-300/65 focus:ring-4 focus:ring-teal-300/10"
									placeholder={useBackupCode ? "XXXX-XXXX" : "000000"}
									value={code}
									onChange={(e) => setCode(e.target.value)}
									autoComplete={useBackupCode ? "off" : "one-time-code"}
									required
								/>
							</div>
						</label>

						{error && <p role="alert" className="rounded-lg border border-rose-300/20 bg-rose-400/10 px-3 py-2 text-sm text-rose-200">{error}</p>}

						<button className="h-12 rounded-lg bg-teal-300 px-4 text-sm font-semibold text-[#031010] shadow-[0_0_28px_rgba(45,212,191,.18)] transition hover:bg-teal-200 disabled:cursor-not-allowed disabled:opacity-60" type="submit" disabled={loading}>
							{loading ? "Checking code..." : "Verify and continue"}
						</button>
					</form>

					<div className="mt-6 flex flex-col gap-3 border-t border-teal-300/10 pt-5 text-sm">
						{!useBackupCode && (
							<button type="button" onClick={() => authClient.twoFactor.sendOtp()} className="text-left text-teal-200 transition hover:text-teal-100">
								Email me a code instead
							</button>
						)}
						<button type="button" onClick={() => setUseBackupCode((value) => !value)} className="flex items-center gap-2 text-left text-slate-400 transition hover:text-slate-200">
							<LockKeyhole className="h-4 w-4" />
							{useBackupCode ? "Use authenticator app instead" : "Use a backup code instead"}
						</button>
						<button type="button" onClick={() => router.push("/login")} className="flex items-center gap-2 text-left text-slate-500 transition hover:text-slate-300">
							<ArrowLeft className="h-4 w-4" />
							Back to sign in
						</button>
					</div>
				</div>
			</section>
		</main>
	);
}
