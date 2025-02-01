import type { ProjectsAndSubprojectsQueryResult } from "@/sanity.types";

import { Footer } from "@/components/footer";
import TagsSearchPage from "@/components/screens/tags-search";
import { sanityFetch } from "@/sanity/lib/sanity.client";
import { projectsAndSubprojectsQuery } from "@/sanity/queries/page";

import { notFound } from "next/navigation";
import { Suspense } from "react";

export async function generateMetadata() {
  return {
    title: "Szymon Eda Hernik | Tags Search",
    description: "Search for projects by tags",
  };
}
export default async function Page() {
  const data: ProjectsAndSubprojectsQueryResult = await sanityFetch({
    query: projectsAndSubprojectsQuery,
    tags: ["project", "subproject"],
  });
  if (!data) {
    return notFound();
  }
  return (
    <Suspense fallback={<div>🌱</div>}>
      <TagsSearchPage data={data} />
      <Footer />
    </Suspense>
  );
}
