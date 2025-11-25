import { VideoLoop } from "../VideoLoop";

export const Recyclebin = () => {
  return (
    <div style={{ display: 'grid', placeSelf: 'center', height: '100%', padding: '2rem', gap: '1rem'}}>
      <VideoLoop src="https://res.cloudinary.com/jendowns/video/upload/v1763886533/jen.computer/videos/plink.mp4" height="200px" width="200px" />
      <span style={{ placeSelf: 'center'}}>*plink*</span>
    </div>
  );
};
