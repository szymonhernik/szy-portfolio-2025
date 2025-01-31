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
    // Keep cached data for 10 minutes after becoming inactive
    gcTime: 1000 * 60 * 10,
    // Consider the data fresh for 5 minutes before refetching
    staleTime: 1000 * 60 * 5,
  });
}
