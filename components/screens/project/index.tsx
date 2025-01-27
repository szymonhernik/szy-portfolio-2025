import type { SingleProjectQueryResult } from "@/sanity.types";
import type { CarouselBlock } from "@/types/blocks";

import FullScreenCarousel from "@/components/FullScreenCarousel";
import Blocks from "@/components/blocks";
import PortableTextRenderer from "@/components/portable-text-renderer";
import { CarouselProvider } from "@/contexts/CarouselContext";

export default function ProjectPage({
  project,
}: {
  project: NonNullable<SingleProjectQueryResult>;
}) {
  // When the project page loads, it collects ALL slides from ALL carousels (both main project and subprojects)
  const getAllSlides = () => {
    const slides: CarouselBlock["items"] = [];

    // Collect slides from main project blocks
    if (project.blocks) {
      for (const block of project.blocks) {
        if (block._type === "carousel" && block.items) {
          slides.push(...block.items);
        }
      }
    }

    // Collect slides from subprojects
    if (project.subprojects) {
      for (const subproject of project.subprojects) {
        if (subproject.blocks) {
          for (const block of subproject.blocks) {
            if (block._type === "carousel" && block.items) {
              slides.push(...block.items);
            }
          }
        }
      }
    }

    return slides;
  };

  return (
    <CarouselProvider initialSlides={getAllSlides()}>
      <article className="grid grid-cols-12 items-start">
        <div className="col-span-12 flex flex-col gap-24 lg:col-span-7">
          <section className="">
            <h1 className="text-large">{project.title}</h1>
            {project.categories && <div className="text-secondary text-sm">{project.categories.map((category) => category.title).join(", ")}</div>}
            {project.body && <PortableTextRenderer value={project.body} />}
          </section>
          {/* ignore ts warning in the line below */}
          {/* @ts-ignore */}
          {project.blocks && <Blocks blocks={project.blocks} />}
          {project.hasSubprojects &&
            project.subprojects &&
            project.subprojects.length > 0 &&
            project.subprojects.map((subproject) => <Subproject key={subproject._id} subproject={subproject} />)}
          {/* <p className="text-[16px] text-secondary">Web Design, Full-Stack Development, Wordpress, Editorial Design, Graphic Design</p> */}
        </div>
      </article>
      <FullScreenCarousel />
    </CarouselProvider>
  );
}

function Subproject({
  subproject,
}: {
  subproject: NonNullable<NonNullable<SingleProjectQueryResult>["subprojects"]>[number];
}) {
  return (
    <>
      {/* @ts-ignore */}
      {subproject.blocks && <Blocks blocks={subproject.blocks} />}
    </>
  );
}
