import type { SingleProjectQueryResult } from "@/sanity.types";

import ProjectPage from "@/components/screens/project";
import { sanityFetch } from "@/sanity/lib/sanity.client";
import { singleProjectQuery } from "@/sanity/queries/page";

import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { slug: string } }) {
  // const slug = params.slug;
  // Revalidate document when "project" is changed
  const project: SingleProjectQueryResult = await sanityFetch({
    query: singleProjectQuery,
    tags: [`project:${params.slug}`],
    qParams: { slug: params.slug }, // add slug from next-js params
  });

  if (!project) {
    return notFound();
  }

  return <ProjectPage project={project} />;
}
