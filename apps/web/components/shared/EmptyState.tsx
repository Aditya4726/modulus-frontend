/** Renders a neutral empty-state message for collections and panels. */
export function EmptyState({ title, message }: { title: string; message?: string }) {
	return <div className="rounded-lg border border-dashed border-neutral-300 p-10 text-center"><h3 className="font-medium">{title}</h3>{message && <p className="mt-1 text-sm text-neutral-500">{message}</p>}</div>;
}