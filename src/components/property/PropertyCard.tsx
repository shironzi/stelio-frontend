import { FaHeart, FaRegHeart } from "react-icons/fa";
import "@/styles/property/property.css";
import { Link } from "react-router-dom";
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
      {/* If manage mode → show editing details/actions */}
      {settings.mode === "manage" ? (
        <PropertyCardDetails
          property={property}
          actions={actions}
          settings={settings}
        />
      ) : settings.mode === "booking" ? (
        <Link to={`/booking/${property.id}`}>
          <PropertyCardDetails
            property={property}
            actions={actions}
            settings={settings}
          />
        </Link>
      ) : (
        <Link to={`/property/${property.id}`} className="property-link">
          {/* Favorite button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              actions.onFavorite?.(property.id);
            }}
            className="favorite"
          >
            {property.isFavorite ? <FaHeart color="#ff0000" /> : <FaRegHeart />}
          </button>

          <PropertyCardDetails
            property={property}
            actions={actions}
            settings={settings}
          />
        </Link>
      )}
    </div>
  );
};

export default PropertyCard;
