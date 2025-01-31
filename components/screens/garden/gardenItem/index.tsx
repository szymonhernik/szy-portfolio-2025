import type { SingleGardenItemQueryResult } from "@/sanity.types";

import GardenBlocks from "@/components/gardenblocks";

export default function GardenItem({
  item,
}: {
  item: NonNullable<SingleGardenItemQueryResult>;
}) {
  return <GardenBlocks blocks={item.gardenBlocks} />;
}
