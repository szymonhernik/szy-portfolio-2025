// use portable-text-rendered to display the content
import type { PortableTextProps } from "next-sanity";

import PortableTextRenderer from "@/components/portable-text-renderer";

export default function SectionContent({
  body,
}: {
  body: PortableTextProps["value"];
}) {
  return (
    <div className="">
      <PortableTextRenderer value={body} />
    </div>
  );
}
