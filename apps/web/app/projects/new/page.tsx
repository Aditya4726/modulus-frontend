import { CreateProjectForm } from "../../../components/projects/CreateProjectForm";

/** Renders the project creation route and its interactive form. */
export default function NewProjectPage() {
	return <main className="mx-auto max-w-xl p-8"><h1 className="text-3xl font-semibold">Create project</h1><p className="mt-2 text-neutral-500">Connect a project to begin observing agent activity.</p><CreateProjectForm /></main>;
}