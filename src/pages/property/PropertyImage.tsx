import { FaImage } from "react-icons/fa6";

import "@/styles/property/propertyImage.css";
import { useProperty } from "../../context/PropertyContext";
import { type ChangeEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PropertyImages = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const { data, setData } = useProperty();
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleAddImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const image = e.target.files[0];
      setData((prev) => ({
        ...prev,
        image: [...prev.image, image],
      }));

      console.log(data);
    }
  };

  const handleRemoveImage = (index: number) => {
    const newFiles = data.image.filter((_, i) => i !== index);
    setData((prev) => ({ ...prev, image: newFiles }));
  };

  const handleEditImage = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.target.files && e.target.files[0]) {
      const updatedFile = e.target.files[0];
      setData((prev) => {
        const updatedImages = [...prev.image];
        updatedImages[index] = updatedFile;
        return { ...prev, image: updatedImages };
      });
    }
  };

  const handleNavigation = () => {
    if (data.image.length < 1) {
      setHasError(true);
      setErrorMessage("Property Image is required");
      return;
    }

    setHasError(false);
    navigate(`/property/edit/review/${id}`);
  };

  const handleBack = () => {
    navigate("/property/form");
  };

  return (
    <div className="property-image-container">
      <div className="image-grid">
        {hasError && <h2>{errorMessage}</h2>}

        {data.image.map((file, index) => (
          <div key={index} className="image-card">
            <img
              src={
                typeof file === "string"
                  ? file
                  : URL.createObjectURL(file as File)
              }
              alt={`preview-${index}`}
            />
            <div className="image-actions">
              <button onClick={() => handleRemoveImage(index)}>🗑️</button>
              <label>
                ✏️
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => handleEditImage(e, index)}
                  required
                />
              </label>
            </div>
          </div>
        ))}

        <label className="add-image-card">
          <FaImage size={50} color="#fff" />
          <h4>+ Add Image</h4>
          <input
            type="file"
            multiple
            accept="image/*"
            hidden
            onChange={handleAddImage}
          />
        </label>
      </div>

      <div className="property-button-container">
        <button onClick={handleBack} className="back-button btn-white-outline">
          Prev
        </button>
        <button onClick={handleNavigation} className="btn-white-outline">
          Next
        </button>
      </div>
    </div>
  );
};

export default PropertyImages;
