import { ImageIcon } from "@sanity/icons";
import { LetterText } from "lucide-react";
import { defineField, defineType } from "sanity";

export const imageInProjectPage = defineType({
  name: "image-in-project-page",
  type: "object",
  title: "Image in Project Page",
  description: "A image in project page",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "image",
      type: "image",
    }),
  ],
  preview: {
    select: {
      media: "image",
    },
    prepare({ media }) {
      return {
        title: "Image in Project Page",
        media,
      };
    },
  },
});
