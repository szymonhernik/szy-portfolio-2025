import type { GridItem } from "@/app/(web)/_test-data/projects-test";

export default function ProjectPage({ project }: { project: GridItem }) {
  return (
    <article className="grid grid-cols-12 items-start">
      <div className="col-span-10 lg:col-span-7">
        <h1 className="text-large">{project?.title}</h1>
        <p className="text-[16px] text-secondary">Web Design, Full-Stack Development, Wordpress, Editorial Design, Graphic Design</p>
      </div>
    </article>
  );
}
