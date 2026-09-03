import Link from "next/link";
import { ArrowLeft, CheckCircle2, Clock3, Play, Wrench } from "lucide-react";

export default async function ExecutionDetailsPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	return (
		<div className="space-y-6">
			<Link
				href="/dashboard/executions"
				className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600"
			>
				<ArrowLeft className="h-4 w-4" />
				Back to Executions
			</Link>

			<div>
				<p className="font-mono text-xs text-slate-400">{id}</p>
				<h1 className="mt-1 text-2xl font-bold text-slate-900">Execution details</h1>
				<p className="mt-1 text-sm text-slate-500">Inspect the captured agent run and its tool calls.</p>
			</div>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
				<DetailCard label="Status" value="Success" icon={<CheckCircle2 className="h-4 w-4 text-green-600" />} />
				<DetailCard label="Duration" value="1.8s" icon={<Clock3 className="h-4 w-4 text-blue-600" />} />
				<DetailCard label="Tool calls" value="4" icon={<Wrench className="h-4 w-4 text-blue-600" />} />
			</div>

			<div className="rounded-xl border border-slate-200 bg-white p-6">
				<div className="flex items-center gap-2">
					<Play className="h-4 w-4 text-blue-600" />
					<h2 className="font-semibold text-slate-900">Execution trace</h2>
				</div>
				<p className="mt-3 text-sm text-slate-500">Trace events for this execution will appear here.</p>
			</div>
		</div>
	);
}

function DetailCard({
	label,
	value,
	icon,
}: {
	label: string;
	value: string;
	icon: React.ReactNode;
}) {
	return (
		<div className="rounded-xl border border-slate-200 bg-white p-5">
			<div className="flex items-center justify-between text-sm text-slate-500">
				{label}
				{icon}
			</div>
			<p className="mt-3 text-xl font-bold text-slate-900">{value}</p>
		</div>
	);
}
