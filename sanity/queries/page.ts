import { groq } from "next-sanity";

import { carouselFragment } from "./carousel";
import { sectionContentFragment } from "./section-content";
import { sectionHeaderFragment } from "./section-header";

export const projectQuery = groq`*[_type == "project"] {
  _id,
  _createdAt,
  title,
  "slug": slug.current,
  mainImage {
    "image": asset->url,
    "lqip": asset->metadata.lqip,
    "aspectRatio": asset->metadata.dimensions.aspectRatio,
    alt,
  },
 
}`;

export const singleProjectQuery = groq`*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  body,
  categories[]->{
    title,
    "slug": slug.current
  },
  blocks[]{
    _type == "section-content" => {
      ${sectionContentFragment}
    },
    _type == "section-header" => {
      ${sectionHeaderFragment}
    },
    _type == "carousel" => {
      ${carouselFragment}
    },
  },
  hasSubprojects,
  subprojects[]->{
    ...,
  }
  
}`;
