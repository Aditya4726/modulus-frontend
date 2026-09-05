import { ApiError, type ApiResponse } from "../../types/api";
import { redirectToLogin } from "../auth-client";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

/** Sends an authenticated request and unwraps the successful API response data. */
export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
	const headers = new Headers(options.headers);

	if (options.body && !headers.has("Content-Type")) {
		headers.set("Content-Type", "application/json");
	}

	const response = await fetch(`${API_BASE_URL}${path}`, {
		...options,
		headers,
		credentials: "include",
	});

	if (response.status === 401) {
		redirectToLogin();
		throw new ApiError("UNAUTHORIZED", "Your session has expired. Please sign in again.");
	}

	let payload: ApiResponse<T>;

	try {
		payload = (await response.json()) as ApiResponse<T>;
	} catch {
		throw new ApiError("INVALID_RESPONSE", "The server returned an invalid response");
	}

	if (!payload.success) {
		throw new ApiError(payload.error.code, payload.error.message);
	}

	return payload.data;
}

/** Sends an authenticated request whose response contains cursor pagination metadata. */
export async function apiFetchPaginated<T>(path: string, options: RequestInit = {}): Promise<{ items: T[]; nextCursor: string | null }> {
	const response = await fetch(`${API_BASE_URL}${path}`, { ...options, credentials: "include" });

	if (response.status === 401) {
		redirectToLogin();
		throw new ApiError("UNAUTHORIZED", "Your session has expired. Please sign in again.");
	}

	let payload: ApiResponse<T[]>;

	try {
		payload = (await response.json()) as ApiResponse<T[]>;
	} catch {
		throw new ApiError("INVALID_RESPONSE", "The server returned an invalid response");
	}

	if (!payload.success) {
		throw new ApiError(payload.error.code, payload.error.message);
	}

	return { items: payload.data, nextCursor: payload.nextCursor ?? null };
}