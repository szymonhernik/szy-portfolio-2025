import type { MuxVideoAssetOwn } from "@/types/mux";

import MuxPlayer from "@mux/mux-player-react";

export default function MuxPlayerWrapper({
  video,
}: {
  video: MuxVideoAssetOwn;
}) {
  return <MuxPlayer playbackId={video.playbackId} />;
}
