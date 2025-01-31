import type { GardenItemsQueryResult } from "@/sanity.types";

import { GardenItems } from "@/app/(web)/_components/GardenItems";
import { sanityFetch } from "@/sanity/lib/sanity.client";
import { gardenItemsQuery } from "@/sanity/queries/page";

import { Suspense } from "react";

export default async function Page() {
  const gardenItems: GardenItemsQueryResult = await sanityFetch({
    query: gardenItemsQuery,
    tags: ["gardenItem"],
  });

  return (
    <Suspense>
      <GardenItems mode="static" items={gardenItems} />
    </Suspense>
  );
}
