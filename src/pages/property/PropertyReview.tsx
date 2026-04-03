import PropertySlider from "../../components/property/PropertySlider";
import { propertyData, useProperty } from "../../context/PropertyContext";
import { createProperty } from "../../api/property";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PropertyReview = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, setData } = useProperty();
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const handleBack = () => {
    if (id) {
      navigate(`/property/edit/image/${id}`);
      return;
    }
    navigate("/property/image");
  };

  const handleCreate = async () => {
    setIsFetching(true);
    try {
      const res = await createProperty(data);
      if (res.success) {
        setData(propertyData);
        navigate("/property/manage");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div className="h-[90vh] bg-dark-800 min-h-[520px] relative" id="sc-add">
      {/* Property Images Slider */}
      <div className="relative w-full h-[320px] bg-dark-700 overflow-hidden">
        <PropertySlider images={data.image} />
      </div>

      <div className="px-8 py-6">
        {/* Left: Property details */}
        <div>
          <h1 className="font-serif text-[26px] font-medium text-[#e8e6e1] mb-1">
            Review Property
          </h1>
          <div className="text-[13px] text-muted-faint mb-4 flex items-center gap-1">
            📍 {data.address} · ★ 4.9 (24 reviews)
          </div>
          <div className="flex gap-5 mb-5 flex-wrap">
            <div className="flex items-center gap-1.5 text-[13px] text-muted">
              👤 {data.maxGuest} {data.maxGuest > 1 ? "guests" : "guest"}
            </div>
            <div className="flex items-center gap-1.5 text-[13px] text-muted">
              🛏 {data.totalBedroom}{" "}
              {data.totalBedroom > 1 ? "bedrooms" : "bedroom"}
            </div>
            <div className="flex items-center gap-1.5 text-[13px] text-muted">
              🛏 {data.totalBed} {data.totalBed > 1 ? "beds" : "bed"}
            </div>
            <div className="flex items-center gap-1.5 text-[13px] text-muted">
              🚿 {data.totalBath} {data.totalBath > 1 ? "baths" : "bath"}
            </div>
          </div>
          <hr className="border-none border-t border-white/[0.07] my-4" />
          <p className="text-[14px] text-muted-dim leading-[1.7]">
            {data.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-dark-800 flex justify-center gap-4">
          <button
            onClick={handleBack}
            disabled={isFetching}
            className="bg-transparent border border-white/[0.15] text-muted rounded-[9px] px-6 py-[11px] text-[13px] font-sans cursor-pointer hover:bg-white/[0.04] transition-colors"
          >
            ← Back
          </button>
          <button
            onClick={handleCreate}
            disabled={isFetching}
            className="bg-gold border-none text-dark-900 rounded-[9px] px-7 py-[11px] text-[13px] font-semibold font-sans cursor-pointer hover:bg-gold-light transition-colors"
          >
            {!id
              ? isFetching
                ? "Creating..."
                : "Create"
              : isFetching
                ? "Updating..."
                : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyReview;
