// import BskyFeed from "./components/windows/BskyFeed";
import { EmailMe } from "./components/windows/EmailMe";
import { Blog } from "./components/windows/Blog";
import { CurrentStatus } from "./components/windows/CurrentStatus";
import { Desktop } from "./components/Desktop";
import { Interstitial } from "./components/Interstitial";
import PhotoBlog from "./components/windows/PhotoBlog";
import { Recyclebin } from "./components/windows/RecycleBin";

export default function Homepage() {
  return (
    <Interstitial>
      <Desktop
        childWindows={{
          status: {
            id: "status",
            title: "now.txt",
            view: "status",
            windowContents: <CurrentStatus />,
            icon: <img src="./images/txt.png" alt="" />,
            position: 'start',
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
            icon: <img src="./images/email.png" alt="globe icon" />,
            position: 'start',
          },
          photos: {
            id: "photos",
            title: "travel photos",
            view: "photos",
            windowContents: <PhotoBlog />,
            icon: <img src="./images/camera.png" alt="camera icon" />,
            position: 'start',
          },
          blog: {
            id: "blog",
            title: "my blog",
            view: "blog",
            windowContents: <Blog />,
            icon: <img src="./images/huh.jpg" alt="favicon for my blog website, jen.dev" />,
            position: 'start',
          },
          bin: {
            id: "bin",
            title: "recycle bin",
            view: "bin",
            windowContents: <Recyclebin />,
            icon: <img src="./images/recycle.png" alt="recycle bin icon" />,
            position: 'end',
          },
        }}
      />
    </Interstitial>
  );
}
