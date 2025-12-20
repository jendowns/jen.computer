/* eslint-disable @typescript-eslint/no-empty-object-type */
import React from "react";
import { Recyclebin } from "./windows/RecycleBin";
import { Blog } from "./windows/Blog";
import { EmailMe } from "./windows/EmailMe";
import { CurrentStatus } from "./windows/CurrentStatus";
import { Help } from "./windows/Help";
import { Menu } from "./menu/Menu";
import { Weirdweb } from "./windows/WeirdWeb";
import { AudioPlayer } from "./windows/AudioPlayer";

export type ViewType =
  | "email"
  | "status"
  | "blog"
  | "bin"
  | "help"
  | "menu"
  | "weird"
  | "audioplayer";

export interface IDesktopContext {
  visibleWindowIds: ViewType[];
  showWindow: (id: ViewType) => void;
  hideWindow: (id: ViewType) => void;
  bringToFront: (id: ViewType) => void;
  isMobile: boolean;
  allWindows: { [key in ViewType]: IWindowProps };
  desktopWindowIds: string[];
  menuIds: string[];
}

export interface IWindowProps {
  id: ViewType;
  windowContents?: React.ReactNode;
  title?: string;
  icon?: React.ReactNode;
  view?: ViewType;
  position?: "start" | "end";
  className?: string;
  children?: React.ReactNode;
  mobileStyles?: {
    outerStyles: {};
    innerStyles: {};
  };
  desktopStyles?: {
    outerStyles: {};
    innerStyles: {};
  };
}

// eslint-disable-next-line react-refresh/only-export-components
export const DesktopContext = React.createContext<IDesktopContext>({
  visibleWindowIds: [],
  showWindow: () => {},
  hideWindow: () => {},
  bringToFront: () => {},
  isMobile: false,
  allWindows: {
    email: {
      id: "email",
    },
    status: {
      id: "status",
    },
    blog: {
      id: "blog",
    },
    bin: {
      id: "bin",
    },
    help: {
      id: "help",
    },
    menu: {
      id: "menu",
    },
    weird: {
      id: "weird",
    },
    audioplayer: {
      id: "audioplayer",
    },
  },
  desktopWindowIds: [],
  menuIds: [],
});

