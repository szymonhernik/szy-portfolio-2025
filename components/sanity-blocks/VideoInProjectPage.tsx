"use client";

import type { SingleProjectQueryResult } from "@/sanity.types";
import type { MuxVideoAssetOwn } from "@/types/mux";

import MuxPlayerWrapper from "../mux-player-wrapper";

type VideoInProjectPageBlock = Extract<NonNullable<NonNullable<SingleProjectQueryResult>["blocks"]>[number], { _type: "video-in-project-page" }>;

type CarouselVideo = {
  asset: MuxVideoAssetOwn;
};

export default function VideoInProjectPage({
  video,
}: {
  video: VideoInProjectPageBlock;
}) {
  // convert 192:125 to 192 / 125 and add to div's style
  const aspectRatio = (video as unknown as CarouselVideo)?.asset?.aspectRatio || "16:9";

  const style = aspectRatio
    ? {
        aspectRatio: `${aspectRatio.split(":")[0]} / ${aspectRatio.split(":")[1]}`,
      }
    : {};

  return (
    <div className="mt-4 w-full" style={style}>
      <VideoInProjectPageBlock video={video as unknown as CarouselVideo} allowAudio={video.allowAudio ?? false} />
    </div>
  );
}

const VideoInProjectPageBlock = ({
  video,

  allowAudio,
}: {
  video: CarouselVideo;

  allowAudio: boolean;
}) => {
  if (!video?.asset) return null;
  return (
    <div className="relative h-full w-full shrink-0">
      <MuxPlayerWrapper controlsOff={true} allowAudio={allowAudio} video={video?.asset as unknown as MuxVideoAssetOwn} />
    </div>
  );
};
