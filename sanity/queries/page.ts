import { groq } from "next-sanity";

import { carouselFragment } from "./carousel";
import { imageInProjectPageFragment } from "./image-in-project-page";
import { sectionContentFragment } from "./section-content";
import { sectionHeaderFragment } from "./section-header";

export const projectQuery = groq`*[_type == "settings"][0] {
  _id,
  showcaseProjects[]{
      _key,
      ...@->{
        _id,
        _createdAt,
        title,
        subtitle,
        "slug": slug.current,
        mainImage {
          "image": asset->url,
          "lqip": asset->metadata.lqip,
          "aspectRatio": asset->metadata.dimensions.aspectRatio,
          alt,
        },
      }
  }
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
    _type == "richTextAndImageWithCaption" => {
      _type,
      _key,
      text,
      image {
        "image": asset->url,
        "lqip": asset->metadata.lqip,
        "aspectRatio": asset->metadata.dimensions.aspectRatio,
        alt,
      },
      caption
    },
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
  subtitle,
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
  seoOverview,
  body,
  "slug": slug.current,
  mainImage,
  categories[]->{
    title,
    "slug": slug.current
  },
  "showcaseProjects": *[_type == "settings"][0].showcaseProjects[] {
      ...@->{
        title,
        "slug": slug.current
      }
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
    _type == "image-in-project-page" => {
      ${imageInProjectPageFragment}
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
      _type == "image-in-project-page" => {
      ${imageInProjectPageFragment}
      },
    },
  },
  
}`;
