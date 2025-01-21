import { projects } from "@/app/_test-data/projects-test";

export default function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const project = projects.find((project) => project.slug === slug);
  return (
    <div>
      Project page for {slug} with a title of {project?.title}
    </div>
  );
}
