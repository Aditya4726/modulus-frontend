import { redirect } from "next/navigation";

/** Sends users to project selection before opening a real project dashboard. */
export default function DashboardPage() {
	redirect("/projects");
}
