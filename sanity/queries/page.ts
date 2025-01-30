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

export const gardenItemsQuery = groq`*[_type == "gardenItem"] {
  _id,
  title,
  "slug": slug.current,
}`;
export const singleGardenItemQuery = groq`*[_type == "gardenItem" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  gardenBlocks[]{
    _type == "imageWithCaption" => {
      _type,
      _key,
      image {
        "image": asset->url,
        "lqip": asset->metadata.lqip,
        "aspectRatio": asset->metadata.dimensions.aspectRatio,
        alt,
      },
      caption
    },
    _type == "textGarden" => {
      _key,
      _type,
      text
    },
  }
}`;

export const projectsAndSubprojectsQuery = groq`*[_type == "project" || _type == "subproject"] {
  _id,
  _type,
  title,
  "slug": slug.current,
  categories[]->{
    title,
    "slug": slug.current
  },
  mainImage {
    "image": asset->url,
    "lqip": asset->metadata.lqip,
    "aspectRatio": asset->metadata.dimensions.aspectRatio,
    alt,
  },
  "parentSlug": select(
    _type == "subproject" => *[_type == "project" && references(^._id)][0].slug.current,
    null
  ),
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
    _id,
    _key,
    title,
    categories[]->{
      title,
      "slug": slug.current
    },
    "slug": slug.current,
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
    }
  }
  
}`;
