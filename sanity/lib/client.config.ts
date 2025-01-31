import { createClient } from "@sanity/client";

import { apiVersion, dataset, projectId } from "./sanity.api";

// Client-side configuration
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Enable CDN caching
  perspective: "published",
});
