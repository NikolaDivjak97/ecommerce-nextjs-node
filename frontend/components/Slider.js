import { useState, useEffect } from "react";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa6";

export default function Slider({ images }) {
  const [index, setIndex] = useState(0);

  const changeSliderImage = (index) => {
    setIndex(index);

    const sliderContainer = document.querySelector(".slider-container");
    const sliderDivs = document.querySelectorAll(".slide");
    const sliderDivSize = sliderDivs[0].offsetWidth;
    const position = index * sliderDivSize;

    sliderContainer.scroll({
      left: position,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    setInterval(() => {
      setIndex((prevIndex) => {
        const newIndex = prevIndex >= images.length - 1 ? 0 : prevIndex + 1;
        changeSliderImage(newIndex);
      });
    }, 5000);
  }, []);

  return (
    <div className="slider">
      <div className="slider-container relative flex overflow-hidden w-full h-[70vh]">
        {images &&
          images.map((image, rowIndex) => (
            <div key={rowIndex} className="slide flex-none h-full overflow-hidden">
              <img src={image} alt="No Image." className="w-[100vw] h-100 object-contain" />
            </div>
          ))}
      </div>

      <div className="font-serif font-normal absolute left-[10%] top-[27%] text-[#1A1A1A] flex flex-col gap-8 text-left">
        <div className="flex flex-col gap-lg-4 gap-md-2 gap-sm-1 gap-4 bg-white/5 backdrop-blur-md rounded-lg p-5">
          <h1 className="mt-0 text-xl leading-snug sm:text-2xl sm:leading-tight md:text-3xl md:leading-snug lg:text-4xl lg:leading-tight xl:text-[3.8rem] xl:leading-[3.8rem] text-left mb-0">Welcome to our shop</h1>
          <h2 className="mt-0 text-xl leading-snug sm:text-2xl sm:leading-tight md:text-3xl md:leading-snug lg:text-4xl lg:leading-tight xl:text-[1.7rem] xl:leading-[1.7rem] text-left mb-0">Find a perfect present for yourself</h2>
        </div>

        <Link href="/shop" className="flex w-64 mt-2 rounded justify-center items-center gap-2 p-3 bg-[#000] hover:bg-[#222] text-[#fefefe] text-[24px] font-semibold">
          Buy now
          <FaAngleRight />
        </Link>

        <div className="flex justify-start ">{images && images.map((row, rowIndex) => <div key={rowIndex} onClick={() => changeSliderImage(rowIndex)} className={`dot w-8 h-1 mx-4 bg-[#063732] cursor-pointer ${rowIndex === index ? "dot-active bg-[#CD9F51] w-16" : ""}`}></div>)}</div>
      </div>
    </div>
  );
}
