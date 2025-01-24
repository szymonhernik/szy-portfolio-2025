import type { SingleProjectQueryResult } from "@/sanity.types";

import ProjectPage from "@/components/screens/project";
import { singleProjectQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/sanity.client";

import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { slug: string } }) {
  // const slug = params.slug;
  // Revalidate document when "project" is changed
  const project: SingleProjectQueryResult = await sanityFetch({
    query: singleProjectQuery,
    tags: ["project"],
    qParams: { slug: params.slug }, // add slug from next-js params
  });

  if (!project) {
    return notFound();
  }

  return <ProjectPage project={project} />;
}
