import React, { useEffect, useState } from "react";
import {
  type IToggleWindowButtonProps,
  ToggleWindowButton,
} from "./ToggleWindowButton";
import { WindowView } from "./windows/WindowView";
import { Toolbar } from "./Toolbar";
import { Footer } from "./Footer";
import { DesktopContext } from "./DesktopContext";

export const Desktop = ({
  childWindows,
}: {
  childWindows: { [id: string]: IToggleWindowButtonProps };
}) => {
  const [visibleWindowIds, setVisibleWindowIds] = useState<string[]>([
    "status",
  ]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const sizeQuery = window.matchMedia("(max-width: 600px)");

    const onUpdate = (evt: MediaQueryListEvent) => {
      if (evt.matches) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    sizeQuery.addEventListener("change", onUpdate);
    onUpdate(sizeQuery as unknown as MediaQueryListEvent);

    return () => {
      sizeQuery.removeEventListener("change", onUpdate);
    };
  }, []);

  useEffect(() => {
    // only show active window on mobile
    if (isMobile) {
      setVisibleWindowIds((prev) => [prev[prev.length - 1]]);
    }
  }, [isMobile]);

  const showWindow = React.useCallback(
    (id: string) => {
      if (isMobile) {
        setVisibleWindowIds([id]);
      } else {
        setVisibleWindowIds((prev) => [...prev, id]);
        const currentActive = document.querySelector(".active");
        currentActive?.classList.remove("active");
        document.getElementById(id)?.classList.add("active");
      }
    },
    [isMobile]
  );

  const hideWindow = React.useCallback(
    (id: string) => {
      if (isMobile) {
        setVisibleWindowIds([]);
      } else {
        setVisibleWindowIds((prev) => [
          ...prev.slice(0, prev.indexOf(id)),
          ...prev.slice(prev.indexOf(id) + 1),
        ]);
      }
    },
    [isMobile]
  );

  const bringToFront = React.useCallback((id: string) => {
    const currentActive = document.querySelector(".active");
    currentActive?.classList.remove("active");
    document.getElementById(id)?.classList.add("active");
  }, []);

  return (
    <>
      <Toolbar />
      <DesktopContext.Provider
        value={{ visibleWindowIds, showWindow, hideWindow, bringToFront }}
      >
        <main className="draggable-area">
          <div className="desktop-content">
            <div className="desktop-buttons">
              {Object.values(childWindows).map((props) => (
                <ToggleWindowButton key={props.id} {...props} />
              ))}
            </div>
            <div className="desktop-window-area">
              {visibleWindowIds.map((id) => (
                <WindowView
                  key={id}
                  id={id}
                  contents={childWindows[id].windowContents}
                  onClose={() => hideWindow(id)}
                  total={visibleWindowIds.length}
                  title={childWindows[id].title}
                  view={childWindows[id].view}
                  isMobile={isMobile}
                />
              ))}
            </div>
          </div>
        </main>
      </DesktopContext.Provider>
      <Footer />
    </>
  );
};
export { DesktopContext };
