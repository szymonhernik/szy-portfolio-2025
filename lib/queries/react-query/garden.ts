import type { SingleGardenItemQueryResult } from "@/sanity.types";

import { client } from "@/sanity/lib/client.config";
import { singleGardenItemQuery } from "@/sanity/queries/page";

import { useQuery } from "@tanstack/react-query";

export function useGardenItem(slug: string) {
  return useQuery<SingleGardenItemQueryResult>({
    queryKey: ["garden-item", slug],
    queryFn: async () => {
      const data = await client.fetch(singleGardenItemQuery, { slug });
      return data;
    },
  });
}
