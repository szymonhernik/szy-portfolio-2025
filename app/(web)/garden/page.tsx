import type { GardenItemsQueryResult } from "@/sanity.types";

import { GardenItems } from "@/app/(web)/_components/GardenItems";
import * as FadeIn from "@/components/motion/staggers/fade";
import { sanityFetch } from "@/sanity/lib/sanity.client";
import { gardenItemsQuery } from "@/sanity/queries/page";

import { Suspense } from "react";

export async function generateMetadata() {
  return {
    title: "Szymon Eda Hernik | Garden",
    description: "An archive of ideas, thoughts, photographs, and other documents.",
    openGraph: {
      title: "Szymon Eda Hernik | Garden",
      description: "An archive of ideas, thoughts, photographs, and other documents.",
      images: [
        {
          url: "https://gmri4o54mi.ufs.sh/f/xbYCNI2PzB3h0u9niebQjxyeDUGSL6shz8biAqZE7mlRkpw0",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Szymon Eda Hernik | Garden",
      description: "An archive of ideas, thoughts, photographs, and other documents.",
      images: [
        {
          url: "https://gmri4o54mi.ufs.sh/f/xbYCNI2PzB3h0u9niebQjxyeDUGSL6shz8biAqZE7mlRkpw0",
        },
      ],
    },
  };
}

export default async function Page() {
  const gardenItems: GardenItemsQueryResult = await sanityFetch({
    query: gardenItemsQuery,
    tags: ["gardenItem"],
  });

  return (
    <FadeIn.Container>
      <FadeIn.Item>
        <Suspense>
          <main className="p-4">
            <GardenItems mode="static" items={gardenItems} />
          </main>
        </Suspense>
      </FadeIn.Item>
    </FadeIn.Container>
  );
}
