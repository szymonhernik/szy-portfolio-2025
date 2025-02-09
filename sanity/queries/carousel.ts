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
      hideInProjectPageCarousel,
      fillContainer,
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
      
    },
    _type == "videoSlide" => {
      _type,
      _key,
      hideInProjectPageCarousel,  
      caption,
      video {
        asset->{
            playbackId,
            "aspectRatio": data.aspect_ratio
        }
      },
      allowAudio,
    },
    _type == "contentSlide" => {
      _type,
      _key,
      caption,
      content
    },
  }
`;
