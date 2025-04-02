"use client";
import React, { PropsWithChildren, useEffect, useState } from "react";
import {
  IoChevronBackCircleOutline,
  IoChevronForwardCircleOutline,
} from "react-icons/io5";
import { IoChevronForwardOutline } from "react-icons/io5";

import "./carousel.scss"; // Add your CSS styles here

const Carousel = (props: PropsWithChildren) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const children = React.Children.toArray(props.children);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % children.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + children.length) % children.length
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className={`carousel-container py-5 relative`}>
      <button
        className="absolute -left-10 top-1/2 -translate-y-1/2 z-10 text-slate-200 hover:text-orange-600 transition-all"
        onClick={prevSlide}
      >
        <IoChevronBackCircleOutline className="text-4xl" />
      </button>
      <div className="relative w-full overflow-hidden">
        <div
          className="carousel-slides w-full"
          style={{
            display: "flex",
            transition: "transform 0.5s ease-in-out",
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {React.Children.map(children, (child, index) => (
            <div
              className={`carousel-slide min-w-full box-border${
                index === currentIndex ? " active " : ""
              }`}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
      <button
        className="absolute -right-10 top-1/2 -translate-y-1/2 text-slate-200 hover:text-orange-600 transition-all"
        onClick={nextSlide}
      >
        <IoChevronForwardCircleOutline className="text-4xl" />
      </button>
      <div className="carousel-indicators">
        {children.map((_, index) => (
          <button
            key={index}
            className={index === currentIndex ? "active" : ""}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
