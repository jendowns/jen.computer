import React from "react";
import { PlayIcon } from "./Icons";
import { VideoPlayer } from "./VideoPlayer";

export const ToggleVideoPlayer = ({
  playlist,
  thumbnail
}: {
  playlist: string;
  thumbnail?: React.JSX.Element | undefined;
}) => {
  const [isToggled, setIsToggled] = React.useState(false);

  const handleClick = () => {
    setIsToggled((prev) => !prev);
  };

  // TODO: aria-controls, tied to toggled window?

  const poster = thumbnail ?? <div className="video-poster" />;

  return (
    <div className="video-wrapper">
      {isToggled ? (
        <VideoPlayer playlist={playlist} />
      ) : (
        <>
          <div className="video-button-wrapper">
            <button
              className="flat-button"
              onClick={handleClick}
              aria-pressed={isToggled}
            >
              <PlayIcon /><span> load video</span>
            </button>
          </div>
          {poster}
        </>
      )}
    </div>
  );
};
