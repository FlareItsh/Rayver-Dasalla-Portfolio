import React, { useState, useEffect } from 'react';
import Button from '../components/ui/Button'; // Adjust the import path as needed

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(1);
  const totalImages = 6;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev % totalImages) + 1);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const imagePath = `/src/assets/images/me_${currentImage}.png`;

  return (
    <div className="flex h-[80vh] flex-col px-4 md:px-20">
      <div className="flex flex-1 flex-col items-center justify-center md:flex-row md:items-center md:justify-center md:gap-32 md:py-12">
        <div className="text-textPrimary order-2 flex max-w-md justify-center md:order-1">
          <div className="flex flex-col text-center md:text-left">
            <span className="text-textPrimary/50 w-full text-left text-sm font-medium italic md:text-base">
              Hi I'm
            </span>
            <h1 className="w-full text-left text-6xl font-bold md:text-6xl lg:text-9xl">RAYVER</h1>
            <h1 className="w-full text-right text-6xl font-bold md:text-6xl lg:text-9xl">
              DASALLA
            </h1>
            <span className="text-textPrimary/50 w-full text-right text-sm font-medium italic md:text-base">
              (Flare)
            </span>
          </div>
        </div>
        <div className="order-1 flex max-w-md justify-center md:order-2">
          <img
            src={imagePath}
            alt={`Me ${currentImage}`}
            className="aspect-square max-w-md scale-75 rounded-lg object-cover drop-shadow-2xl lg:scale-100" // Increased scale-50 to scale-75 on smaller screens for bigger image
          />
        </div>
      </div>
      <div className="flex justify-center pb-8 md:pb-12">
        <Button variant="solid" className="text-2xl">
          LET'S TALK?
        </Button>
      </div>
    </div>
  );
}
