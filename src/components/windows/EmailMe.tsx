const VideoWrapper = ({
  children,
  hasBlend,
}: {
  children: React.ReactNode;
  hasBlend: boolean;
}) => {
  const start = "hello";
  const domain = "jendowns.com";
  return (
    <>
      <div className="email-content">
        <div className="email-wrapper">
          <p>
            <span>you can email me at </span>
            <br/>
            <span>
              <a href={`mailto:${start}@${domain}`}>
                {start}@{domain}
              </a>
            </span>
          </p>
          <p>
            <span>(don't be mean)</span>
          </p>
        </div>
        {children}
      </div>
      {hasBlend && <div className="email-blend"></div>}
    </>
  );
};

export const EmailMe = () => {
  // const canUseWebGl = useWebGl();

  // if (canUseWebGl) {
  //   return (
  //     <VideoWrapper hasBlend>
  //       <video
  //         className="email-video"
  //         src="/videos/computer.mp4"
  //         muted
  //         playsInline
  //         loop
  //         autoPlay
  //         style={{ filter: "grayscale()", width: "100%" }}
  //       />
  //     </VideoWrapper>
  //   );
  // }

  // return (
  //   <VideoWrapper hasBlend={false}>
  //     <WebGl src="/videos/computer.mp4" />
  //   </VideoWrapper>
  // );

  return (
    <VideoWrapper hasBlend={false}>
      <img
        src="./images/computer-yay-dithered.png"
        alt="dithered grayscale picture of me when I was a kid, sitting at my computer and smiling awkwardly at the camera. my fingers are on the arrow keys of the keyboard, so I'm probably playing a computer game (maybe Barbie Riding Club). In the background is a small table with a toy stable and several miniature horses."
      />
    </VideoWrapper>
  );
};
