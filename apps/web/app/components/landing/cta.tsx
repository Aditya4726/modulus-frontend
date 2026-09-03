import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTA() {
	return (
		<section className="bg-white py-24">
			<div className="max-w-5xl mx-auto px-6">
				<div className="relative overflow-hidden rounded-2xl bg-blue-600 px-8 py-16 sm:px-16 text-center">
					<div className="relative">
						<h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
							Give your agents a reliability engineer.
						</h2>
						<p className="text-white/80 text-base mt-4 max-w-md mx-auto">
							Instrument your first agent in minutes. See your first trace
							today.
						</p>
						<div className="flex flex-wrap items-center justify-center gap-3 mt-8">
							<Link
								href="/register"
								className="flex items-center gap-2 bg-white text-blue-700 font-semibold text-sm px-5 py-3 rounded-md hover:bg-blue-50 transition"
							>
								Start free
								<ArrowRight className="w-4 h-4" />
							</Link>
							<Link
								href="/login"
								className="flex items-center gap-2 border border-white/30 text-white font-semibold text-sm px-5 py-3 rounded-lg hover:bg-white/10 transition"
							>
								Log in
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}