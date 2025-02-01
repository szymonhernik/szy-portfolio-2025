import type { GardenItemsQueryResult } from "@/sanity.types";

import { sanityFetch } from "@/sanity/lib/sanity.client";
import { gardenItemsQuery } from "@/sanity/queries/page";

import { Suspense } from "react";

import GardenModal from "../_components/GardenModal";
import { Modal } from "../_components/modal";

async function GardenData() {
  const gardenItems: GardenItemsQueryResult = await sanityFetch({
    query: gardenItemsQuery,
    tags: ["gardenItem"],
  });
  return <GardenModal items={gardenItems} />;
}

export default function Page() {
  return (
    <Modal>
      {/* plant emoji */}
      <Suspense fallback={<div>Loading...</div>}>
        <GardenData />
      </Suspense>
    </Modal>
  );
}
