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
  richTextAndImageWithCaption: RichTextAndImageWithCaption,
};

type ImageWithCaptionBlock = Extract<NonNullable<NonNullable<SingleGardenItemQueryResult>["gardenBlocks"]>[number], { _type: "imageWithCaption" }>;

type RichTextAndImageWithCaptionBlock = Extract<
  NonNullable<NonNullable<SingleGardenItemQueryResult>["gardenBlocks"]>[number],
  { _type: "richTextAndImageWithCaption" }
>;

function ImageWithCaption({ image, caption }: ImageWithCaptionBlock) {
  return (
    <div
    // className="flex flex-col justify-end"
    // style={{ minHeight: "calc(100dvh - 2rem)" }}
    >
      <div>
        {image?.image && <Image src={image.image} alt={image.alt || ""} width={600} height={600} className="w-1/2 lg:w-1/3" />}

        {caption && (
          <div className="mt-0 text-small [&_p]:mb-0">
            <PortableTextRenderer value={caption} />
          </div>
        )}
      </div>
    </div>
  );
}

type TextGardenBlock = Extract<NonNullable<NonNullable<SingleGardenItemQueryResult>["gardenBlocks"]>[number], { _type: "textGarden" }>;
function TextGarden({ text }: TextGardenBlock) {
  return <div className="mt-4 text-fluid-xl">{text && <PortableTextRenderer value={text} />}</div>;
}

function RichTextAndImageWithCaption({ text, image, caption }: RichTextAndImageWithCaptionBlock) {
  return (
    <div className="flex h-full flex-col justify-between">
      {text && (
        <div className="mt-4 grid grid-cols-12">
          <div className="col-span-12 md:col-span-10 lg:col-span-7">
            <PortableTextRenderer value={text} />
          </div>
        </div>
      )}
      {image?.image && (
        <div className="flex flex-col gap-2">
          <Image src={image.image} alt={image.alt || ""} width={600} height={600} className="w-1/2 lg:w-1/3" />

          {caption && (
            <p className="mt-0 text-small [&_p]:mb-0">
              <PortableTextRenderer value={caption} />
            </p>
          )}
        </div>
      )}
    </div>
  );
}
