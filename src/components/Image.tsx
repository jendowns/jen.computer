// import { Buffer } from "node:buffer";
// import { DitheredImage } from "./DitheredImage";

// export const Image = async ({ url, label }: { url: string; label?: string }) => {
//   await new Promise(r => setTimeout(r, 5000));
//   // Cache response for 60 seconds
//   const dataUrl = await fetch(url)
//     .then(r => Promise.all([r.headers, r.arrayBuffer()] as const))
//     .then(([headers, body]) => {
//       return `data:${headers.get("Content-Type")};base64,${Buffer.from(body).toString('base64')}`;
//     });

//   return (
//     <DitheredImage dataUrl={dataUrl} label={label} />
//   )
// }

// TODO: for now, no server side components

interface IImageProps {
  url: string;
  label?: string;
}

export const Image = (props: IImageProps) => {
  const {url, label} = props;

  return <img src={url} alt={label} />
}