import React from "react";

export interface IDesktopContext {
  visibleWindowIds: string[];
  showWindow: (id: string) => void;
  hideWindow: (id: string) => void;
  bringToFront: (id: string) => void;
}

export const DesktopContext = React.createContext<IDesktopContext>({
  visibleWindowIds: [],
  showWindow: () => {},
  hideWindow: () => {},
  bringToFront: () => {},
});