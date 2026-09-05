"use client";

import { useState } from "react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import type { CreatedProjectKey } from "../../types/project";
/** Reveals a newly created raw API key exactly once and supports copying it. */
export function ApiKeyRevealModal({ apiKey, onClose }: { apiKey: CreatedProjectKey; onClose: () => void }) {
	const [copied, setCopied] = useState(false);

	async function copyKey() {
		await navigator.clipboard.writeText(apiKey.rawKey);
		setCopied(true);
	}

	return <Modal title="Copy your API key now" onClose={onClose}><p className="text-sm text-amber-700">This raw key is shown exactly once. It cannot be recovered after closing this dialog.</p><code className="mt-4 block break-all rounded bg-neutral-100 p-3 text-sm">{apiKey.rawKey}</code><div className="mt-4 flex gap-2"><Button type="button" onClick={() => void copyKey()}>{copied ? "Copied" : "Copy key"}</Button><Button type="button" className="bg-white text-neutral-900 ring-1 ring-neutral-300" onClick={onClose}>Done</Button></div></Modal>;
}