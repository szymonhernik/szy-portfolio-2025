import type { PortableTextProps } from "@portabletext/react";

import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";

import { OpenGardenItem } from "../open-garden-item";

// import { YouTubeEmbed } from "@next/third-parties/google";

const portableTextComponents: PortableTextProps["components"] = {
  types: {
    image: ({ value }) => {
      const { url, metadata } = value.asset;
      const { lqip, dimensions } = metadata;
      return (
        <Image
          src={url}
          alt={value.alt || "Image"}
          width={dimensions.width}
          height={dimensions.height}
          placeholder="blur"
          blurDataURL={lqip}
          style={{
            borderRadius: "1rem",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          quality={100}
        />
      );
    },
    // youtube: ({ value }) => {
    //   const { videoId } = value;
    //   return (
    //     <div className="max-w-3xl w-full mx-auto">
    //       <div className="aspect-video">
    //         <YouTubeEmbed videoid={videoId} params="rel=0" />
    //       </div>
    //     </div>
    //   );
    // },
  },
  block: {
    normal: ({ children }) => <p style={{ marginBottom: "1rem" }}>{children}</p>,
    h1: ({ children }) => <h1 style={{ marginBottom: "1rem", marginTop: "1rem" }}>{children}</h1>,
    h2: ({ children }) => <h2 style={{ marginBottom: "1rem", marginTop: "1rem" }}>{children}</h2>,
    h3: ({ children }) => <h3 style={{ marginBottom: "1rem", marginTop: "1rem" }}>{children}</h3>,
    h4: ({ children }) => <h4 style={{ marginBottom: "1rem", marginTop: "1rem" }}>{children}</h4>,
    h5: ({ children }) => <h5 style={{ marginBottom: "1rem", marginTop: "1rem" }}>{children}</h5>,
    blockquote: ({ children }) => (
      <blockquote
        style={
          {
            marginLeft: "var(--quote-margin-left-md)",
            "@media (min-width: 768px)": {
              marginLeft: "var(--quote-margin-left)",
            },
            // biome-ignore lint/suspicious/noExplicitAny: im sure of this
          } as any
        }
      >
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ value, children }) => {
      const isExternal = (value?.href || "").startsWith("http") || (value?.href || "").startsWith("https") || (value?.href || "").startsWith("mailto");
      const target = isExternal ? "_blank" : undefined;
      return (
        <Link href={value?.href} target={target} rel={target ? "noopener" : undefined} style={{ color: "var(--secondary)" }}>
          {children}
        </Link>
      );
    },
    "garden-item": ({ value, children }) => {
      const { itemId } = value;
      return <OpenGardenItem slug={itemId}>{children}</OpenGardenItem>;
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul
        style={{
          paddingLeft: "1.5rem",
          marginBottom: "1rem",
          listStyleType: "disc",
          listStylePosition: "inside",
        }}
      >
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol
        style={{
          paddingLeft: "1.5rem",
          marginBottom: "1rem",
          listStyleType: "decimal",
          listStylePosition: "inside",
        }}
      >
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li style={{ marginBottom: "0.5rem" }}>{children}</li>,
    number: ({ children }) => <li style={{ marginBottom: "0.5rem" }}>{children}</li>,
  },
};

const PortableTextRenderer = ({
  value,
}: {
  value: PortableTextProps["value"];
}) => {
  return <PortableText value={value} components={portableTextComponents} />;
};

export default PortableTextRenderer;
