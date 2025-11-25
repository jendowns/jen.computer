export const convertImageData = async (url: string): Promise<ImageData> => {
  return new Promise((res) => {
    const image = new Image();
    image.src = url;

    image.onload = () => {
      const { naturalWidth: width, naturalHeight: height } = image;
      const canvas = new OffscreenCanvas(width, height);
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        console.log("oops ;(");
        return null;
      }

      ctx.drawImage(image, 0, 0);
      res(ctx.getImageData(0, 0, width, height));
    };
  });
};
