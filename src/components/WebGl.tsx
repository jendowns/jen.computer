/* eslint-disable  @typescript-eslint/no-explicit-any */

import React from "react";
import createRegl from "regl";

// todo:
// stop video element directly
// or use tick.cancel()

function isPowerOfTwo(value: number) {
  return value ? (value & (value - 1)) === 0 : false;
}

function shaderToyShaderFn({ shaderGlobals = "", shaderBody }: { shaderGlobals?: any, shaderBody: any}) {
  return function (regl: any, { resolution, textureSources }: { resolution: any, textureSources: any }) {
    const getTextureConfig = (textureSource: any) => {
      if (!textureSource) {
        return { data: null, width: 0, height: 0 };
      }

      const hasPoTDimensions =
        isPowerOfTwo(textureSource.width) && isPowerOfTwo(textureSource.height);

      if (!hasPoTDimensions) {
        console.warn(
          `Using "clamp" texture wrapping for non power-of-two texture`
        );
      }

      return {
        data: textureSource,
        ...(hasPoTDimensions
          ? {
              wrapS: "repeat",
              wrapT: "repeat",
            }
          : {
              wrapS: "clamp",
              wrapT: "clamp",
            }),
        min: "linear",
        mag: "linear",
        flipY: true,
      };
    };

    const channels = [
      regl.texture(getTextureConfig(textureSources[0])),
      regl.texture(getTextureConfig(textureSources[1])),
      regl.texture(getTextureConfig(textureSources[2])),
      regl.texture(getTextureConfig(textureSources[3])),
    ];

    const command = regl({
      vert: `
      precision mediump float;
  
      attribute vec2 position;
  
      void main() {
        gl_Position = vec4(position, 0, 1);
      }`,

      frag: ` 
      precision mediump float;
  
      uniform float iTime;
      uniform vec3 iResolution;
  
      uniform vec3 iChannelResolution[4];
      uniform sampler2D iChannel0;
      uniform sampler2D iChannel1;
      uniform sampler2D iChannel2;
      uniform sampler2D iChannel3;

      vec4 texture(sampler2D sampler, vec2 uv) {
        return texture2D(sampler, uv);
      }
  
      ${shaderGlobals}
  
      void main() {
        // ShaderToy "in" variable - many shaders don't use this!
        vec2 fragCoord = gl_FragCoord.xy;
        // ShaderToy "out" variable
        vec4 fragColor = vec4(vec3(0.0), 1.0);
        ${shaderBody}
        gl_FragColor = fragColor;
      }`,

      attributes: {
        position: regl.buffer([
          [-1, -1],
          [1, -1],
          [1, 1],
          [-1, -1],
          [1, 1],
          [-1, 1],
        ]),
      },

      uniforms: {
        iTime: regl.prop("time"),

        // third component is pixel aspect ratio
        iResolution: [resolution[0], resolution[1], 1],

        iChannel0: channels[0],
        iChannel1: channels[1],
        iChannel2: channels[2],
        iChannel3: channels[3],

        "iChannelResolution[0]": [
          channels[0]?.width ?? 0,
          channels[0]?.height ?? 0,
          1,
        ],
        "iChannelResolution[1]": [
          channels[1]?.width ?? 0,
          channels[1]?.height ?? 0,
          1,
        ],
        "iChannelResolution[2]": [
          channels[2]?.width ?? 0,
          channels[2]?.height ?? 0,
          1,
        ],
        "iChannelResolution[3]": [
          channels[3]?.width ?? 0,
          channels[3]?.height ?? 0,
          1,
        ],
      },

      cull: {
        enable: true,
        face: "back",
      },

      // This tells regl the number of vertices to draw in this command
      count: 6,
    });

    return (time: any) => {
      // Update each video channel each frame
      for (let i = 0; i < channels.length; i++) {
        if (textureSources[i] instanceof HTMLVideoElement) {
          channels[i].subimage(textureSources[i]);
        }
      }

      command({ time });
    };
  };
}

