import React, { useEffect, useRef, useState } from "react";
import { decode } from "blurhash";

const SmoothBlurImage = ({ hash, src, alt, width = 400, height = 300 }) => {
  const canvasRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !hash) return;

    const pixels = decode(hash, 32, 32);
    const ctx = canvas.getContext("2d");
    const imageData = new ImageData(pixels, 32, 32);
    ctx.putImageData(imageData, 0, 0);
  }, [hash]);

  const handleImageLoad = () => {
    setLoaded(true);
  };

  return (
    <div style={{ position: "relative", width, height }}>
      <canvas
        ref={canvasRef}
        width={32}
        height={32}
        style={{
          width: "100%",
          height: "100%",
          filter: "blur(20px)",
          transform: "scale(1.1)",
          transition: "opacity 0.5s ease-in-out", // Adjust transition timing
          opacity: loaded ? 0 : 1,
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
      <img
        src={src}
        alt={alt}
        onLoad={handleImageLoad}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "opacity 0.5s ease-in-out", // Adjust transition timing
          opacity: loaded ? 1 : 0,
        }}
      />
    </div>
  );
};

export default SmoothBlurImage;
