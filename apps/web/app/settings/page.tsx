import Link from "next/link";
import { Bell, Palette, ShieldCheck, UserRound } from "lucide-react";

const settings = [
	{ title: "Profile", description: "Your name, email, and account identity.", href: "/settings/profile", icon: UserRound },
	{ title: "Security", description: "Two-factor authentication and account protection.", href: "/settings/security", icon: ShieldCheck },
	{ title: "Notifications", description: "Choose when Modulus should alert your team.", href: "/settings/notifications", icon: Bell },
	{ title: "Appearance", description: "Tune the workspace display and density.", href: "/settings/appearance", icon: Palette },
];
export default function SettingsPage() { return <div className="mx-auto flex max-w-5xl flex-col gap-8"><div><p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-600">Preferences</p><h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">Settings</h1><p className="mt-1 text-sm text-slate-500">Configure your Modulus workspace and account.</p></div><div className="grid gap-4 sm:grid-cols-2">{settings.map(({ title, description, href, icon: Icon }) => <Link key={title} href={href} className="group rounded-xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-sm"><Icon className="h-5 w-5 text-blue-600" /><h2 className="mt-5 font-semibold text-slate-900">{title}</h2><p className="mt-1 text-sm text-slate-500">{description}</p></Link>)}</div></div>; }
