import { groq } from "next-sanity";

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
  hasSubprojects,
  body,
  categories[]->{
    title,
    "slug": slug.current
  },
}`;
