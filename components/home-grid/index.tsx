import type { ProjectQueryResult, ProjectsAndSubprojectsQueryResult } from "@/sanity.types";

import Image from "next/image";
import Link from "next/link";

export default function HomeGrid({
  showcaseProjects,
  from,
}: {
  showcaseProjects: NonNullable<ProjectQueryResult>["showcaseProjects"] | ProjectsAndSubprojectsQueryResult;
  from?: string;
}) {
  return (
    <div className="grid grid-cols-1 gap-3 gap-y-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {showcaseProjects &&
        showcaseProjects.length > 0 &&
        showcaseProjects.map((project) => {
          // Determine the correct href based on project type and context
          const href =
            from === "tags-search"
              ? (project as ProjectsAndSubprojectsQueryResult[number])._type === "subproject"
                ? `/projects/${(project as ProjectsAndSubprojectsQueryResult[number]).parentSlug}#${project.slug}`
                : `/projects/${project.slug}`
              : `/projects/${project.slug}`;

          return (
            <Link key={project._id} href={href} className="">
              <div className="flex h-full flex-col justify-end ">
                <div
                  className="relative mb-4 w-full"
                  style={{
                    aspectRatio: project.mainImage?.aspectRatio ?? "4 / 3",
                  }}
                >
                  <Image
                    src={project.mainImage?.image ?? ""}
                    alt={"TODO: temporary alt text"}
                    className="saturate-0 transition-all duration-300 hover:saturate-100"
                    fill
                    blurDataURL={project.mainImage?.lqip ?? ""}
                    placeholder="blur"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="">
                  <h3 className="group-hover:font-outline-1-black">{project.title}</h3>
                  {project.subtitle && <p className="mt-0 text-secondary ">{project.subtitle}</p>}
                </div>
              </div>
            </Link>
          );
        })}
    </div>
  );
}
