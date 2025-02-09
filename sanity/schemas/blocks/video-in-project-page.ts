import { VideoIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const videoInProjectPage = defineType({
  name: "video-in-project-page",
  type: "object",
  title: "Video in Project Page",
  description: "A video in project page",
  icon: VideoIcon,
  fields: [
    defineField({
      name: "video",
      type: "mux.video",
      title: "Video",
    }),
  ],
  preview: {
    select: {
      media: "video",
    },
    prepare({ media }) {
      return {
        title: "Video in Project Page",
        media,
      };
    },
  },
});
