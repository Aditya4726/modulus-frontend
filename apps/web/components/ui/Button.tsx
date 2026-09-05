import type { ButtonHTMLAttributes, ReactNode } from "react";

/** Renders the shared neutral action button with disabled-state styling. */
export function Button({ children, className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) {
	const buttonClassName = `rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-50 ${className}`;
	return <button className={buttonClassName} {...props}>{children}</button>;
}