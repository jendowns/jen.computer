import React from "react";

export const Toolbar = () => {
  const [time, setTime] = React.useState<string>();

  React.useEffect(() => {
    setInterval(() => {
      const date = new Date().toLocaleString("en-US", {
        timeZone: "America/Los_Angeles",
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        timeZoneName: "short",
      });
      setTime(date);
    }, 5000);
  }, []);

  return (
    <div className="toolbar">
      <div className="toolbar-segment">
        <img
          src="./favicon.ico"
          alt=""
          width="24px"
          height="24px"
          className="about-icon"
        />
        <span>jen.computer</span>
      </div>
      <div className="toolbar-segment">
        <span>
          <small>
            <time>{time}</time>
          </small>
        </span>
      </div>
    </div>
  );
};
