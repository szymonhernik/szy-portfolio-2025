import { DocumentTextIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project ",
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
    // select option field with options: "has subprojects", "single project", with default to single project
    defineField({
      title: "Multi-Project Container",
      name: "hasSubprojects",
      description:
        "Enable this if this project contains multiple subprojects that should be displayed sequentially on the project page",
      type: "boolean",
      initialValue: false,
    }),
    // if hasSubprojects is true, add a field for the subprojects
    // hide this field if hasSubprojects is false
    defineField({
      name: "subprojects",
      type: "array",
      of: [
        defineArrayMember({ type: "reference", to: { type: "subproject" } }),
      ],
      hidden: ({ parent }) => !parent?.hasSubprojects,
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
      name: "publishedAt",
      type: "datetime",
    }),
    defineField({
      name: "body",
      type: "blockContent",
    }),
    defineField({
      name: "blocks",
      type: "array",
      of: [
        { type: "section-header" },
        { type: "carousel" },
        // { type: "section-content" },
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
