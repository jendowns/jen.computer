import React, { type CSSProperties, useContext, useRef } from "react";
import { CloseIcon } from "../Icons";
import { DesktopContext, ViewType } from "../DesktopContext";

const clamp = (value: number, min: number, max: number) => {
  if (value < min) return min;
  if (value > max) return max;
  return value;
};

interface IWindowViewProps {
  id: ViewType;
  onClose: () => void;
  contents: React.ReactNode;
  title: string;
  view: ViewType;
  total: number;
  isMobile: boolean;
}

export const WindowView = ({
  id,
  title,
  contents,
  onClose,
  view,
  total: initialActiveWindowCount,
  isMobile,
}: IWindowViewProps) => {

  const { bringToFront, allWindows, visibleWindowIds } = useContext(DesktopContext);
  const windowElemRef = useRef<HTMLDivElement>(null);
  const draggableElemRef = useRef<HTMLDivElement>(null);

  const [position, setPosition] = React.useState<CSSProperties>({
    top: initialActiveWindowCount * 20,
    left: visibleWindowIds.length === 1 ? '15%' : `${initialActiveWindowCount * 15}%`,
  });

  React.useEffect(() => {
    let newPosition: CSSProperties;
    if (isMobile) {
      newPosition = {
        margin: "0 auto",
        position: "relative" as const,
      };
    } else {
      newPosition = {
        top: initialActiveWindowCount * 20,
        left: visibleWindowIds.length === 1 ? '15%' : `${initialActiveWindowCount * 5}%`,
      };
    }
    setPosition(newPosition);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  let sizes;

  if (isMobile) {
    sizes = allWindows[view]?.mobileStyles;
  } else {
    sizes = allWindows[view]?.desktopStyles;
  }

  React.useEffect(() => {
    const windowElem = windowElemRef.current;
    const draggableElem = draggableElemRef.current;

    if (!windowElem || !draggableElem) {
      return;
    }

    let isDragging = false;

    const dragStart = {
      offsetTop: 0,
      offsetLeft: 0,
      cropRectX: 0,
      cropRectY: 0,

      left: 0,
      top: 0,
    };

    const dragDelta = {
      from: { x: 0, y: 0 },
      to: { x: 0, y: 0 },
    };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;

      dragDelta.from.x = Math.round(e.clientX);
      dragDelta.from.y = Math.round(e.clientY);

      dragDelta.to.x = dragDelta.from.x;
      dragDelta.to.y = dragDelta.from.y;

      // TODO these are whole values, but everywhere else I'm using fractional pixels
      dragStart.left = windowElem.offsetLeft;
      dragStart.top = windowElem.offsetTop;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) {
        return;
      }

      dragDelta.to.x = e.clientX;
      dragDelta.to.y = e.clientY;

      let newTop = dragStart.top + (dragDelta.to.y - dragDelta.from.y);
      let newLeft = dragStart.left + (dragDelta.to.x - dragDelta.from.x);

      const { width: parentWidth, height: parentHeight } =
        windowElem.offsetParent!.getBoundingClientRect();

      const { width, height } = windowElem.getBoundingClientRect();

      newTop = clamp(newTop, 0, parentHeight - height);
      newLeft = clamp(newLeft, 0, parentWidth - width);

      windowElem.style.top = `${newTop}px`;
      windowElem.style.left = `${newLeft}px`;
    };

    const onMouseUp = () => {
      isDragging = false;

      dragDelta.from.x = 0;
      dragDelta.from.y = 0;
      dragDelta.to.x = 0;
      dragDelta.to.y = 0;
    };

    if (!isMobile) {
      draggableElem.addEventListener("mousedown", onMouseDown);
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    } else {
      draggableElem.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    }

    return () => {
      draggableElem.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [isMobile]);

  if (contents === null) {
    <span>😭</span>;
  }

  const WindowCloseButton = () => (
    <button
      className="window-3d-button"
      aria-label={`Close window: ${title}`}
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
    >
      <CloseIcon />
    </button>
  );

  const headingId = `${view}-heading`;

  return (
    <div
      id={id}
      className="window-outer desktop-window"
      ref={windowElemRef}
      style={{
        ...position,
        ...sizes?.outerStyles
      }}
      onClick={() => {
        bringToFront(id);
      }}
      tabIndex={-1}
      aria-labelledby={headingId}
    >
      <div className="window">
        <div className="window-header">
          <div className="window-draggable-div" ref={draggableElemRef}>
            <h1
              className="window-title"
              id={headingId}
              style={{ userSelect: "none" }}
            >
              {title}
            </h1>
          </div>
          <div className="window-header-buttons">
            <WindowCloseButton />
          </div>
        </div>
        <div className="window-inner" style={{ ...sizes?.innerStyles }}>
          <div className="window-inner-scroll">{contents}</div>
        </div>
      </div>
    </div>
  );
};
