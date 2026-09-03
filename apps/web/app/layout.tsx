import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700", "800"],
	variable: "--font-jakarta",
	display: "swap",
});

export const metadata: Metadata = {
	title: "Modulus — Agent reliability engineering",
	description:
		"Modulus watches every agent execution, catches failures the moment they happen, and walks the whole way to a reviewed pull request — automatically.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={jakarta.variable}>
			<body className="font-(family-name:--font-jakarta) antialiased bg-white text-slate-900">
				{children}
			</body>
		</html>
	);
}