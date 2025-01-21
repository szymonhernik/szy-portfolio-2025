import { projects } from "@/app/_test-data/projects-test";
import ProjectPage from "@/components/screens/project";

import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const project = projects.find((project) => project.slug === slug);

  if (!project) {
    return notFound();
  }

  return <ProjectPage project={project} />;
}
