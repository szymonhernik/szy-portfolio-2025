import type { SingleGardenItemQueryResult } from "@/sanity.types";

import Image from "next/image";

import PortableTextRenderer from "./portable-text-renderer";

export default function GardenBlocks({
  blocks,
}: {
  blocks: NonNullable<SingleGardenItemQueryResult>["gardenBlocks"];
}) {
  return (
    <>
      {blocks?.map((block) => {
        const Component = componentMap[block._type];
        if (!Component) {
          return <div data-type={block._type} key={block._key} />;
        }
        return <Component {...block} key={block._key} />;
      })}
    </>
  );
}
// biome-ignore lint/suspicious/noExplicitAny: componentMap is a map of components
const componentMap: { [key: string]: React.ComponentType<any> } = {
  imageWithCaption: ImageWithCaption,
  textGarden: TextGarden,
};

type ImageWithCaptionBlock = Extract<NonNullable<NonNullable<SingleGardenItemQueryResult>["gardenBlocks"]>[number], { _type: "imageWithCaption" }>;
function ImageWithCaption({ image, caption }: ImageWithCaptionBlock) {
  return (
    <div className="fixed bottom-4 left-4 flex flex-col gap-4 ">
      {image?.image && <Image className="w-64" src={image?.image} alt={image?.alt || ""} width={1000} height={1000} />}

      {caption && <p className="mt-0 text-small">{caption}</p>}
    </div>
  );
}

type TextGardenBlock = Extract<NonNullable<NonNullable<SingleGardenItemQueryResult>["gardenBlocks"]>[number], { _type: "textGarden" }>;
function TextGarden({ text }: TextGardenBlock) {
  return <div className="mt-4 text-fluid-xl">{text && <PortableTextRenderer value={text} />}</div>;
}
