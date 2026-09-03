export type ApiResponse<T> = {
	success: boolean;
	data?: T;
	nextCursor?: string | null;
	error?: { message?: string };
};

export async function apiFetch<T>(
	path: string,
	options: RequestInit = {},
): Promise<ApiResponse<T>> {
	const response = await fetch(path, {
		...options,
		credentials: "include",
		headers: {
			...(options.body ? { "Content-Type": "application/json" } : {}),
			...options.headers,
		},
	});

	const payload = (await response.json()) as ApiResponse<T>;
	if (!response.ok && !payload.error) {
		throw new Error(`Request failed with status ${response.status}`);
	}

	return payload;
}
