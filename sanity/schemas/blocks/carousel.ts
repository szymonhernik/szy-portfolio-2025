// @ts-nocheck

import { defineField, defineType } from "sanity";

export const carousel = defineType({
  name: "carousel",
  type: "object",
  title: "Carousel",
  fields: [
    defineField({
      name: "items",
      type: "array",
      title: "Carousel Items",
      of: [
        // Image type
        {
          type: "object",
          name: "imageSlide",
          title: "Image Slide",
          preview: {
            select: {
              image: "image",
              alt: "image.alt",
            },
            prepare({ image, alt }) {
              return {
                title: alt || "No alt text",
                subtitle: "Image slide",
                media: image,
              };
            },
          },
          fields: [
            {
              name: "image",
              type: "image",
              title: "Image",
              fields: [
                {
                  name: "alt",
                  type: "string",
                  title: "Alternative Text",
                },
              ],
            },
          ],
        },
        // Block content type
        {
          type: "object",
          name: "contentSlide",
          title: "Content Slide",
          preview: {
            select: {
              content: "content",
            },
            prepare({ content }) {
              const block = (content || [])[0] || {};
              const plainText =
                block.children
                  ?.filter((child) => child._type === "span")
                  ?.map((span) => span.text)
                  ?.join(" ") || "";

              return {
                title:
                  plainText.substring(0, 50) +
                  (plainText.length > 50 ? "..." : ""),
                subtitle: "Content slide",
              };
            },
          },
          fields: [
            {
              name: "content",
              title: "Content",
              type: "blockContent",
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      imageAlt: "items.0.image.alt",
      type: "items.0._type",
    },
    prepare({ imageAlt, type }) {
      return {
        title: "Carousel",
        subtitle: type === "imageSlide" ? imageAlt : "Content slide",
      };
    },
  },
});
