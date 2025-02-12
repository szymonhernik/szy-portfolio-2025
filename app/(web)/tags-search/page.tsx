import type { ProjectsAndSubprojectsQueryResult } from "@/sanity.types";

import * as FadeIn from "@/components/motion/staggers/fade";
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
    <FadeIn.Container>
      <FadeIn.Item>
        <Suspense fallback={<div>🌱</div>}>
          <main className="mb-X p-4">
            <TagsSearchPage data={data} />
          </main>
        </Suspense>
      </FadeIn.Item>
    </FadeIn.Container>
  );
}
