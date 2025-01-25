import type { SingleProjectQueryResult } from "@/sanity.types";

export type Block = NonNullable<NonNullable<SingleProjectQueryResult>["blocks"]>[number];
