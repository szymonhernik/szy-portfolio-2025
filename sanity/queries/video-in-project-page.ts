export const videoInProjectPageFragment = `
    _type,
    _key,
    caption,
    video {
        asset->{
            playbackId,
            "aspectRatio": data.aspect_ratio
        }
    },
    allowAudio,
`;
