import type { MuxVideoAssetOwn } from "@/types/mux";

import MuxPlayer from "@mux/mux-player-react";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

import styles from "./styles.module.css";

export default function MuxPlayerWrapper({
  video,
  allowAudio,
  controlsOff,
}: {
  video: MuxVideoAssetOwn;
  allowAudio: boolean | null;
  controlsOff?: boolean;
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
      { threshold: 0.1 }, // Trigger when 50% of the player is visible
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

  const thumbnailWidth = 16;
  const thumbnailHeight = Math.round(
    thumbnailWidth / (Number(video.aspectRatio) || 16 / 9),
  );
  const placeholderUrl = `https://image.mux.com/${video.playbackId}/thumbnail.webp?width=${thumbnailWidth}&height=${thumbnailHeight}`;

  return (
    <>
      <template
        id="media-theme-custom"
        key={video.playbackId}
        // biome-ignore lint/security/noDangerouslySetInnerHtml: i want it
        dangerouslySetInnerHTML={{
          __html: `
            <style>
              :host {
                --media-control-background: transparent;
                --media-control-hover-background: transparent;
              }
              
              media-play-button {
                --media-button-icon-transform: scale(1.5);
              }

              media-mute-button {
                --media-button-icon-transform: scale(1.5);
              }

              .controls-wrapper {
                display: flex;
                gap: 0.5rem;
                align-items: center;
                padding: 5px;
              }
                 .hide-audio media-mute-button {
                display: none;
              }
            </style>

            <media-controller >
            <slot name="media" slot="media"></slot>
            <slot name="poster" slot="poster"></slot>
              
              <media-control-bar>
                <div class="controls-wrapper">
                  <media-play-button>
                    <svg slot="play" xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60">
                      <g id="Group_205" data-name="Group 205" transform="translate(-10574 2914)">
                        <rect id="Rectangle_129" data-name="Rectangle 129" width="60" height="60" transform="translate(10574 -2914)" fill="none"/>
                        <g id="play" transform="translate(10593.104 -2897.33)">
                          <path id="play-2" data-name="play" d="M2.9,27.96V1.3L26.694,14.879ZM4.021,4.29V24.97a.559.559,0,0,0,.872.5L23.331,15.377a.644.644,0,0,0,0-1.121L5.018,3.792A.652.652,0,0,0,4.021,4.29Z" transform="translate(-2.9 -1.3)" fill="#fff" stroke="#fff" stroke-width="0.5"/>
                        </g>
                      </g>
                    </svg>
                    <svg slot="pause" xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60">
                      <g id="Group_206" data-name="Group 206" transform="translate(-10644 2914)">
                        <rect id="Rectangle_128" data-name="Rectangle_128" width="60" height="60" transform="translate(10644 -2914)" fill="none"/>
                        <g id="pause" transform="translate(10664.532 -2896.956)">
                          <path id="Path_504" data-name="Path_504" d="M12.124,27.512H4.4V1.6h7.724V27.388h0Zm-5.98-1.121H10.38A.588.588,0,0,0,11,25.768V3.344a.588.588,0,0,0-.623-.623H6.144a.588.588,0,0,0-.623.623v22.3a.588.588,0,0,0,.623.623Z" transform="translate(-4.4 -1.6)" fill="#fff" stroke="#fff" stroke-width="1.2"/>
                          <path id="Path_505" data-name="Path_505" d="M21.124,27.512H13.4V1.6h7.724V27.388h0Zm-5.98-1.121H19.38A.588.588,0,0,0,20,25.768V3.344a.588.588,0,0,0-.623-.623H15.144a.588.588,0,0,0-.623.623v22.3a.588.588,0,0,0,.623.623Z" transform="translate(-2.188 -1.6)" fill="#fff" stroke="#fff" stroke-width="1.2"/>
                        </g>
                      </g>
                    </svg>
                  </media-play-button>
                 
                  <media-mute-button>
                    <svg slot="high" xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60">
                      <g id="Group_204" data-name="Group_204" transform="translate(-10505 2914)">
                        <rect id="Rectangle_126" data-name="Rectangle_126" width="60" height="60" transform="translate(10505 -2914)" fill="none"/>
                        <g id="Component_49_5" data-name="Component 49 – 5" transform="translate(10520.279 -2897.383)">
                          <path id="sound_on" d="M19.736,28.766H18.4l-.937-.937A21.079,21.079,0,0,0,2.472,21.405H1V9.361H2.472A21.079,21.079,0,0,0,17.461,2.937L18.4,2h1.338Zm-17.4-8.7h.268a21.949,21.949,0,0,1,14.721,5.621c.4.4,1.071,0,1.071-.535V5.613c0-.535-.669-.937-1.071-.535A22.2,22.2,0,0,1,2.606,10.7h0v9.368H2.338Zm20.074,3.346V22.074a6.691,6.691,0,0,0,0-13.383V7.353a8.03,8.03,0,0,1,0,16.059Zm0-4.015V18.059a2.677,2.677,0,0,0,0-5.353V11.368a4.116,4.116,0,0,1,4.015,4.015A4.116,4.116,0,0,1,22.412,19.4Z" transform="translate(-1 -2)" fill="#fff" stroke="#fff" stroke-width="0.5"/>
                        </g>
                      </g>
                    </svg>
                    <svg slot="off" xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60">
                      <g id="Group_203" data-name="Group_203" transform="translate(-10435 2914)">
                        <rect id="Rectangle_127" data-name="Rectangle_127" width="60" height="60" transform="translate(10435 -2914)" fill="none"/>
                        <g id="Component_48_6" data-name="Component 48 – 6" transform="translate(10449.074 -2899.859)">
                          <g id="sound_off" transform="translate(0)">
                            <path id="Path_500" data-name="Path_500" d="M18.4,23.359c0,.535-.669.937-1.071.535A21.949,21.949,0,0,0,2.606,18.274h0V8.906h0a13.031,13.031,0,0,0,3.212-.268L5.55,7.3c-1.071,0-2.007.268-3.078.268H1V19.612H2.472a21.079,21.079,0,0,1,14.989,6.424l.937.937h1.338V21.486H18.4Z" transform="translate(0.338 2.47)" fill="#fff" stroke="#fff" stroke-width="0.5"/>
                            <path id="Path_501" data-name="Path_501" d="M23.821,22.617,20.074,18.87V2.677H18.736l-.937.937A21.641,21.641,0,0,1,9.9,8.7L1.071,0,0,.937l8.3,8.3.937.937L18.6,19.539l1.338,1.338,10.84,10.84,1.071-1.071-7.093-6.959h.134m-6.156-6.156L10.974,9.77a21.237,21.237,0,0,0,6.691-4.015c.4-.4,1.071,0,1.071.535Z" transform="translate(0)" fill="#fff" stroke="#fff" stroke-width="0.5"/>
                            <path id="Path_502" data-name="Path_502" d="M21.015,13.015A4.116,4.116,0,0,0,17,9v1.338a2.677,2.677,0,0,1,0,5.353V17.03A4.116,4.116,0,0,0,21.015,13.015Z" transform="translate(5.75 3.045)" fill="#fff" stroke="#fff" stroke-width="0.5"/>
                            <path id="Path_503" data-name="Path_503" d="M17,6V7.338a6.691,6.691,0,0,1,0,13.383v.669l.8.669a8.114,8.114,0,0,0,7.227-8.03A8.232,8.232,0,0,0,17,6Z" transform="translate(5.75 2.03)" fill="#fff" stroke="#fff" stroke-width="0.5"/>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </media-mute-button>
                 
                </div>
              </media-control-bar>
            </media-controller>
          `,
        }}
      />
      <MuxPlayer
        ref={playerRef}
        className={clsx(
          "h-full min-h-full w-full min-w-full object-cover overflow-hidden",
          styles.muxPlayer,
          !allowAudio && styles.hideAudio,
          controlsOff && styles.controlsOff,
        )}
        playbackId={video.playbackId}
        muted
        autoPlay={isInView}
        placeholder={placeholderUrl}
        accentColor="transparent"
        theme="media-theme-custom"
        style={{ aspectRatio: video.aspectRatio }}
      />
    </>
  );
}
