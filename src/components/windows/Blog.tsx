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
    <div
      style={{
        position: "relative",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          backgroundColor: "#ede9d9",
          display: "flex",
          width: "100%",
          padding: "4px 6px",
          borderBottom: "1px solid #919b9c",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "1px 4px",
            borderRadius: "3px",
            flexGrow: "1",
            fontSize: "12px",
            border: "1px solid #7f9db9",
          }}
        >
          https://jen.dev
        </div>
      </div>
      {!isIFrameLoaded && (
        <div className="pika-loading-wrapper">
          <img src="./images/pika.webp" className="pika-loading" alt="" />
          <span>
            <em>
              loading <u>https://jen.dev/</u>
            </em>
          </span>
        </div>
      )}
      <iframe
        id="blog-iframe"
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
