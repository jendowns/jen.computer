'use client';

import * as React from 'react';

import { dither } from "../utils/dither";
import { convertImageData } from "../utils/imageData";

export const DitheredImage = ({ dataUrl, label }: { dataUrl: string; label?: string }) => {
  const canvasElem = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasElem.current;
    const ctx = canvas?.getContext('2d');

    if (!canvas || !ctx) {
      throw new Error('Could not initialize canvas');
    }

    const drawImage = async () => {
      try {
        let imageData = await convertImageData(dataUrl);
        imageData = dither({ imageData, threshold: 4, type: 'floydsteinberg' })
        
        canvas.width = imageData.width;
        canvas.height = imageData.height;

        ctx.putImageData(imageData, 0, 0);
      } catch(e) {
        console.error('oopsie :(', e);
      }
    }

    drawImage();
  }, [dataUrl]);

  return (
    <canvas ref={canvasElem} aria-label={label} />
  );
}