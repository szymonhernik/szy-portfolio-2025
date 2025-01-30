import { defineField, defineType } from "sanity";

export const gardenItem = defineType({
  name: "gardenItem",
  title: "Garden Item",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
    }),
    defineField({
      name: "gardenBlocks",
      type: "array",
      of: [
        defineField({
          title: "Image with caption",
          name: "imageWithCaption",
          type: "object",
          fields: [
            defineField({
              name: "image",
              type: "image",
            }),
            defineField({
              name: "caption",
              type: "text",
              rows: 2,
            }),
          ],
          preview: {
            select: {
              caption: "caption",
              image: "image",
            },
            prepare({ caption, image }) {
              return {
                title: caption ? caption : "Image with no caption",
                media: image,
              };
            },
          },
        }),
        // object holding block content
        defineField({
          title: "Item with text",
          name: "textGarden",
          type: "object",
          fields: [
            defineField({
              name: "text",
              type: "blockContent",
            }),
          ],
          preview: {
            select: {
              text: "text",
            },
            prepare({ text = [] }) {
              const block = (text || []).find(
                // @ts-ignore
                (block) => block._type === "block",
              );
              return {
                title: block
                  ? block.children
                      // @ts-ignore
                      .filter((child) => child._type === "span")
                      // @ts-ignore
                      .map((span) => span.text)
                      .join("")
                  : "No text",
              };
            },
          },
        }),
        // defineField({
        //   title: "Item with text",
        //   name: "textGarden",
        //   type: "blockContent",
        // }),
      ],
    }),
  ],
});
