import type { MuxVideoAssetOwn } from "@/types/mux";

import MuxPlayer from "@mux/mux-player-react";
import { useEffect, useRef, useState } from "react";

import styles from "./styles.module.css";

export default function MuxPlayerWrapper({
  video,
}: {
  video: MuxVideoAssetOwn;
}) {
  const [isInView, setIsInView] = useState(false);
  const playerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        // Access the player element and control playback
        // biome-ignore lint/suspicious/noExplicitAny: sss
        const player = playerRef.current as any;
        if (player) {
          if (entry.isIntersecting) {
            player.play();
          } else {
            player.pause();
          }
        }
      },
      { threshold: 0.5 }, // Trigger when 50% of the player is visible
    );

    if (playerRef.current) {
      observer.observe(playerRef.current);
    }

    return () => {
      if (playerRef.current) {
        observer.unobserve(playerRef.current);
      }
    };
  }, []);

  return (
    <MuxPlayer
      ref={playerRef}
      className={`h-full w-auto object-contain ${styles.muxPlayer}`}
      playbackId={video.playbackId}
      muted
      autoPlay={isInView}
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
