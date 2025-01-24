import { DocumentTextIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const subProject = defineType({
  name: "subproject",
  title: "Subproject",
  type: "document",
  icon: DocumentTextIcon,
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
      name: "seoOverview",
      title: "SEO Overview",
      type: "text",
      rows: 3,
      description: "A brief overview of this subproject for SEO purposes",
      validation: (Rule) =>
        Rule.max(300).warning(
          "SEO descriptions work best when kept under 300 characters",
        ),
    }),
    defineField({
      name: "mainImage",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
        }),
      ],
    }),
    defineField({
      name: "categories",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: { type: "category" } })],
    }),

    defineField({
      name: "blocks",
      type: "array",
      of: [
        { type: "section-header" },
        { type: "carousel" },
        { type: "section-content" },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "mainImage",
    },
    prepare(selection) {
      return { ...selection };
    },
  },
});
