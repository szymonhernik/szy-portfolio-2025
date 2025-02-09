import type {
  Carousel as CarouselType,
  ImageInProjectPage as ImageInProjectPageType,
  SectionContent as SectionContentType,
  SectionHeader as SectionHeaderType,
  VideoInProjectPage as VideoInProjectPageType,
} from "../sanity.types";

import CarouselSimple from "./sanity-blocks/CarouselSimple";
import ImageInProjectPage from "./sanity-blocks/ImageInProjectPage";
import SectionContent from "./sanity-blocks/SectionContent";
import SectionHeader from "./sanity-blocks/SectionHeader";
import VideoInProjectPage from "./sanity-blocks/VideoInProjectPage";

type Block =
  | ({ _key: string } & SectionHeaderType)
  | ({ _key: string } & SectionContentType)
  | ({ _key: string } & CarouselType)
  | ({ _key: string } & ImageInProjectPageType)
  | ({ _key: string } & VideoInProjectPageType);

// biome-ignore lint/suspicious/noExplicitAny: componentMap is a map of components
const componentMap: { [key: string]: React.ComponentType<any> } = {
  "section-header": SectionHeader,
  "section-content": SectionContent,
  carousel: CarouselSimple,
  "image-in-project-page": ImageInProjectPage,
  "video-in-project-page": VideoInProjectPage,
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
