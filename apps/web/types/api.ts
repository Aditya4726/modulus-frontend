export type ApiResponse<T> =
	| { success: true; data: T; nextCursor?: string }
	| { success: false; error: { code: string; message: string } };

export class ApiError extends Error {
	readonly code: string;

	constructor(code: string, message: string) {
		super(message);
		this.name = "ApiError";
		this.code = code;
	}
}

export interface PaginatedResponse<T> {
	items: T[];
	nextCursor: string | null;
}