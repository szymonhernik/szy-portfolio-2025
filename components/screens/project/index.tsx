import type { SingleProjectQueryResult } from "@/sanity.types";

export default function ProjectPage({
  project,
}: {
  project: NonNullable<SingleProjectQueryResult>;
}) {
  return (
    <article className="grid grid-cols-12 items-start">
      <div className="col-span-10 lg:col-span-7">
        <h1 className="text-large">{project.title}</h1>
        {/* <p className="text-[16px] text-secondary">Web Design, Full-Stack Development, Wordpress, Editorial Design, Graphic Design</p> */}
      </div>
    </article>
  );
}
