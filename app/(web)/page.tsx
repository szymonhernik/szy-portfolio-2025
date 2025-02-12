import type { ProjectQueryResult } from "@/sanity.types";

import { Footer } from "@/components/footer";
import * as FadeIn from "@/components/motion/staggers/fade";
import Home from "@/components/screens/home";
import { sanityFetch } from "@/sanity/lib/sanity.client";
import { projectQuery } from "@/sanity/queries/page";

import RandomAnimation from "./_components/RandomAnimation";

export async function generateMetadata() {
  return {
    title: "Szymon Eda Hernik | Projects",
    description:
      "Szymon Eda Hernik is a graphic designer and front-end web developer.They also form half of isz szi studio, an artistic design studio based in Brussels.",
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
      <RandomAnimation expectedPath="/" />
      <FadeIn.Container>
        <FadeIn.Item>
          <main className="p-4">
            <Home showcaseProjects={projects.showcaseProjects} />
          </main>
          <Footer />
        </FadeIn.Item>
      </FadeIn.Container>
    </>
  );
}
