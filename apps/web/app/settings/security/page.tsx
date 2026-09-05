"use client";

import { useState } from "react";
import { Check, Clipboard, KeyRound, LockKeyhole, ShieldCheck } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Sidebar } from "@/components/layout/Sidebar";

/** Renders the user two-factor authentication setup flow. */
export default function SecuritySettingsPage() {
	const [password, setPassword] = useState("");
	const [qrUri, setQrUri] = useState<string | null>(null);
	const [totpCode, setTotpCode] = useState("");
	const [backupCodes, setBackupCodes] = useState<string[] | null>(null);
	const [enabled, setEnabled] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [copied, setCopied] = useState(false);

	async function startEnable() {
		setLoading(true);
		setError(null);
		try {
			const { data, error: enableError } = await authClient.twoFactor.enable({ password, issuer: "Modulus" });
			if (enableError) {
				setError(enableError.message ?? "Unable to start two-factor setup.");
				return;
			}
			if (data?.method === "totp") {
				setQrUri(data.totpURI);
				setBackupCodes(data.backupCodes ?? null);
			}
		} catch {
			setError("Unable to start two-factor setup. Check your password and try again.");
		} finally {
			setLoading(false);
		}
	}

	async function confirmEnable() {
		setLoading(true);
		setError(null);
		try {
			const { error: verifyError } = await authClient.twoFactor.verifyTotp({ code: totpCode });
			if (verifyError) {
				setError(verifyError.message ?? "Invalid authentication code.");
				return;
			}
			setEnabled(true);
		} catch {
			setError("Unable to verify the code. Please try again.");
		} finally {
			setLoading(false);
		}
	}

	async function copyUri() {
		if (!qrUri) return;
		await navigator.clipboard.writeText(qrUri);
		setCopied(true);
		setTimeout(() => setCopied(false), 1800);
	}

	return (
		<div className="flex min-h-screen bg-[#0a0a0f] text-slate-300">
			<Sidebar />
			<main className="min-w-0 flex-1 px-5 py-8 lg:px-10 lg:py-10">
				<div className="mx-auto max-w-3xl">
					<div className="mb-8"><p className="font-mono text-xs uppercase tracking-[0.18em] text-teal-300">Account security</p><h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">Security settings</h1><p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">Protect your Modulus account with an authenticator app and recovery codes.</p></div>
					<section className="overflow-hidden rounded-2xl border border-teal-300/15 bg-[#101117] shadow-[0_25px_80px_-45px_rgba(45,212,191,.5)]">
						<div className="flex items-start justify-between gap-4 border-b border-white/10 px-6 py-5 sm:px-8"><div className="flex gap-4"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-teal-300/25 bg-teal-300/10 text-teal-200"><ShieldCheck className="h-5 w-5" /></div><div><h2 className="font-semibold text-white">Two-factor authentication</h2><p className="mt-1 text-sm text-slate-500">Require a verification code when signing in.</p></div></div><span className={`rounded-full px-3 py-1 text-xs font-medium ${enabled ? "bg-emerald-400/10 text-emerald-300" : "bg-slate-400/10 text-slate-400"}`}>{enabled ? "Enabled" : "Not enabled"}</span></div>
						<div className="px-6 py-7 sm:px-8">
							{!qrUri && !enabled && <div className="max-w-lg"><label className="flex flex-col gap-2 text-sm font-medium text-slate-200">Current password<input className="h-11 rounded-lg border border-white/10 bg-black/25 px-3.5 text-white outline-none transition placeholder:text-slate-600 focus:border-teal-300/60 focus:ring-4 focus:ring-teal-300/10" type="password" placeholder="Confirm your password" value={password} onChange={(event) => setPassword(event.target.value)} /></label><p className="mt-3 text-xs leading-5 text-slate-500">Your password confirms this security change. It is never displayed or stored here.</p><button type="button" onClick={() => void startEnable()} disabled={loading || !password} className="mt-6 inline-flex h-11 items-center gap-2 rounded-lg bg-teal-300 px-5 text-sm font-semibold text-[#031010] transition hover:bg-teal-200 disabled:cursor-not-allowed disabled:opacity-50"><LockKeyhole className="h-4 w-4" />{loading ? "Preparing setup..." : "Enable 2FA"}</button></div>}
							{qrUri && !enabled && <div className="max-w-xl"><div className="mb-6"><p className="text-sm font-medium text-white">1. Add Modulus to your authenticator</p><p className="mt-2 text-sm leading-6 text-slate-400">Copy the setup URI below into your authenticator app, then enter the six-digit code it generates.</p></div><div className="rounded-xl border border-teal-300/15 bg-black/25 p-4"><div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-teal-200"><KeyRound className="h-4 w-4" />Setup URI</div><div className="mt-3 flex gap-2"><input readOnly value={qrUri} className="min-w-0 flex-1 rounded-lg border border-white/10 bg-[#08090d] px-3 py-2 text-xs text-slate-400 outline-none" /><button type="button" onClick={() => void copyUri()} className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs text-slate-300 transition hover:border-teal-300/40 hover:text-teal-200" aria-label="Copy setup URI">{copied ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}{copied ? "Copied" : "Copy"}</button></div></div><div className="mt-6"><label className="flex flex-col gap-2 text-sm font-medium text-slate-200">2. Enter the authentication code<input className="h-12 max-w-xs rounded-lg border border-white/10 bg-black/25 px-3 text-center text-lg tracking-[0.35em] text-white outline-none transition placeholder:text-slate-600 focus:border-teal-300/60 focus:ring-4 focus:ring-teal-300/10" inputMode="numeric" placeholder="000000" value={totpCode} onChange={(event) => setTotpCode(event.target.value)} /></label><button type="button" onClick={() => void confirmEnable()} disabled={loading || !totpCode} className="mt-5 h-11 rounded-lg bg-teal-300 px-5 text-sm font-semibold text-[#031010] transition hover:bg-teal-200 disabled:cursor-not-allowed disabled:opacity-50">{loading ? "Verifying..." : "Confirm and enable"}</button></div></div>}
							{enabled && backupCodes && <div className="max-w-xl"><div className="flex items-center gap-3 rounded-lg border border-emerald-300/20 bg-emerald-400/10 p-4 text-sm text-emerald-200"><Check className="h-5 w-5 shrink-0" />Two-factor authentication is now protecting your account.</div><div className="mt-6"><h3 className="font-medium text-white">Save your backup codes</h3><p className="mt-2 text-sm leading-6 text-slate-400">Each code can be used once if you lose access to your authenticator. Store them somewhere secure.</p><ul className="mt-4 grid gap-2 rounded-xl border border-white/10 bg-black/25 p-4 font-mono text-sm text-slate-300 sm:grid-cols-2">{backupCodes.map((code) => <li key={code} className="rounded bg-white/[.04] px-3 py-2">{code}</li>)}</ul></div></div>}
							{error && <p role="alert" className="mt-6 rounded-lg border border-rose-300/20 bg-rose-400/10 px-3 py-2 text-sm text-rose-200">{error}</p>}
						</div>
					</section>
				</div>
			</main>
		</div>
	);
}
