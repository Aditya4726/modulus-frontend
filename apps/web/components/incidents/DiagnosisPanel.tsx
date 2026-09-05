import type { Diagnosis } from "../../types/incident";

/** Renders the current diagnosis summary or its empty state. */
export function DiagnosisPanel({ diagnosis }: { diagnosis?: Diagnosis | null }) {
	const summary = diagnosis?.summary ?? diagnosis?.rootCause ?? "No diagnosis available yet.";
	return <section className="rounded-lg border p-5"><h2 className="font-semibold">Diagnosis</h2><p className="mt-3 whitespace-pre-wrap text-sm text-neutral-600">{summary}</p></section>;
}