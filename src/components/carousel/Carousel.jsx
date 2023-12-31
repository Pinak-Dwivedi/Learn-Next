"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import carousel1 from "@/assets/images/carousel1.jpg";
import carousel2 from "@/assets/images/carousel2.jpg";
import carousel3 from "@/assets/images/carousel3.jpg";
import carousel4 from "@/assets/images/carousel4.jpg";
import carousel5 from "@/assets/images/carousel5.jpg";

export default function Carousel() {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const [activeImageClass, setActiveImageClass] = useState("translateX(0%)");
  // const [activeImageClass, setActiveImageClass] = useState("-translate-x-0");

  const images = [carousel1, carousel2, carousel3, carousel4, carousel5];

  // need to include possible classes for tailwind to work
  // can't generalize 100% according to dynamic carousel images count with just tailwind

  // let possibleActiveImageClass = [
  //   "-translate-x-0",
  //   "-translate-x-1/3",
  //   "-translate-x-2/3",
  // ];

  // Generalizing with inline css

  const imagesCustomStyle = {
    width: `${images.length * 100}%`,
    transform: activeImageClass,
  };

  useEffect(() => {
    let intervalId = setInterval(() => {
      nextImage();
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  });

  function nextImage() {
    let newIndex = 0;

    if (activeImageIndex === images.length - 1) {
      newIndex = 0;
    } else {
      newIndex = activeImageIndex + 1;
    }
    setActiveImageIndex(newIndex);
    setActiveImageClass(`translateX(-${(100 / images.length) * newIndex}%)`);

    /* 
      (100 / images.length) * newIndex
      100 means total width(100% width) of images container
      
      (/ images.length) means total width of images container is distributed in no. of images 
      e.g. 3
      
      (* newIndex) means if current image index is 
      0 then translate -0% 
      1 then translate 100 / 3 = 33.33 * 1
      2 then translate 100 / 3 = 33.33 * 2
      ...      
    */
  }

  function prevImage() {
    let newIndex = 0;

    if (activeImageIndex === 0) {
      newIndex = images.length - 1;
    } else newIndex = activeImageIndex - 1;

    setActiveImageIndex(newIndex);
    setActiveImageClass(`translateX(-${(100 / images.length) * newIndex}%)`);
  }

  return (
    <div className="relative mx-auto h-screen w-11/12 max-w-5xl overflow-hidden rounded-xl">
      <div
        style={{ ...imagesCustomStyle }}
        className={`flex h-full transition-transform duration-500 ease-in-out`}
      >
        {images.map((imageSrc, i) => (
          <div key={i} className="relative h-full w-full">
            <Image
              src={imageSrc}
              fill
              sizes="100"
              priority
              alt="carousel slide"
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>

      <button
        className="absolute left-4 top-1/2 h-[10%] -translate-y-1/2 rounded-full bg-sky-400 px-2 text-slate-100 outline-none transition-[scale] duration-300 hover:scale-110 hover:bg-blue-500"
        onClick={prevImage}
      >
        &lt;
      </button>
      <button
        className="absolute right-4 top-1/2 h-[10%] -translate-y-1/2 rounded-full bg-sky-400 px-2 text-slate-100 outline-none transition-[scale] duration-300 hover:scale-110 hover:bg-blue-500"
        onClick={nextImage}
      >
        &gt;
      </button>
    </div>
  );
}
