import { groq } from "next-sanity";

export const carouselFragment = `
  _type,
  _key,
  defaultCaption,
  items[]{
    _type == "imageSlide" => {
      _key,
      caption,
      image {
        _type,
        alt,
        asset-> {
          url,
          metadata {
            lqip,
            dimensions {
              aspectRatio
            }
          }
        }
      }
    },
    _type == "videoSlide" => {
    _key,
      caption,
      video {
        asset->{
            playbackId,
            "aspectRatio": data.aspect_ratio
        }
      }
    },
    _type == "contentSlide" => {
    _key,
      caption,
      content
    },
  }
`;
