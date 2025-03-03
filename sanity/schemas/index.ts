import type { SchemaTypeDefinition } from "sanity";

import { carousel } from "./blocks/carousel";
import { imageInProjectPage } from "./blocks/image-in-project-page";
import { sectionContent } from "./blocks/section-content";
import { sectionHeader } from "./blocks/section-header";
import { blockContent } from "./blocks/shared/blockContent";
import { videoInProjectPage } from "./blocks/video-in-project-page";
import { author } from "./documents/author";
import { category } from "./documents/category";
import { gardenItem } from "./documents/gardenItem";
import { project } from "./documents/project";
import { settings } from "./documents/settings";
import { subProject } from "./documents/subProject";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContent,
    category,
    gardenItem,
    project,
    subProject,
    author,
    sectionHeader,
    carousel,
    sectionContent,
    settings,
    imageInProjectPage,
    videoInProjectPage,
  ],
};
