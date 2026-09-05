import type { Reproduction } from "../../types/incident";
/** Renders reproduction attempts or the empty reproduction state. */
export function ReproductionList({ reproductions = [] }: { reproductions?: Reproduction[] }) {
	return <section className="rounded-lg border p-5"><h2 className="font-semibold">Reproductions</h2>{reproductions.length ? <ul className="mt-3 space-y-2 text-sm">{reproductions.map((item) => { const status = item.status ?? "Recorded"; return <li key={item.id} className="flex justify-between border-b pb-2"><span>{status}</span><time className="text-neutral-500">{new Date(item.createdAt).toLocaleString()}</time></li>; })}</ul> : <p className="mt-3 text-sm text-neutral-500">No reproduction attempts yet.</p>}</section>;
}