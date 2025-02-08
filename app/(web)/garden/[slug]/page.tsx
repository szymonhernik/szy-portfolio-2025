import type { SingleGardenItemQueryResult } from "@/sanity.types";

import { GardenBreadcrumb } from "@/components/breadcrumb/garden";
import * as FadeIn from "@/components/motion/staggers/fade";
import GardenItem from "@/components/screens/garden/gardenItem";
import { sanityFetch } from "@/sanity/lib/sanity.client";
import { generateStaticSlugs } from "@/sanity/loader/generateStaticSlugs";
import { singleGardenItemQuery } from "@/sanity/queries/page";

// export function generateStaticParams() {
//   // const slugs = ["1", "2", "3", "4", "5", "6"];
//   // return slugs.map((slug) => ({ id: slug }));
// }

export function generateStaticParams() {
  return generateStaticSlugs("gardenItem");
}

export default async function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const gardenItem: SingleGardenItemQueryResult = await sanityFetch({
    query: singleGardenItemQuery,
    tags: ["gardenItem"],
    qParams: { slug }, // add slug from next-js params
  });

  if (!gardenItem) {
    return <div>Item not found</div>;
  }

  return (
    <FadeIn.Container>
      <FadeIn.Item>
        <div className="">
          <GardenBreadcrumb title={gardenItem.title} />

          <GardenItem item={gardenItem} />
        </div>
      </FadeIn.Item>
    </FadeIn.Container>
  );
}
