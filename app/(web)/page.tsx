import type { ProjectQueryResult } from "@/sanity.types";

import Home from "@/components/screens/home";
import { projectQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/sanity.client";

export default async function Page() {
  const projects: ProjectQueryResult = await sanityFetch({
    query: projectQuery,
    // You can add multiple tags that matches with your document _id: ['post', 'about', ...]
    tags: ["project"],
  });
  return <Home projects={projects} />;
}
