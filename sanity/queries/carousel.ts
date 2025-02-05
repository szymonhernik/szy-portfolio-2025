import { groq } from "next-sanity";

export const carouselFragment = `
  _type,
  _key,
  defaultCaption,
  items[]{
    _type == "imageSlide" => {
      _type,
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
              width,
              height,
              aspectRatio
            }
          }
        }
      },
      mobileImage {
        _type,
        alt,
        asset-> {
          url,
          metadata {
            lqip,
            dimensions {
              width,
              height,
              aspectRatio
            }
          }
        }
      }
    },
    _type == "videoSlide" => {
    _type,
    _key,
      caption,
      video {
        asset->{
            playbackId,
            "aspectRatio": data.aspect_ratio
        }
      },
      mobileVideo {
        asset->{
            playbackId,
            "aspectRatio": data.aspect_ratio
        }
      }
    },
    _type == "contentSlide" => {
      _type,
      _key,
      caption,
      content
    },
  }
`;
