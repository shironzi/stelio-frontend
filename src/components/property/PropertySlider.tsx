import { useState } from "react";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import type { PropertyImage } from "../../context/PropertyContext";

const PropertySlider = ({ images }: { images: File[] | PropertyImage[] }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const imageUrls = images.map((image) =>
    image instanceof File ? URL.createObjectURL(image) : image.url,
  );

  const onNext = () => {
    if (currentImage < images.length - 1) {
      setCurrentImage(currentImage + 1);
    } else {
      setCurrentImage(0);
    }
  };

  const onPrev = () => {
    if (currentImage > 0) {
      setCurrentImage(currentImage - 1);
    } else {
      setCurrentImage(images.length - 1);
    }
  };

  const onImageNavigation = (index: number) => {
    setCurrentImage(index);
  };

  return (
    <div className="relative bg-dark-800 min-h-[520px]">
      {/* Hero image section */}
      <div className="relative w-full h-[320px] bg-dark-700 overflow-hidden">
        <img
          src={imageUrls[currentImage]}
          alt={`property-image-${currentImage}`}
          className="w-full h-full object-cover opacity-[0.85]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(21,24,32,0.95)]"></div>
        <div className="absolute top-1/2 left-4 right-4 flex justify-between -translate-y-1/2">
          <div
            onClick={onPrev}
            className="w-9 h-9 bg-dark-900/60 rounded-full flex items-center justify-center text-[14px] cursor-pointer text-[#e8e6e1] border border-white/[0.15]"
          >
            <MdNavigateBefore />
          </div>
          <div
            onClick={onNext}
            className="w-9 h-9 bg-dark-900/60 rounded-full flex items-center justify-center text-[14px] cursor-pointer text-[#e8e6e1] border border-white/[0.15]"
          >
            <MdNavigateNext />
          </div>
        </div>

        {/* Dot navigation */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-[5px]">
          {images.map((_, index) => (
            <div
              key={index}
              onClick={() => onImageNavigation(index)}
              className={`s-dot w-[5px] h-[5px] rounded-full bg-white/30 cursor-pointer ${
                index === currentImage ? "bg-white" : ""
              }`}
            ></div>
          ))}
        </div>
      </div>

      {/* Optional: Any additional content (like property details) can be added here */}
    </div>
  );
};

export default PropertySlider;
