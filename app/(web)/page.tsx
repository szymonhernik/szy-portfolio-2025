import type { ProjectQueryResult } from "@/sanity.types";

import Home from "@/components/screens/home";
import { sanityFetch } from "@/sanity/lib/sanity.client";
import { projectQuery } from "@/sanity/queries/page";

export default async function Page() {
  const projects: ProjectQueryResult = await sanityFetch({
    query: projectQuery,
    // You can add multiple tags that matches with your document _id: ['post', 'about', ...]
    tags: ["project"],
  });
  return <Home projects={projects} />;
}
