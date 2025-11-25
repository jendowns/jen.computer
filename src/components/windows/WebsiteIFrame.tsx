import React from "react";

interface IWebSiteIFrame {
  id: string;
  website: string;
  title: string;
  loadingImage: string;
}

export const WebsiteIFrame = (props: IWebSiteIFrame) => {
  const { id, website, title, loadingImage } = props;
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
          {website}
        </div>
      </div>
      {!isIFrameLoaded && (
        <div className="pika-loading-wrapper">
          <img src={loadingImage} className="pika-loading" alt="" />
          <span>
            <em>
              loading <u>{website}</u>
            </em>
          </span>
        </div>
      )}
      <iframe
        id={`${id}-iframe`}
        src={website}
        title={title}
        width="100%"
        height="100%"
        ref={iframeRef}
        onLoad={() => setTimeout(() => setIsIFrameLoaded(true), 1500)}
      />
    </div>
  );
};
