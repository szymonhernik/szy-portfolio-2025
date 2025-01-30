import type { GardenItemsQueryResult } from "@/sanity.types";

import { GardenItems } from "@/app/(web)/_components/GardenItems";
import { sanityFetch } from "@/sanity/lib/sanity.client";
import { gardenItemsQuery } from "@/sanity/queries/page";

import { redirect } from "next/navigation";

export default async function Page(props: {
  params: Promise<{ item: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;

  const { item } = searchParams as { [key: string]: string };
  const gardenItems: GardenItemsQueryResult = await sanityFetch({
    query: gardenItemsQuery,
    tags: ["gardenItem"],
  });

  if (item) {
    redirect(`/garden/${item}`);
  }

  return <GardenItems mode="static" items={gardenItems} />;
}
