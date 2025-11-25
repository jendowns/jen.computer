import Hls from "hls.js";
import React from "react";
import { useWebGl } from "../../utils/useWebGl";
import { WebGl } from "./WebGl";

export const VideoPlayer = ({ playlist }: { playlist: string }) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const canUseWebGl = useWebGl();

  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    if (canUseWebGl) {
      videoRef.current = document.createElement("video");
      videoRef.current.autoplay = true;
      videoRef.current.loop = true;
      videoRef.current.muted = true;
    }
    if (Hls.isSupported() && videoRef.current) {
      const hls = new Hls();
      hls.attachMedia(videoRef.current);
      hls.loadSource(playlist);
      setIsReady(true);
    }
  }, [canUseWebGl, playlist]);

  if (!isReady && canUseWebGl) {
    return "loading";
  }

  if (canUseWebGl) {
    return <WebGl videoSourceRef={videoRef!} />;
  }

  return <video style={{ minHeight: '392px' }} controls ref={videoRef} />;
};
