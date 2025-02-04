import type { Carousel as CarouselType, SectionContent as SectionContentType, SectionHeader as SectionHeaderType } from "../sanity.types";

import CarouselSimple from "./sanity-blocks/CarouselSimple";
import SectionContent from "./sanity-blocks/SectionContent";
import SectionHeader from "./sanity-blocks/SectionHeader";

type Block = ({ _key: string } & SectionHeaderType) | ({ _key: string } & SectionContentType) | ({ _key: string } & CarouselType);

// biome-ignore lint/suspicious/noExplicitAny: componentMap is a map of components
const componentMap: { [key: string]: React.ComponentType<any> } = {
  "section-header": SectionHeader,
  "section-content": SectionContent,
  carousel: CarouselSimple,
};

export default function Blocks({ blocks }: { blocks?: Block[] }) {
  return (
    <div className="">
      {blocks?.map((block) => {
        const Component = componentMap[block._type];
        if (!Component) {
          // Fallback for unknown block types to debug
          return <div data-type={block._type} key={block._key} />;
        }
        return <Component {...block} key={block._key} />;
      })}
    </div>
  );
}
