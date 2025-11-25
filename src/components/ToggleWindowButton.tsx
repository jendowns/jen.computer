import React from "react";
import { DesktopContext, ViewType } from "./DesktopContext";

export interface IToggleWindowButtonProps {
  id: ViewType;
  title?: string;
  icon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export const ToggleWindowButton = ({
  id,
  title,
  icon,
  className,
  children,
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

  const contents = children ? (
    children
  ) : (
    <>
      {icon}
      <span>{title}</span>
    </>
  );

  return (
    <button
      className={className}
      onClick={handleClick}
      aria-pressed={isToggled}
      id={`button-${id}`}
    >
      {contents}
    </button>
  );
};
