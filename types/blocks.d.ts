import type { SingleProjectQueryResult } from "@/sanity.types";

export type Block = NonNullable<NonNullable<SingleProjectQueryResult>["blocks"]>[number];

export type CarouselBlock = Extract<NonNullable<NonNullable<SingleProjectQueryResult>["blocks"]>[number], { _type: "carousel" }>;
