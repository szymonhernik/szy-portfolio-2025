import { projects } from "@/app/_test-data/projects-test";

import Image from "next/image";
import Link from "next/link";

export default function HomeGrid() {
  return (
    <div className="grid grid-cols-1 gap-3 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
      {projects.map((project) => (
        <Link key={project.id} href={`/projects/${project.slug}`} className="group block">
          <div className="flex h-full flex-col justify-end">
            <div className="relative mb-4 w-full" style={{ aspectRatio: project.aspectRatio }}>
              <Image src={project.imageUrl || "/placeholder.svg"} alt={project.title} fill className="" />
            </div>
            <div className="">
              <h3 className="">{project.title}</h3>
              <p className="mt-0 text-secondary">{project.subtitle}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
