import { Radar } from "lucide-react";

export function Logo({ className }: { className?: string }) {
	return (
		<span
			className={`rounded-lg bg-blue-600 flex items-center justify-center shrink-0 ${
				className ?? "w-9 h-9"
			}`}
		>
			<Radar className="w-[55%] h-[55%] text-white" strokeWidth={2.4} />
		</span>
	);
}