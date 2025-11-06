import React from "react";

export const Blog = () => {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const [isIFrameLoaded, setIsIFrameLoaded] = React.useState<boolean>(false);

  const iframeCurrent = iframeRef?.current;

  React.useEffect(() => {
    iframeCurrent?.addEventListener("load", () => setIsIFrameLoaded(true));

    return () => {
      iframeCurrent?.removeEventListener("load", () => setIsIFrameLoaded(true));
    };
  }, [iframeCurrent]);

  return (
    <div style={{ position: "relative", height: '100%' }}>
      {!isIFrameLoaded && (
        <div className="pika-loading-wrapper"
        >
          <img src="./images/pika.webp" className="pika-loading" alt="" />
          <span><em>loading <u>https://jen.dev/</u></em></span>
        </div>
      )}
      <iframe
        src="https://jen.dev/"
        title="my blog site"
        width="100%"
        height="100%"
        ref={iframeRef}
        onLoad={() => setTimeout(() => setIsIFrameLoaded(true), 1500)}
      />
    </div>
  );
};
