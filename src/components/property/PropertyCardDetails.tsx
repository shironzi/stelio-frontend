import { Link } from "react-router-dom";
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

  const publicKey = import.meta.env.VITE_CLOUD_PUBLIC_KEY;

  return (
    <div>
      <Link
        to={
          settings.mode === "home"
            ? `/property/${property.id}`
            : `/booking/${property.id}`
        }
        className="block mb-4"
      >
        <div className="relative w-full h-[180px] overflow-hidden">
          <img
            src={publicKey + "/" + property.imageUrl}
            alt={property.title}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="sync"
          />

          {/* Category Badge */}
          <div className="absolute top-2 left-2 bg-gold/90 text-dark-900 text-xs px-2 py-1 rounded tracking-wide">
            {property.propertyType}
          </div>
        </div>

        {/* Property Details */}
        <div className="mx-4 my-2">
          <h3 className="text-xl text-white">{property.title}</h3>
          <h5 className="text-sm font-medium text-muted-faint mb-1 flex items-center space-x-2">
            📍{property.address}, {property.city}
          </h5>
          <hr className="my-2 border-t-1 rounded-lg text-muted-faint" />
          <h5 className="text-sm font-medium text-gold-light mb-2">
            <span className="font-semibold">{formatted}</span>{" "}
            <span className="text-muted-faint">/ night</span>
          </h5>
        </div>
      </Link>

      {/* Manage Property Actions */}
      {settings.mode === "manage" && (
        <div className="flex gap-2 mt-4">
          <button
            className="edit-btn p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            onClick={() =>
              actions.onEdit && property.id && actions.onEdit(property.id)
            }
          >
            <MdEdit />
          </button>
          <button
            className="delete-btn p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
            onClick={() =>
              actions.onDelete && property.id && actions.onDelete(property.id)
            }
          >
            <MdDelete />
          </button>
        </div>
      )}
    </div>
  );
};

export default PropertyCardDetails;
