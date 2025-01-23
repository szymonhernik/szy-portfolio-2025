import { LetterText } from "lucide-react";
import { defineField, defineType } from "sanity";

export const sectionContent = defineType({
  name: "section-content",
  type: "object",
  title: "Section Content",
  description: "A section content",
  icon: LetterText,
  fields: [
    defineField({
      name: "body",
      type: "blockContent",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: "Section Content",
      };
    },
  },
});
