"use client";

import {
	createContext,
	createElement,
	useContext,
	type ReactNode,
} from "react";
import { createAuthClient } from "better-auth/react";
import { twoFactorClient } from "better-auth/client/plugins";

const API_URL =
	process.env.NEXT_PUBLIC_API_URL ??
	process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_URL) {
	throw new Error("NEXT_PUBLIC_API_URL is not configured");
}

export const authClient = createAuthClient({
	baseURL: API_URL,

	fetchOptions: {
		credentials: "include",
	},

	plugins: [twoFactorClient()],
});

type SessionData = NonNullable<
	ReturnType<typeof authClient.useSession>["data"]
>;

export type AuthUser = SessionData["user"];

interface AuthContextValue {
	user: AuthUser | null;
	isPending: boolean;
	login: (
		email: string,
		password: string,
	) => ReturnType<typeof authClient.signIn.email>;
	logout: () => Promise<void>;
	refresh: () => Promise<void>;
	redirectToLogin: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
	const session = authClient.useSession();

	async function login(email: string, password: string) {
		return authClient.signIn.email({
			email,
			password,
		});
	}

	async function logout() {
		await authClient.signOut();
		await session.refetch();
	}

	async function refresh() {
		await session.refetch();
	}

	function redirectToLogin() {
		if (
			typeof window !== "undefined" &&
			window.location.pathname !== "/login"
		) {
			window.location.assign("/login");
		}
	}

	const contextValue: AuthContextValue = {
		user: session.data?.user ?? null,
		isPending: session.isPending,
		login,
		logout,
		refresh,
		redirectToLogin,
	};

	return createElement(
		AuthContext.Provider,
		{ value: contextValue },
		children,
	);
}

export function useAuth() {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error("useAuth must be used within AuthProvider");
	}

	return context;
}

export function redirectToLogin() {
	if (
		typeof window !== "undefined" &&
		window.location.pathname !== "/login"
	) {
		window.location.assign("/login");
	}
}
