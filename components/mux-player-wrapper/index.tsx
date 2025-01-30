import type { MuxVideoAssetOwn } from "@/types/mux";

import MuxPlayer from "@mux/mux-player-react";

export default function MuxPlayerWrapper({
  video,
}: {
  video: MuxVideoAssetOwn;
}) {
  return (
    <MuxPlayer
      className="h-full w-auto object-contain"
      playbackId={video.playbackId}
      // style={{
      //   // Ensure the player takes up the full space of its container
      //   position: "absolute",
      //   top: 0,
      //   left: 0,
      //   width: "100%",
      //   height: "100%",
      // }}
    />
  );
}
