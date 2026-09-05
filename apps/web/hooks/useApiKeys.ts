"use client";

import { useEffect, useState } from "react";
import { createApiKey, listApiKeys, revokeApiKey } from "../lib/api/projects";
import type { CreatedProjectKey, ProjectKey } from "../types/project";

/** Loads, creates, and revokes masked project API keys. */
export function useApiKeys(projectId: string) {
	const [keys, setKeys] = useState<ProjectKey[]>([]);
	const [createdKey, setCreatedKey] = useState<CreatedProjectKey | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);
	useEffect(() => {
		let active = true;

		async function loadKeys() {
			try {
				const values = await listApiKeys(projectId);
				if (active) setKeys(values);
			} catch (value) {
				if (active) setError(value as Error);
			}
		}

		void loadKeys();
		return () => { active = false; };
	}, [projectId]);
	async function createKey() {
		setLoading(true);
		setError(null);
		try {
			const key = await createApiKey(projectId);
			setCreatedKey(key);
			setKeys((current) => [...current, key]);
			return key;
		} catch (value) {
			const reason = value instanceof Error ? value : new Error("Unable to create API key.");
			setError(reason);
			throw reason;
		} finally {
			setLoading(false);
		}
	}
	async function revokeKey(keyId: string) {
		setLoading(true);
		setError(null);
		try {
			await revokeApiKey(projectId, keyId);
			setKeys((current) => current.filter((key) => key.id !== keyId));
		} catch (value) {
			setError(value instanceof Error ? value : new Error("Unable to revoke API key."));
		} finally {
			setLoading(false);
		}
	}
	return { keys, createdKey, setCreatedKey, loading, error, createKey, revokeKey };
}