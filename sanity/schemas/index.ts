import type { SchemaTypeDefinition } from "sanity";

import { carousel } from "./blocks/carousel";
import { sectionHeader } from "./blocks/section-header";
import { blockContent } from "./blocks/shared/blockContent";
import { author } from "./documents/author";
import { category } from "./documents/category";
import { project } from "./documents/project";
import { subProject } from "./documents/subProject";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContent,
    category,
    project,
    subProject,
    author,
    sectionHeader,
    carousel,
  ],
};
