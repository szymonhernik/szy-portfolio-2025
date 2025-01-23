import { LetterText } from "lucide-react";
import { defineField, defineType } from "sanity";

export const sectionHeader = defineType({
  name: "section-header",
  type: "object",
  title: "Section Header",
  description: "A section header with a title",
  icon: LetterText,
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: "Section Header",
        subtitle: title,
      };
    },
  },
});
