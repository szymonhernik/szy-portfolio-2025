import type { SingleProjectQueryResult } from "@/sanity.types";

import { FullCarouselModal } from "@/components/FullCarouselModal";
import Blocks from "@/components/blocks";
import { Footer } from "@/components/footer";
import * as FadeIn from "@/components/motion/staggers/fade";
import PortableTextRenderer from "@/components/portable-text-renderer";
import TagLink from "@/components/tag-link";
import { CarouselProvider } from "@/contexts/CarouselContext";
import type { CarouselBlock } from "@/types/blocks";

import Link from "next/link";

// export default function ProjectPage({
//   project,
// }: {
//   project: NonNullable<SingleProjectQueryResult>;
// }) {
//   const currentProjectIndex = project.showcaseProjects?.findIndex(
//     (showcaseProject) => showcaseProject.slug === project.slug,
//   );

//   // if the current project index is the last in the array get the first one
//   const nextProject =
//     currentProjectIndex === undefined ||
//     currentProjectIndex === (project.showcaseProjects?.length ?? 0) - 1
//       ? project.showcaseProjects?.[0]
//       : project.showcaseProjects?.[currentProjectIndex + 1];

//   return (
//     <CarouselProvider>
//       <main className="relative px-4 grid grid-cols-12 ">
//         <div className="col-span-7 items-start py-4">
//           <div className="col-span-12 flex flex-col gap-X lg:col-span-7">
//             <section className="">
//               <h1 className="text-fluid-xl max-md:pr-6">{project.title}</h1>

//               {project.body && <PortableTextRenderer value={project.body} />}
//             </section>
//             {project.blocks && <Blocks blocks={project.blocks} />}
//             {project.hasSubprojects &&
//               project.subprojects &&
//               project.subprojects.length > 0 &&
//               project.subprojects.map((subproject) => (
//                 <Subproject key={subproject._id} subproject={subproject} />
//               ))}
//           </div>
//         </div>
//         <div className="sticky top-0 right-0 left-auto text-right flex flex-col col-span-5 pb-2 justify-end h-screen ">
//           {nextProject && (
//             <div>
//               Next:{" "}
//               <Link
//                 href={`/projects/${nextProject.slug}`}
//                 className="text-secondary hover:font-outline-1-secondary"
//               >
//                 {nextProject.title}
//               </Link>
//             </div>
//           )}
//         </div>
//       </main>

//       <Footer className="max-lg:mt-4 col-span-12" />
//     </CarouselProvider>
//   );
// }

export default function ProjectPage({
  project,
}: {
  project: NonNullable<SingleProjectQueryResult>;
}) {
  const currentProjectIndex = project.showcaseProjects?.findIndex((showcaseProject) => showcaseProject.slug === project.slug);

  // if the current project index is the last in the array get the first one
  const nextProject =
    currentProjectIndex === undefined || currentProjectIndex === (project.showcaseProjects?.length ?? 0) - 1
      ? project.showcaseProjects?.[0]
      : project.showcaseProjects?.[currentProjectIndex + 1];

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
            if ("_type" in block && block._type === "carousel" && block.items) {
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
      <FadeIn.Container>
        <FadeIn.Item>
          <main className="relative grid grid-cols-12 px-4 ">
            <article className="col-span-12 flex flex-col gap-X py-4 lg:col-span-7">
              <section className="">
                <h1 className="text-fluid-xl max-md:pr-6">{project.title}</h1>
                {/* if project has subprojects dont check categories on project but on subprojects and combine them into an array */}
                {project.hasSubprojects && project.subprojects && project.subprojects.length > 0 ? (
                  <div className="text-secondary max-md:pr-6 sm:text-small lg:text-small-md">
                    {project.subprojects
                      .flatMap((subproject) => subproject.categories)
                      .filter((category): category is NonNullable<typeof category> => category !== null)
                      .map((category, index, array) => (
                        <>
                          {/* biome-ignore lint/style/noNonNullAssertion: this is not null */}
                          <TagLink slug={category.slug!} key={category.slug}>
                            {category.title}
                          </TagLink>
                          {index < array.length - 1 ? ", " : ""}
                        </>
                      ))}
                  </div>
                ) : (
                  project.categories && (
                    <div className="text-secondary max-md:pr-6 sm:text-small lg:text-small-md">
                      {project.categories.map((category, index, array) => (
                        <>
                          {/* biome-ignore lint/style/noNonNullAssertion: this is not null */}
                          <TagLink slug={category.slug!} key={category.slug}>
                            {category.title}
                          </TagLink>
                          {index < array.length - 1 ? ", " : ""}
                        </>
                      ))}
                    </div>
                  )
                )}
                {project.body && <PortableTextRenderer value={project.body} />}
              </section>

              {/* @ts-ignore */}
              {project.blocks && <Blocks blocks={project.blocks} />}
              {project.hasSubprojects &&
                project.subprojects &&
                project.subprojects.length > 0 &&
                project.subprojects.map((subproject) => <Subproject key={subproject._id} subproject={subproject} />)}
            </article>
            <div className="col-span-12 max-lg:mt-X max-lg:text-fluid-lg lg:sticky lg:top-0 lg:col-span-5 lg:flex lg:h-screen lg:flex-col lg:justify-end lg:pb-4 lg:text-right">
              {nextProject && (
                <div>
                  Next:{" "}
                  <Link href={`/projects/${nextProject.slug}`} className="text-secondary hover:font-outline-1-secondary">
                    {nextProject.title}
                  </Link>
                </div>
              )}
            </div>
          </main>
        </FadeIn.Item>
      </FadeIn.Container>

      <Footer className="max-lg:mt-4" />

      <FullCarouselModal />
    </CarouselProvider>
  );
}

function Subproject({
  subproject,
}: {
  subproject: NonNullable<NonNullable<SingleProjectQueryResult>["subprojects"]>[number];
}) {
  return (
    <div id={subproject.slug && subproject.slug !== "" ? subproject.slug : undefined}>
      {/* @ts-ignore */}
      {subproject.blocks && <Blocks blocks={subproject.blocks} />}
    </div>
  );
}
