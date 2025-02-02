"use client";

import type { SingleGardenItemQueryResult } from "@/sanity.types";

import { Modal } from "@/app/(web)/@modal/_components/modal";
import { GardenBreadcrumb } from "@/components/breadcrumb/garden";
import GardenBlocks from "@/components/gardenblocks";
import * as FadeIn from "@/components/motion/staggers/fade";

import { useRouter } from "next/navigation";

export default function GardenClientModal({
  slug,
  gardenItem,
}: {
  slug: string;
  gardenItem: SingleGardenItemQueryResult;
}) {
  const router = useRouter();

  if (!gardenItem) {
    router.replace("/garden");
    return null;
  }

  return (
    <FadeIn.Container>
      <FadeIn.Item>
        <Modal>
          <GardenBreadcrumb
            title={gardenItem.title}
            onClick={() => router.replace("/garden")}
          />
          <GardenBlocks blocks={gardenItem.gardenBlocks} />
        </Modal>
      </FadeIn.Item>
    </FadeIn.Container>
  );
}
