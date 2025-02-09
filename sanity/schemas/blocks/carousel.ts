// @ts-nocheck

import { defineField, defineType } from "sanity";

export const carousel = defineType({
  name: "carousel",
  type: "object",
  title: "Carousel",
  fields: [
    defineField({
      name: "defaultCaption",
      type: "string",
      title: "Default Caption",
      description:
        "This caption will be used as a fallback if individual slides don't have captions",
    }),
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
              caption: "caption",
            },
            prepare({ image, alt, caption }) {
              const block = (caption || [])[0] || {};
              const captionText =
                block.children
                  ?.filter((child) => child._type === "span")
                  ?.map((span) => span.text)
                  ?.join(" ") || "";

              return {
                title: captionText || alt || "No caption/alt text",
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
            // boolean whether the image should just fill the container
            {
              name: "fillContainer",
              type: "boolean",
              title: "Fill Container",
              description:
                "If true, the image will fill the container and not be constrained by the aspect ratio (use for decorative images)",
              initialValue: false,
            },
            // boolean whether to display it in project page carousel or not
            {
              name: "hideInProjectPageCarousel",
              type: "boolean",
              title: "Hide in Project Page Carousel",
              description:
                "If true, the image will not be displayed in the project page carousel (only full screen carousel)",
              initialValue: false,
            },
            {
              name: "mobileImage",
              type: "image",
              title: "Mobile Image (Optional)",
              description: "Alternative image to display on mobile devices",
              fields: [
                {
                  name: "alt",
                  type: "string",
                  title: "Alternative Text",
                },
              ],
            },
            {
              name: "caption",
              type: "blockContent",
              title: "Caption",
              description: "Add a caption for this image",
            },
          ],
        },
        // mux video type and preview but dont play the video
        {
          type: "object",
          name: "videoSlide",
          title: "Video Slide",
          fields: [
            {
              name: "video",
              type: "mux.video",
              title: "Video",
            },
            // select whether to play with audio or not
            {
              name: "allowAudio",
              type: "boolean",
              title: "Allow audio",
              initialValue: false,
            },
            {
              name: "hideInProjectPageCarousel",
              type: "boolean",
              title: "Hide in Project Page Carousel",
              description:
                "If true, the image will not be displayed in the project page carousel (only full screen carousel)",
              initialValue: false,
            },
            {
              name: "mobileVideo",
              type: "mux.video",
              title: "Mobile Video (Optional)",
              description: "Alternative video to display on mobile devices",
            },
            {
              name: "caption",
              type: "blockContent",
              title: "Caption",
              description: "Add a caption for this video",
            },
          ],
          preview: {
            select: {
              caption: "caption",
            },
            prepare({ caption }) {
              const block = (caption || [])[0] || {};
              const captionText =
                block.children
                  ?.filter((child) => child._type === "span")
                  ?.map((span) => span.text)
                  ?.join(" ") || "";

              return {
                title: captionText || "Video slide",
                subtitle: "Video slide",
              };
            },
          },
        },
        // Block content type
        {
          type: "object",
          name: "contentSlide",
          title: "Content Slide",
          preview: {
            select: {
              content: "content",
              caption: "caption",
            },
            prepare({ content, caption }) {
              const contentBlock = (content || [])[0] || {};
              const captionBlock = (caption || [])[0] || {};

              const plainText =
                contentBlock.children
                  ?.filter((child) => child._type === "span")
                  ?.map((span) => span.text)
                  ?.join(" ") || "";

              const captionText =
                captionBlock.children
                  ?.filter((child) => child._type === "span")
                  ?.map((span) => span.text)
                  ?.join(" ") || "";

              return {
                title:
                  captionText ||
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
            {
              name: "caption",
              type: "blockContent",
              title: "Caption",
              description: "Add a caption for this content slide",
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
      defaultCaption: "defaultCaption",
    },
    prepare({ imageAlt, type, defaultCaption }) {
      return {
        title: "Carousel",
        subtitle:
          defaultCaption ||
          (type === "imageSlide" ? imageAlt : "Content slide"),
      };
    },
  },
});
