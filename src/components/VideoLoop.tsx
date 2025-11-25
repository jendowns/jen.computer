import React from "react";
import { LoadingIcon } from "./Icons";

export const VideoLoop = ({
  height,
  width,
  src,
}: {
  height: string;
  width: string;
  src: string;
}) => {
  const [videoLoaded, setVideoLoaded] = React.useState(false);

  const visible = {
    visibility: "visible" as const,
  };

  const invisible = {
    width: 0,
    height: 0,
    visibility: "hidden" as const,
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        padding: "1rem",
        alignItems: "center",
      }}
    >
      <div
        style={{
          outline: "1px dotted #222",
          outlineOffset: "1px",
          height,
          width,
          placeSelf: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "grid",
            placeItems: "center",
            height,
            background: "#7777776f",
            ...(videoLoaded ? invisible : visible),
            animation: "visibility 500ms linear",
          }}
          aria-label="loading"
        >
          <LoadingIcon />
        </div>
        <video
          className="email-video"
          src={src}
          muted
          playsInline
          loop
          autoPlay
          onLoadedData={() => setTimeout(() => setVideoLoaded(true), 750)}
          style={{
            ...(videoLoaded ? visible : invisible),
            animation: "visibility 500ms linear",
          }}
        />
      </div>
    </div>
  );
};
