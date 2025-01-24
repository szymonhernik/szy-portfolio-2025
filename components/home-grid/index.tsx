import type { ProjectQueryResult } from "@/sanity.types";

import Image from "next/image";
import Link from "next/link";

export default function HomeGrid({
  projects,
}: {
  projects: ProjectQueryResult;
}) {
  return (
    <div className="grid grid-cols-1 gap-3 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
      {projects.map((project) => (
        // checks for _id and slug

        <Link key={project._id} href={`/projects/${project.slug}`} className="group block">
          <div className="flex h-full flex-col justify-end">
            {/* <div className="relative mb-4 w-full"> */}
            <div className="relative mb-4 w-full" style={{ aspectRatio: project.mainImage?.aspectRatio ?? "4 / 3" }}>
              {/* if not main image dont render the image at all */}
              <Image
                src={project.mainImage?.image ?? ""}
                alt={"TODO: temporary alt text"}
                className=""
                fill
                blurDataURL={project.mainImage?.lqip ?? ""}
                placeholder="blur"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="">
              <h3 className="">{project.title}</h3>
              {/* <p className="mt-0 text-secondary">{project.subtitle}</p> */}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
