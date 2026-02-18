import { FaHeart, FaRegHeart } from "react-icons/fa";
import "@/styles/property/property.css";
import type {
  PropertyCardActions,
  PropertyCardSettings,
  PropertyTypesView,
} from "../../pages/property/Propertytypes";
import PropertyCardDetails from "./PropertyCardDetails";

export type PropertyCardProps = {
  property: PropertyTypesView;
  actions: PropertyCardActions;
  settings: PropertyCardSettings;
};

const PropertyCard = ({ property, actions, settings }: PropertyCardProps) => {
  return (
    <div>
      {settings.mode === "home" && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            if (property.id) actions.onFavorite?.(property?.id);
          }}
          className="favorite"
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
