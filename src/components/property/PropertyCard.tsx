import { FaHeart, FaRegHeart } from "react-icons/fa";
import "@/styles/property/property.css";
import type {
  PropertyCardActions,
  PropertyCardSettings,
  PropertyTypesView,
} from "../../pages/property/Propertytypes";
import PropertyCardDetails from "./PropertyCardDetails";
import { useState } from "react";

export type PropertyCardProps = {
  property: PropertyTypesView;
  actions: PropertyCardActions;
  settings: PropertyCardSettings;
};

const PropertyCard = ({ property, actions, settings }: PropertyCardProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (!property.id) return;

    actions.onFavorite?.(property.id);

    // Trigger animation
    setIsAnimating(true);

    // Remove animation class after it ends (300ms)
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <div className="property-card">
      {settings.mode === "home" && (
        <button
          onClick={handleFavoriteClick}
          className={`favorite ${isAnimating ? "animate" : ""}`}
        >
          {property.isFavorite ? <FaHeart color="#ff0000" /> : <FaRegHeart />}
        </button>
      )}

      <PropertyCardDetails
        property={property}
        actions={actions}
        settings={settings}
      />
    </div>
  );
};

export default PropertyCard;
