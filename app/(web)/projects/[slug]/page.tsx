import type { SingleProjectQueryResult } from "@/sanity.types";
import type { Metadata, ResolvingMetadata } from "next";
import type { Image } from "sanity";

import ProjectPage from "@/components/screens/project";
import { sanityFetch } from "@/sanity/lib/sanity.client";
import { urlForOpenGraphImage } from "@/sanity/lib/utils";
import { generateStaticSlugs } from "@/sanity/loader/generateStaticSlugs";
import { singleProjectQuery } from "@/sanity/queries/page";

import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};
export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const params = await props.params;
  const project: SingleProjectQueryResult = await sanityFetch({
    query: singleProjectQuery,
    tags: [`project:${params.slug}`],
    qParams: { slug: params.slug }, // add slug from next-js params
  });
  const ogImage = project?.mainImage
    ? urlForOpenGraphImage(project.mainImage as Image)
    : undefined;

  return {
    title: `${project?.title} | Szymon Eda Hernik`,
    description: project?.seoOverview,
    openGraph: ogImage
      ? {
          images: [ogImage, ...((await parent).openGraph?.images || [])],
        }
      : {},
  };
}
export function generateStaticParams() {
  // log whatever is returned by generateStaticSlugs
  return generateStaticSlugs("project");
}

export default async function Page({ params }: { params: { slug: string } }) {
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
