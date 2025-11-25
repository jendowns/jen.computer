import React from "react";
import { ToggleWindowButton } from "./ToggleWindowButton";

export const Toolbar = () => {
  const [time, setTime] = React.useState<string>();

  React.useEffect(() => {
    const getDate = () => {
      const date = new Date().toLocaleString("en-US", {
        timeZone: "America/Los_Angeles",
        hour: "numeric",
        minute: "2-digit",
        timeZoneName: "short",
      });
      setTime(date);
    };
    getDate();
    setInterval(() => {
      getDate();
    }, 5000);
  }, []);

  return (
    <div className="toolbar">
      <ToggleWindowButton id="menu" className="toolbar-segment">
        <span>start</span>
      </ToggleWindowButton>
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
