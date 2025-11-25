import React from "react";
import { ToggleWindowButton } from "./ToggleWindowButton";
import { WindowView } from "./windows/WindowView";
import { Toolbar } from "./Toolbar";
import { DesktopContext } from "./DesktopContext";

export const Desktop = () => {
  const {
    visibleWindowIds,
    hideWindow,
    isMobile,
    allWindows,
    desktopWindowIds,
    menuIds,
  } = React.useContext(DesktopContext);

  return (
    <>
      <main className="draggable-area">
        <div className="desktop-content">
          <div className="desktop-buttons-start">
            {Object.values(allWindows)
              .filter((childWindow) => childWindow.id)
              .filter(
                (childWindow) =>
                  childWindow.id &&
                  childWindow.position === "start" &&
                  desktopWindowIds.indexOf(childWindow.id) > -1
              )
              .map((props) => (
                <ToggleWindowButton
                  className="toggle-button"
                  key={props.id}
                  {...props}
                />
              ))}
          </div>
          <div className="desktop-buttons-end">
            {Object.values(allWindows)
              .filter(
                (childWindow) =>
                  childWindow.position === "end" &&
                  childWindow.id &&
                  desktopWindowIds.indexOf(childWindow.id) > -1
              )
              .map((props) => (
                <ToggleWindowButton
                  className="toggle-button"
                  key={props.id}
                  {...props}
                />
              ))}
          </div>
          <div className="desktop-window-area">
            {visibleWindowIds[0] &&
              visibleWindowIds?.map((id) =>
                allWindows[id]?.windowContents &&
                // TODO: fragile
                menuIds.indexOf(id) > -1 ? (
                  allWindows[id]?.windowContents
                ) : (
                  <WindowView
                    key={id}
                    id={id}
                    contents={allWindows[id]?.windowContents}
                    onClose={() => {
                      hideWindow(id);
                      document.getElementById(`button-${id}`)?.focus();
                    }}
                    total={visibleWindowIds.length}
                    title={allWindows[id]?.title ?? "window"}
                    view={allWindows[id].id}
                    isMobile={isMobile}
                  />
                )
              )}
          </div>
        </div>
      </main>
      <Toolbar />
    </>
  );
};
export { DesktopContext };
