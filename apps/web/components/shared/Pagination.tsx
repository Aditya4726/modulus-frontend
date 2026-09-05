import { Button } from "../ui/Button";

/** Renders a cursor-pagination load-more control when another page exists. */
export function Pagination({ nextCursor, loading, onNext }: { nextCursor: string | null; loading?: boolean; onNext: () => void }) {
	if (!nextCursor) return null;
	return <div className="mt-4"><Button type="button" onClick={onNext} disabled={loading}>{loading ? "Loading..." : "Load more"}</Button></div>;
}