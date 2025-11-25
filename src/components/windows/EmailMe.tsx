import { VideoLoop } from "../VideoLoop";

export const EmailMe = () => {
  const start = "hello";
  const domain = "jendowns.com";

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          padding: "1rem",
          alignItems: "center",
        }}
      >
        <VideoLoop src="https://res.cloudinary.com/jendowns/video/upload/v1743466043/jen.computer/videos/emails.mp4" height="166px" width="200px" />
        <p>
          <span>you can email me at </span>
          <br />
          <span>
            <a href={`mailto:${start}@${domain}`}>
              {start}@{domain}
            </a>
          </span>
        </p>
        <p
          style={{
            filter: "url('#creepytext')",
          }}
        >
          <em style={{ fontSize: "1.2rem" }}>don't be mean</em>
        </p>
      </div>

      <svg
        style={{ position: "absolute", width: 0, height: 0 }}
        aria-hidden="true"
      >
        <filter id="creepytext">
          <feTurbulence baseFrequency="0.004" numOctaves="12"></feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="turbulence"
            scale="12"
          ></feDisplacementMap>
        </filter>
      </svg>
    </>
  );
};
