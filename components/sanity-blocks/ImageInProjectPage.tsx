import type { SingleProjectQueryResult } from "@/sanity.types";

import Image from "next/image";

type ImageInProjectPageBlock = Extract<NonNullable<NonNullable<SingleProjectQueryResult>["blocks"]>[number], { _type: "image-in-project-page" }>;
export default function ImageInProjectPage({ image }: ImageInProjectPageBlock) {
  if (!image || !image.asset || !image.asset.url) return null;
  function getAspectRatio(image: ImageInProjectPageBlock["image"]) {
    const { width, height } = image?.asset?.metadata?.dimensions || {
      width: 4,
      height: 3,
    };
    return `${width} / ${height}`;
  }

  return (
    <div style={{ aspectRatio: getAspectRatio(image) }} className={"relative h-auto w-full"}>
      <Image
        src={image.asset.url}
        alt={image.alt || ""}
        width={image.asset.metadata?.dimensions?.width ?? 4}
        height={image.asset.metadata?.dimensions?.height ?? 3}
        className="h-full w-full"
        placeholder="blur"
        blurDataURL={image.asset.metadata?.lqip || ""}
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
    </div>
  );
}
