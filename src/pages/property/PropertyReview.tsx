import PropertyDetails from "../../components/property/PropertyDetails";
import PropertySlider from "../../components/property/PropertySlider";
import { propertyData, useProperty } from "../../context/PropertyContext";
import { createProperty } from "../../utils/property";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PropertyReview = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, setData } = useProperty();
  // const [message, setMessage] = useState<string>();
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const handleBack = () => {
    navigate("/property/image");
  };

  const handleCreate = async () => {
    setIsFetching(true);
    try {
      const res = await createProperty(data);

      if (res.success) {
        // setMessage(res?.message || "Successfully created a property.");
        setData(propertyData);
        navigate("/property/manage");
      }
    } catch (e) {
      // setMessage(
      //   e?.response?.data?.message || e.message || "Something went wrong"
      // );

      console.error(e);
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div className="property-view-container">
      <div className="property-slider-wrapper">
        <PropertySlider images={data.image} />
      </div>
      <div className="property-view-grid">
        {/* Left: Details */}
        <PropertyDetails property={data} />
      </div>

      <div className="property-button-container">
        <button
          onClick={handleBack}
          className="back-button btn-white-outline"
          disabled={isFetching}
        >
          Prev
        </button>
        <button
          onClick={handleCreate}
          disabled={isFetching}
          className="btn-white-outline"
        >
          {id === undefined
            ? isFetching
              ? "Updating...."
              : "Update"
            : isFetching
            ? "Creating...."
            : "Create"}
        </button>
      </div>
    </div>
  );
};

export default PropertyReview;
