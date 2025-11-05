// import BskyFeed from "./components/windows/BskyFeed";
import { EmailMe } from "./components/windows/EmailMe";
import { /*ButterflyIcon,*/ CameraIcon, HeartIcon, MailIcon } from "./components/Icons";
import { CurrentStatus } from "./components/windows/CurrentStatus";
import { Desktop } from "./components/Desktop";
import { Interstitial } from "./components/Interstitial";
import PhotoBlog from "./components/windows/PhotoBlog";

export default function Homepage() {
  return (
    <Interstitial>
      <Desktop
        childWindows={{
          status: {
            id: "status",
            title: "current status",
            view: "status",
            windowContents: <CurrentStatus />,
            icon: <HeartIcon />,
          },
          // bsky: {
          //   id: "bsky",
          //   title: "my bsky posts",
          //   view: "bsky",
          //   windowContents: <BskyFeed />,
          //   icon: <ButterflyIcon />,
          // },
          email: {
            id: "email",
            title: "email me",
            view: "email",
            windowContents: <EmailMe />,
            icon: <MailIcon />,
          },
          photos: {
            id: "photos",
            title: "travel photos & notes",
            view: "photos",
            windowContents: <PhotoBlog />,
            icon: <CameraIcon />,
          },
        }}
      />
    </Interstitial>
  );
}