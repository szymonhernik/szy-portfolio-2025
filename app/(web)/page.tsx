import type { ProjectQueryResult } from "@/sanity.types";

import { Footer } from "@/components/footer";
import Home from "@/components/screens/home";
import { sanityFetch } from "@/sanity/lib/sanity.client";
import { projectQuery } from "@/sanity/queries/page";

export async function generateMetadata() {
  return {
    title: "Szymon Eda Hernik | Projects",
  };
}
export default async function Page() {
  const projects: ProjectQueryResult = await sanityFetch({
    query: projectQuery,
    // You can add multiple tags that matches with your document _id: ['post', 'about', ...]
    tags: ["project", "settings"],
  });
  if (!projects) {
    return <div>No projects found</div>;
  }
  return (
    <>
      <Home showcaseProjects={projects.showcaseProjects} />
      <Footer />
    </>
  );
}
