import type {
  PropertyCardActions,
  PropertyCardSettings,
  PropertyTypesView,
} from "../../pages/property/Propertytypes";
import { MdDelete, MdEdit } from "react-icons/md";

interface Props {
  property: PropertyTypesView;
  actions: PropertyCardActions;
  settings: PropertyCardSettings;
}

const PropertyCardDetails = ({ property, actions, settings }: Props) => {
  const formatted = property.price.toLocaleString("en-US", {
    style: "currency",
    currency: "PHP",
  });

  return (
    <div key={property.id} className="property-card">
      <img src={property.image[0]} alt={property.title} />

      {/* Property Details */}
      <div className="property-info">
        <h3>{property.title}</h3>
        <h4 className={`status ${property.status.toLowerCase()}`}>
          {formatted} for {property.totalNights}{" "}
          {property.totalNights > 1 ? "nights" : "night"}
        </h4>
      </div>

      {/* Manage Property actions */}
      {settings.mode === "manage" && (
        <div className="property-actions">
          <button
            className="property-actions-buttons edit-btn"
            onClick={() => actions.onEdit && actions.onEdit(property.id)}
          >
            <MdEdit />
          </button>
          <button
            className="property-actions-buttons delete-btn"
            onClick={() => actions.onDelete && actions.onDelete(property.id)}
          >
            <MdDelete />
          </button>
        </div>
      )}

      {settings.mode === "booking" && <div></div>}
    </div>
  );
};

export default PropertyCardDetails;
