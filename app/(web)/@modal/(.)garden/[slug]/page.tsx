import type { SingleGardenItemQueryResult } from "@/sanity.types";

import { sanityFetch } from "@/sanity/lib/sanity.client";
import { singleGardenItemQuery } from "@/sanity/queries/page";

import GardenClientModal from "./_components/GardenClientModal";

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const gardenItem: SingleGardenItemQueryResult = await sanityFetch({
    query: singleGardenItemQuery,
    tags: [`gardenItem`],
    qParams: { slug }, // add slug from next-js params
  });
  // return a simple modal with a close button and a title
  return <GardenClientModal slug={slug} gardenItem={gardenItem} />;
}
