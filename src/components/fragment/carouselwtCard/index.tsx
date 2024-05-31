import Image from "next/image";
import React, { Children, useEffect, useState } from "react";
import Loader from "../loader";

type PropsType = {
  children?: React.ReactNode;
  classname?: string;
  link?: string;
};

const CarouselWithChildren = (props: any) => {
  const { children, classname, link } = props;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const childArray = React.Children.toArray(children);

  const goToPrevious = () => {
    setCurrentImageIndex(
      currentImageIndex === 0 ? childArray.length - 1 : currentImageIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex(
      currentImageIndex === childArray.length - 1 ? 0 : currentImageIndex + 1
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
          {childArray.map((child, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 aspect-video group relative transition ease-in-out duration-300 justify-center align-middle"
            >
              {child}
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

export default CarouselWithChildren;
