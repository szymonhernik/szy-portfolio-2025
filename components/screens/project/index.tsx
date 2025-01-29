import type { SingleProjectQueryResult } from "@/sanity.types";
import type { CarouselBlock } from "@/types/blocks";

import Blocks from "@/components/blocks";
import FullScreenCarousel from "@/components/FullScreenCarousel";
import PortableTextRenderer from "@/components/portable-text-renderer";
import { CarouselProvider } from "@/contexts/CarouselContext";

import Link from "next/link";

export default function ProjectPage({
  project,
}: {
  project: NonNullable<SingleProjectQueryResult>;
}) {
  // When the project page loads, it collects ALL slides from ALL carousels (both main project and subprojects)
  const getAllSlides = () => {
    const slides: (NonNullable<CarouselBlock["items"]>[number] & {
      defaultCaption?: string;
    })[] = [];

    // Collect slides from main project blocks
    if (project.blocks) {
      for (const block of project.blocks) {
        if (block._type === "carousel" && block.items) {
          const slidesWithCaption = block.items.map((slide) => ({
            ...slide,
            defaultCaption: block.defaultCaption ?? undefined,
          }));
          slides.push(...slidesWithCaption);
        }
      }
    }

    // Collect slides from subprojects
    if (project.subprojects) {
      for (const subproject of project.subprojects) {
        if (subproject.blocks) {
          for (const block of subproject.blocks) {
            if (block._type === "carousel" && block.items) {
              // Add caption to each slide from this carousel
              const slidesWithCaption = block.items.map((slide) => ({
                ...slide,
                defaultCaption: block.defaultCaption || undefined,
              }));

              slides.push(...slidesWithCaption);
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
            <h1 className="text-fluid-xl">{project.title}</h1>
            {/* if project has subprojects dont check categories on project but on subprojects and combine them into an array */}
            {project.hasSubprojects &&
            project.subprojects &&
            project.subprojects.length > 0 ? (
              <div className="text-secondary text-sm ">
                {project.subprojects
                  .flatMap((subproject) => subproject.categories)
                  .filter(
                    (category): category is NonNullable<typeof category> =>
                      category !== null,
                  )
                  .map((category, index, array) => (
                    <>
                      <Link
                        href={`/tags-search?q=${category.slug}`}
                        key={category.slug}
                      >
                        {category.title}
                      </Link>
                      {index < array.length - 1 ? ", " : ""}
                    </>
                  ))}
              </div>
            ) : (
              project.categories && (
                <div className="text-secondary text-sm lg:text-xs">
                  {project.categories.map((category, index, array) => (
                    <>
                      <Link
                        href={`/tags-search?q=${category.slug}`}
                        key={category.slug}
                      >
                        {category.title}
                      </Link>
                      {index < array.length - 1 ? ", " : ""}
                    </>
                  ))}
                </div>
              )
            )}
            {project.body && <PortableTextRenderer value={project.body} />}
          </section>
          {/* ignore ts warning in the line below */}
          {/* @ts-ignore */}
          {project.blocks && <Blocks blocks={project.blocks} />}
          {project.hasSubprojects &&
            project.subprojects &&
            project.subprojects.length > 0 &&
            project.subprojects.map((subproject) => (
              <Subproject key={subproject._id} subproject={subproject} />
            ))}
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
  subproject: NonNullable<
    NonNullable<SingleProjectQueryResult>["subprojects"]
  >[number];
}) {
  return (
    <div
      id={
        subproject.slug && subproject.slug !== "" ? subproject.slug : undefined
      }
    >
      {/* @ts-ignore */}
      {subproject.blocks && <Blocks blocks={subproject.blocks} />}
    </div>
  );
}
