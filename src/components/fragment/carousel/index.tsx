import Image from "next/image";
import React, { useEffect, useState } from "react";
import Loader from "../loader";

interface CarouselProps {
  images: string[];
  titles: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images, titles }) => {
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
  }, [currentImageIndex, goToNext]);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <div className="relative md:w-auto w-full">
      {isLoading && <div className="carousel-loading"></div>}
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
            <div
              key={index}
              className="w-full flex-shrink-0 aspect-video group relative transition ease-in-out duration-300 justify-center align-middle"
            >
              <Image
                src={image}
                alt={`Image ${index}`}
                width={600}
                height={600}
                onLoad={() => setIsLoading(false)}
                className="rounded-xl transition-transform duration-300 "
              />
              <h2 className="absolute bottom-0 left-0 w-full text-center text-white bg-black bg-opacity-50 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out rounded-b-lg">
                {titles[index]}
              </h2>
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
