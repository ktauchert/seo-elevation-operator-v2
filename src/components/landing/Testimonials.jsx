import React from "react";

import Carousel from "../custom/Carousel";
import testimonials from "@/helper/testimonials-data";

const Testimonials = (props) => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <section id="testimonials" className="h-full flex flex-col px-5 md:px-0">
      <h2 className="flex text-4xl md:text-6xl items-center justify-center font-bold text-slate-100 mt-20 mb-10 w-full relative">
        <span className="absolute top-1/2 -right-1/2 -translate-x-1/2 w-full h-10 bg-gradient-to-r from-transparent to-transparent via-cyan-600"></span>
        <span
          className="relative"
          style={{ textShadow: "0px 3px 3px #003942ed" }}
        >
          Testimonials
        </span>
      </h2>
      <article className="w-full md:w-3/4 lg:w-3/4 mx-auto m-5 p-5 md:p-10">
        <Carousel>
          {testimonials.map((item, index) => {
            return (
              <div
                className="text-slate-800 p-5 border rounded-lg backdrop-blur-sm bg-slate-100/70 shadow-md border-cyan-500 overflow-hidden min-h-[240px] md:h-[240px] flex flex-col"
                key={index}
              >
                <div className="card-header text-xl sm:text-xl md:text-3xl mb-2 font-bold">
                  <div className="card-title">
                    <h3>{item.title}</h3>
                  </div>
                </div>
                <div className="card-body text-lg sm:text-xl md:text-2xl flex-1">
                  <p>{item.text}</p>
                </div>
                <div className="card-footer flex justify-end">
                  <div className="card-quote md:text-sm italic">
                    <p>{item.source}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </Carousel>
      </article>
    </section>
  );
};

export default Testimonials;
