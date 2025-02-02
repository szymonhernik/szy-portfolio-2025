import { videoLibrary } from "@/data/videoLibrary";

export default function RandomAnimation() {
  const randomVideo = videoLibrary[Math.floor(Math.random() * videoLibrary.length)];

  // Generate random positions: top 0-50%, left 0-70% of viewport
  const randomPosition = {
    top: `${Math.floor(Math.random() * 30)}vh`,
    left: `${Math.floor(Math.random() * 70)}vw`,
  };

  return (
    <div className="fixed z-[0] " style={randomPosition}>
      <video src={randomVideo.url} autoPlay muted controls={false} className=" max-h-[30vh] max-w-[20vw]" />
    </div>
  );
}
