import type { SingleGardenItemQueryResult } from "@/sanity.types";

import { GardenBreadcrumb } from "@/components/breadcrumb/garden";
import GardenItem from "@/components/screens/garden/gardenItem";
import { sanityFetch } from "@/sanity/lib/sanity.client";
import { singleGardenItemQuery } from "@/sanity/queries/page";

// export function generateStaticParams() {
//   // const slugs = ["1", "2", "3", "4", "5", "6"];
//   // return slugs.map((slug) => ({ id: slug }));
// }

export default async function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const gardenItem: SingleGardenItemQueryResult = await sanityFetch({
    query: singleGardenItemQuery,
    tags: [`gardenItem:${params.slug}`],
    qParams: { slug }, // add slug from next-js params
  });

  if (!gardenItem) {
    return <div>Item not found</div>;
  }

  return (
    <div className="">
      <GardenBreadcrumb title={gardenItem.title} />

      <GardenItem item={gardenItem} />
    </div>
  );
}