const Shader = {
  cycleTintColor: (regl: any, { positionAttribute, videoTexture }: { positionAttribute: any, videoTexture: any }) => {
    const command = regl({
      vert: `
      precision mediump float;

      attribute vec2 position;
      varying vec2 v_uv;

      void main() {
        v_uv = position.xy * 0.5 + 0.5;
        gl_Position = vec4(position, 0, 1);
      }`,

      frag: `
      precision mediump float;

      uniform vec4 color;
      uniform sampler2D video;
      varying vec2 v_uv;

      void main() {
        vec4 video_texel = texture2D(video, vec2(v_uv.x, 1.0 - v_uv.y));
        vec4 tint = mix(color, video_texel, 0.5);
        gl_FragColor = tint;
      }`,

      attributes: {
        position: positionAttribute,
      },

      uniforms: {
        color: regl.prop("color"),

        video: videoTexture,
      },

      cull: {
        enable: true,
        face: "back",
      },

      // This tells regl the number of vertices to draw in this command
      count: 6,
    });

    return (time: any) =>
      command({
        color: [
          Math.cos(time * 0.1),
          Math.sin(time * 0.08),
          Math.cos(time * 0.3),
          1,
        ],
      });
  },
  // https://www.shadertoy.com/view/XtBXDt
  vhsDistortion: shaderToyShaderFn({
    shaderGlobals: `
      #define time iTime
      #define resolution ( iResolution.xy )

      #define PI 3.14159265

      vec3 tex2D( sampler2D _tex, vec2 _p ){
        vec3 col = texture( _tex, _p ).xyz;
        if ( 0.5 < abs( _p.x - 0.5 ) ) {
          col = vec3( 0.1 );
        }
        return col;
      }

      float hash( vec2 _v ){
        return fract( sin( dot( _v, vec2( 89.44, 19.36 ) ) ) * 22189.22 );
      }

      float iHash( vec2 _v, vec2 _r ){
        float h00 = hash( vec2( floor( _v * _r + vec2( 0.0, 0.0 ) ) / _r ) );
        float h10 = hash( vec2( floor( _v * _r + vec2( 1.0, 0.0 ) ) / _r ) );
        float h01 = hash( vec2( floor( _v * _r + vec2( 0.0, 1.0 ) ) / _r ) );
        float h11 = hash( vec2( floor( _v * _r + vec2( 1.0, 1.0 ) ) / _r ) );
        vec2 ip = vec2( smoothstep( vec2( 0.0, 0.0 ), vec2( 1.0, 1.0 ), mod( _v*_r, 1. ) ) );
        return ( h00 * ( 1. - ip.x ) + h10 * ip.x ) * ( 1. - ip.y ) + ( h01 * ( 1. - ip.x ) + h11 * ip.x ) * ip.y;
      }

      float noise( vec2 _v ){
        float sum = 0.;
        for( int i=1; i<9; i++ )
        {
          sum += iHash( _v + vec2( i ), vec2( 2. * pow( 2., float( i ) ) ) ) / pow( 2., float( i ) );
        }
        return sum;
      }
    `,
    shaderBody: `
      vec2 uv = gl_FragCoord.xy / resolution;
      vec2 uvn = uv;
      vec3 col = vec3( 0.0 );

      // tape wave
      uvn.x += ( noise( vec2( uvn.y, time ) ) - 0.5 )* 0.005;
      uvn.x += ( noise( vec2( uvn.y * 100.0, time * 10.0 ) ) - 0.5 ) * 0.01;

      // tape crease
      float tcPhase = clamp( ( sin( uvn.y * 8.0 - time * PI * 1.2 ) - 0.92 ) * noise( vec2( time ) ), 0.0, 0.01 ) * 10.0;
      float tcNoise = max( noise( vec2( uvn.y * 100.0, time * 10.0 ) ) - 0.5, 0.0 );
      uvn.x = uvn.x - tcNoise * tcPhase;

      // switching noise
      float snPhase = smoothstep( 0.03, 0.0, uvn.y );
      uvn.y += snPhase * 0.3;
      uvn.x += snPhase * ( ( noise( vec2( uv.y * 100.0, time * 10.0 ) ) - 0.5 ) * 0.2 );
        
      col = tex2D( iChannel0, uvn );
      col *= 1.0 - tcPhase;
      col = mix(
        col,
        col.yzx,
        snPhase
      );

      // bloom
      for( float x = -4.0; x < 2.5; x += 1.0 ){
        col.xyz += vec3(
          tex2D( iChannel0, uvn + vec2( x - 0.0, 0.0 ) * 7E-3 ).x,
          tex2D( iChannel0, uvn + vec2( x - 2.0, 0.0 ) * 7E-3 ).y,
          tex2D( iChannel0, uvn + vec2( x - 4.0, 0.0 ) * 7E-3 ).z
        ) * 0.1;
      }
      col *= 0.6;

      // ac beat
      col *= 1.0 + clamp( noise( vec2( 0.0, uv.y + time * 0.2 ) ) * 0.6 - 0.25, 0.0, 0.1 );

      fragColor = vec4( col, 1.0 );
    `,
  }),
  // https://www.shadertoy.com/view/MllSzj
  dither: shaderToyShaderFn({
    shaderBody: `if (pow(texture(iChannel0, fragCoord/8.).r, .45) < texture(iChannel1, fragCoord/iResolution.xy).r) {
      fragColor++;
    }`,
  }),
};

export function WebGl({
  src,
  videoSourceRef,
}: {
  src?: string;
  videoSourceRef?: React.RefObject<HTMLVideoElement | null>;
}) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    let regl: any, tick: any;

    const renderVideoWithShaderAsync = async () => {
      const videoElem =
        videoSourceRef?.current ?? document.createElement("video");

      if (src) {
        videoElem.muted = true;
        videoElem.autoplay = true;
        videoElem.loop = true;
        videoElem.playsInline = true;
        videoElem.preload = 'auto'
        videoElem.src = src;
        videoElem.play();
      }

      await new Promise((resolve) => {
        videoElem.onloadeddata = resolve;
      });

      const imageElem = new Image();
      imageElem.src = "/images/bayer-8x8.png";
      await new Promise((resolve) => {
        imageElem.onload = resolve;
      });

      const canvas = canvasRef.current;
      if (!canvas) {
        return null;
      }
      canvas.width = videoElem.videoWidth;
      canvas.height = videoElem.videoHeight;

      regl = createRegl({ canvas });

      const renderFrame = Shader.dither(regl, {
        resolution: [canvas.width, canvas.height],
        textureSources: [imageElem, videoElem],
      });

      tick = regl.frame(({ time }: { time: any}) => {
        // clear contents of the drawing buffer
        regl.clear({
          color: [0, 0, 0, 0],
          depth: 1,
        });

        renderFrame(time);
      });
    };

    renderVideoWithShaderAsync();

    return () => {
      tick?.cancel();
      regl?.destroy();
    };
  }, []);

  return <canvas className="email-video" ref={canvasRef} />;
}

/* eslint-enable  @typescript-eslint/no-explicit-any */
