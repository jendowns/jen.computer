import { AppBskyEmbedImages } from "@atproto/api";
import { Image } from "./Image";

interface IImageEmbedProps {
  content: AppBskyEmbedImages.View;
}
export const ImageEmbed = ({ content }: IImageEmbedProps) => {
  switch (content.images.length) {
    case 0:
      return null;
    case 1: {
      const image = content.images[0]!;
      return <Image url={image.thumb} label={image.alt} />;
    }
    default: {
      const images = content.images.map((image: { thumb: string; alt: string | undefined; }) => (
        <Image url={image.thumb} key={image.thumb} label={image.alt} />
      ));

      return images;
    }
  }
};