export const DesktopProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [visibleWindowIds, setVisibleWindowIds] = React.useState<ViewType[]>([
    "audioplayer",
  ]);
  const [isMobile, setIsMobile] = React.useState(false);

  const desktopWindowIds: ViewType[] = [
    "status",
    "blog",
    "weird",
    "audioplayer",
    "bin",
  ];
  const menuIds: ViewType[] = ["menu"];

  const mobilePosition = {
    position: "absolute" as const,
    top: "10px",
    left: 0,
    right: 0,
  };
  // TODO: improve this
  const allWindows = {
    status: {
      id: "status" as const,
      title: "now.txt",
      windowContents: <CurrentStatus />,
      icon: (
        <img
          src="https://res.cloudinary.com/jendowns/image/upload/v1763886513/jen.computer/images/txt.png"
          alt=""
        />
      ),
      position: "start" as const,
      desktopStyles: {
        outerStyles: {},
        innerStyles: {
          width: "375px",
          height: "380px",
          backgroundColor: "#f9f8f4",
        },
        mobileStyles: {
          outerStyles: {
            ...mobilePosition,
            width: "100%",
            maxWidth: "97vw",
            backgroundColor: "#f9f8f4",
            height: "97%",
          },
          innerStyles: {},
        },
      },
    },
    //   id: "bsky" as const,
    //   title: "my bsky posts",
    //   windowContents: <BskyFeed />,
    //   icon: <ButterflyIcon />,
    //   desktopStyles: {
    //     outerStyles: {},
    //     innerStyles: {
    //       width: "500px",
    //       maxHeight: "700px",
    //     },
    //   },
    //   mobileStyles: {
    //     outerStyles: {},
    //     innerStyles: {},
    //   },
    // },
    email: {
      id: "email" as const,
      title: "e-mail me",
      windowContents: <EmailMe />,
      icon: (
        <img
          src="https://res.cloudinary.com/jendowns/image/upload/v1763886508/jen.computer/images/email.png"
          alt="email icon"
        />
      ),
      position: "start" as const,
      desktopStyles: {
        outerStyles: {},
        innerStyles: {
          width: "350px",
          backgroundColor: "#ede9d9",
        },
      },
      mobileStyles: {
        outerStyles: {
          ...mobilePosition,
          width: "100%",
          maxWidth: "97vw",
          backgroundColor: "#ede9d9",
        },
        innerStyles: {},
      },
    },
    blog: {
      id: "blog" as const,
      title: "my blog",
      windowContents: <Blog />,
      icon: (
        <img
          src="https://res.cloudinary.com/jendowns/image/upload/v1763886520/jen.computer/images/huh.jpg"
          alt="favicon for my blog website, jen.dev"
        />
      ),
      position: "start" as const,
      desktopStyles: {
        outerStyles: {
          width: "100%",
          maxWidth: "600px",
          height: "100%",
          maxHeight: "70vh",
        },
        innerStyles: {
          width: "100%",
          height: "100%",
        },
      },
      mobileStyles: {
        outerStyles: {
          ...mobilePosition,
          width: "100%",
          maxWidth: "97vw",
          height: "97%",
        },
        innerStyles: {},
      },
    },
    bin: {
      id: "bin" as const,
      title: "recycle bin",
      windowContents: <Recyclebin />,
      icon: (
        <img
          src="https://res.cloudinary.com/jendowns/image/upload/v1763886511/jen.computer/images/recycle.png"
          alt="recycle bin icon"
        />
      ),
      position: "end" as const,
      desktopStyles: {
        outerStyles: {},
        innerStyles: {
          width: "350px",
          backgroundColor: "#ede9d9",
        },
      },
      mobileStyles: {
        outerStyles: {
          ...mobilePosition,
          width: "100%",
          maxWidth: "97vw",
          backgroundColor: "#ede9d9",
        },
        innerStyles: {},
      },
    },
    help: {
      id: "help" as const,
      title: "help and support",
      windowContents: <Help />,
      desktopStyles: {
        outerStyles: {},
        innerStyles: {
          width: "350px",
          backgroundColor: "#ede9d9",
        },
      },
      mobileStyles: {
        outerStyles: {
          ...mobilePosition,
          width: "100%",
          maxWidth: "97vw",
          backgroundColor: "#ede9d9",
        },
        innerStyles: {},
      },
    },
    menu: {
      id: "menu" as const,
      windowContents: <Menu />,
      // TODO: unnecessary for this "window"
      // so make this less boilerplate
      desktopStyles: {
        outerStyles: {},
        innerStyles: {},
      },
      mobileStyles: {
        outerStyles: {},
        innerStyles: {},
      },
    },
    weird: {
      id: "weird" as const,
      title: "weird web october",
      windowContents: <Weirdweb />,
      icon: (
        <img
          src="https://res.cloudinary.com/jendowns/image/upload/v1764030722/jen.computer/images/heh.png"
          alt="favicon for my Weird Web October site, weird.jen.dev"
        />
      ),
      position: "start" as const,
      desktopStyles: {
        outerStyles: {
          width: "100%",
          maxWidth: "800px",
          height: "100%",
          maxHeight: "80vh",
        },
        innerStyles: {
          width: "100%",
          height: "100%",
        },
      },
      mobileStyles: {
        outerStyles: {
          ...mobilePosition,
          width: "100%",
          maxWidth: "97vw",
          height: "97%",
        },
        innerStyles: {},
      },
    },
    audioplayer: {
      id: "audioplayer" as const,
      title: "Sonic Adventure OST",
      windowContents: <AudioPlayer />,
      icon: (
        <img
          src="https://res.cloudinary.com/jendowns/image/upload/v1765008063/jen.computer/images/cd.png"
          alt="CD icon with a music note"
        />
      ),
      position: "start" as const,
      desktopStyles: {
        outerStyles: {},
        innerStyles: {
          width: "300px",
          backgroundColor: "#ede9d9",
        },
      },
      mobileStyles: {
        outerStyles: {
          ...mobilePosition,
          width: "100%",
          maxWidth: "97vw",
          backgroundColor: "#ede9d9",
        },
        innerStyles: {},
      },
    },
  };

  React.useEffect(() => {
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

  React.useEffect(() => {
    // only show active window on mobile
    if (isMobile) {
      setVisibleWindowIds((prev) => [prev[prev.length - 1]]);
    }
  }, [isMobile]);

  const showWindow = React.useCallback(
    (id: ViewType) => {
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
    (id: ViewType) => {
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
    <DesktopContext.Provider
      value={{
        visibleWindowIds,
        showWindow,
        hideWindow,
        bringToFront,
        isMobile,
        allWindows,
        desktopWindowIds,
        menuIds,
      }}
    >
      {children}
    </DesktopContext.Provider>
  );
};
