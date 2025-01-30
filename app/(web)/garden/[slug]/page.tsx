import type { SingleGardenItemQueryResult } from "@/sanity.types";

import GardenItem from "@/app/(web)/@modal/_components/GardenItem";
import { sanityFetch } from "@/sanity/lib/sanity.client";
import { singleGardenItemQuery } from "@/sanity/queries/page";

export const dynamicParams = false;

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
    <div>
      <div>
        <a href="/garden">garden</a>{" "}
        <span>
          <span>→</span>
        </span>{" "}
        <span>{gardenItem.title}</span>
      </div>
      {/* TODO: render garden blocks */}
      <GardenItem params={{ slug }} />
    </div>
  );
}
