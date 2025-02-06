export const imageInProjectPageFragment = `
  _type,
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
            aspectRatio,
        },
      },
    },
  },
`;
