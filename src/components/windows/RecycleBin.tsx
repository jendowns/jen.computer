export const Recyclebin = () => {
  return (
    <div style={{ display: 'grid', placeSelf: 'center', height: '100%', padding: '2rem', gap: '1rem'}}>
      <video
        className="email-video"
        src="./videos/plink.mp4"
        muted
        playsInline
        loop
        autoPlay
        style={{
          outline: '1px dotted #222',
          outlineOffset: '1px',
          height: '200px',
          width: '200px',
          placeSelf: 'center',
        }}
      />
      <span style={{ placeSelf: 'center'}}>*plink*</span>
    </div>
  );
};
