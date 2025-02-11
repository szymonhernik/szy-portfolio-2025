import type { GardenItemsQueryResult } from "@/sanity.types";

import * as FadeIn from "@/components/motion/staggers/fade";
import { sanityFetch } from "@/sanity/lib/sanity.client";
import { gardenItemsQuery } from "@/sanity/queries/page";

import { Suspense } from "react";

import GardenModal from "../_components/GardenModal";
import { Modal } from "../_components/modal";

// metadata
export async function generateMetadata() {
  return {
    title: "Szymon Eda Hernik | Garden",
    description: "An archive of ideas, thoughts, photographs, and other documents.",
  };
}

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
        <FadeIn.Container>
          <FadeIn.Item>
            <GardenData />
          </FadeIn.Item>
        </FadeIn.Container>
      </Suspense>
    </Modal>
  );
}
