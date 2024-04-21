import Image from "next/image";
import React, { useEffect, useState } from "react";

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const goToPrevious = () => {
    setCurrentImageIndex(
      currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex(
      currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1
    );
  };

  useEffect(() => {
    const slideInterval = setInterval(goToNext, 10000);
    return () => {
      clearInterval(slideInterval);
    };
  }, [currentImageIndex]);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <div className="relative w-3/4">
      {isLoading && <div className="carousel-loading">Loading...</div>}
      <div
        className={`carousel rounded-sm ${
          isLoading ? "animate-pulse" : "overflow-x-hidden"
        } relative`}
      >
        <div
          className="slider flex"
          style={{
            transform: `translateX(-${currentImageIndex * 100}%)`,
            transition: "transform 0.5s ease",
          }}
        >
          {images.map((image, index) => (
            <div key={index} className={` w-full flex-shrink-0 aspect-video`}>
              <Image
                src={image}
                alt={`Image ${index}`}
                width={400}
                height={400}
                onLoad={() => setIsLoading(false)}
              />
            </div>
          ))}
        </div>
      </div>
      <button
        className="absolute top-1/2 transform -translate-y-1/2 left-0 bg-gray-500 text-white p-2 rounded-full"
        onClick={goToPrevious}
      >
        &lt;
      </button>
      <button
        className="absolute top-1/2 transform -translate-y-1/2 right-0 bg-gray-500 text-white p-2 rounded-full"
        onClick={goToNext}
      >
        &gt;
      </button>
    </div>
  );
};

export default Carousel;
