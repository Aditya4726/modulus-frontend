"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Radar, Mail, KeyRound } from "lucide-react";
import { authClient } from "@/lib/auth-client";

/* Backend integration: better-auth verifies either twoFactor.verifyTotp or
 * twoFactor.verifyBackupCode with { code, trustDevice: true }. sendOtp() sends
 * the email fallback. Preserve the auth session and return a structured error.
 */

const jakarta = Plus_Jakarta_Sans({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700", "800"],
	variable: "--font-jakarta",
});

function Logo({ className }: { className?: string }) {
	return (
		<span className={`rounded-lg bg-blue-600 flex items-center justify-center shrink-0 ${className ?? "w-8 h-8"}`}>
			<Radar className="w-4 h-4 text-white" strokeWidth={2.4} />
		</span>
	);
}

export default function TwoFactorPage() {
	const [code, setCode] = useState("");
	const [useBackupCode, setUseBackupCode] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [otpSent, setOtpSent] = useState(false);
	const router = useRouter();

	async function verify(e: React.FormEvent) {
		e.preventDefault();
		setError(null);
		setLoading(true);
		const { error } = useBackupCode
			? await authClient.twoFactor.verifyBackupCode({ code, trustDevice: true })
			: await authClient.twoFactor.verifyTotp({ code, trustDevice: true });

		if (error) {
			setError(error.message ?? "Invalid code");
			setLoading(false);
		} else {
			router.push("/projects");
		}
	}

	async function sendOtp() {
		await authClient.twoFactor.sendOtp();
		setOtpSent(true);
	}

	return (
		<div className={`${jakarta.variable} min-h-screen bg-white flex items-center justify-center px-6 font-(family-name:--font-jakarta)`}>
			<div className="w-full max-w-sm">
				<div className="flex items-center gap-2.5 mb-8 justify-center">
					<Logo />
					<span className="text-lg font-extrabold text-slate-900">Modulus</span>
				</div>

				<div className="rounded-lg border border-slate-200 shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-7">
					<div className="flex items-center gap-2 mb-4" aria-hidden="true">
						<span className="font-mono text-[10px] font-bold text-blue-600">AUTH-02</span>
						<span className="h-px w-16 bg-blue-200" />
						<span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
					</div>

					<h1 className="text-xl font-extrabold text-slate-900 mb-1">
						Two-factor verification
					</h1>
					<p className="text-slate-500 text-sm mb-6">
						{useBackupCode
							? "Enter one of your saved backup codes."
							: "Enter the 6-digit code from your authenticator app."}
					</p>

					<form onSubmit={verify} className="flex flex-col gap-4">
						<input
							className="w-full border border-slate-300 rounded-md px-3.5 py-3 text-center text-lg font-mono tracking-[0.35em] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition disabled:opacity-60"
							placeholder={useBackupCode ? "backup-code" : "000000"}
							value={code}
							onChange={(e) => setCode(e.target.value)}
							disabled={loading}
							autoFocus
							maxLength={useBackupCode ? 20 : 6}
						/>

						{error && (
							<p className="text-[#e2445c] text-sm bg-[#e2445c]/5 rounded-lg px-3 py-2">
								{error}
							</p>
						)}

						<button
							className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-md text-sm transition disabled:opacity-50"
							type="submit"
							disabled={loading || !code}
						>
							{loading ? "Verifying..." : "Verify"}
						</button>
					</form>

					<div className="flex flex-col gap-1 mt-5 pt-5 border-t border-slate-100">
						{!useBackupCode && (
							<button
								onClick={sendOtp}
								className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 py-1.5 text-left transition"
							>
								<Mail className="w-3.5 h-3.5" />
								{otpSent ? "Code sent — check your email" : "Email me a code instead"}
							</button>
						)}
						<button
							onClick={() => {
								setUseBackupCode((v) => !v);
								setCode("");
								setError(null);
							}}
							className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 py-1.5 text-left transition"
						>
							<KeyRound className="w-3.5 h-3.5" />
							{useBackupCode ? "Use authenticator app instead" : "Use a backup code instead"}
						</button>
					</div>
				</div>

				<p className="text-center text-sm text-slate-400 mt-5">
					Having trouble?{" "}
					<a href="/login" className="text-blue-600 font-semibold hover:text-blue-700">
						Back to login
					</a>
				</p>
			</div>
		</div>
	);
}