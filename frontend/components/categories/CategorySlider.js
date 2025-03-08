import Link from "next/link";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const CategorySlider = ({ categories }) => {
  const [startIndex, setStartIndex] = useState(0);
  const totalItems = categories.length;

  const nextSlide = () => {
    setStartIndex((prev) => (prev + 1) % totalItems);
  };

  const prevSlide = () => {
    setStartIndex((prev) => (prev - 1 + totalItems) % totalItems);
  };

  return (
    <>
      <h1 className="text-[3rem] leading-[3rem] font-serif font-normal text-gray-800 my-16 text-center">Explore our categories</h1>

      <div className="relative mb-16 w-full max-w-5xl mx-auto overflow-hidden">
        <button onClick={prevSlide} className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#063732] hover:bg-[#CD9F51] text-white p-2 rounded-full shadow-lg z-10">
          <FaChevronLeft size={24} />
        </button>

        <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${startIndex * 25}%)` }}>
          {categories &&
            categories.map((cat, index) => (
              <div key={index} className="w-1/2 md:w-1/4 flex-shrink-0 flex flex-col items-center transition-all duration-500">
                <Link href="#" className="text-center">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-gray-300">
                    <img src={cat.icon ? API_URL + cat.icon : ""} alt={cat.name} className="w-full h-full object-cover" />
                  </div>
                  <p className="mt-2 text-sm md:text-lg font-medium text-gray-800">{cat.name}</p>
                </Link>
              </div>
            ))}
        </div>

        <button onClick={nextSlide} className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#063732] hover:bg-[#CD9F51] text-white p-2 rounded-full shadow-lg z-10">
          <FaChevronRight size={24} />
        </button>
      </div>
    </>
  );
};

export default CategorySlider;
