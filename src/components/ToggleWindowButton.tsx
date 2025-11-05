import React from "react";
import type { ViewType } from "./windows/WindowView";
import { DesktopContext } from "./DesktopContext";

export interface IToggleWindowButtonProps {
  id: string;
  windowContents: React.ReactNode;
  title: string;
  icon: React.ReactNode;
  view: ViewType;
}

export const ToggleWindowButton = ({
  id,
  title,
  icon
}: IToggleWindowButtonProps) => {
  const { visibleWindowIds, showWindow, hideWindow } =
    React.useContext(DesktopContext);

  const isToggled = React.useMemo(
    () => visibleWindowIds.includes(id),
    [visibleWindowIds, id]
  );

  const handleClick = () => {
    if (isToggled) {
      hideWindow(id);
    } else {
      showWindow(id);
    }
  };

  return (
    <button
      className="toggle-button"
      onClick={handleClick}
      aria-pressed={isToggled}
    >
      {icon}
      <span>{title}</span>
    </button>
  );
};
