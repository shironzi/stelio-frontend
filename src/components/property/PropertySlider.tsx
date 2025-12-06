import "@/styles/property/propertySlider.css";
import { useState } from "react";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { GoDot, GoDotFill } from "react-icons/go";

const PropertySlider = ({ images }: { images: string[] }) => {
  const [currentImage, setCurrentImage] = useState(0);

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
    <div className="property-slider-container">
      <button
        className={`property-slider-button property-slider-prev ${
          currentImage === 0 ? "property-slider-button-active" : ""
        }`}
        onClick={onPrev}
        disabled={currentImage === 0}
      >
        <MdNavigateBefore width={24} height={24} />
      </button>
      <img src={images[currentImage]} alt={`property-image-${currentImage}`} />
      <button
        className={`property-slider-button property-slider-next ${
          currentImage === images.length - 1
            ? "property-slider-button-active"
            : ""
        }`}
        onClick={onNext}
        disabled={currentImage === images.length - 1}
      >
        <MdNavigateNext width={24} height={24} />
      </button>

      <div className="property-slider-image-index">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => onImageNavigation(index)}
            className={index === currentImage ? "active" : ""}
          >
            {index === currentImage ? <GoDotFill /> : <GoDot />}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PropertySlider;
