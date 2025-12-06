import { GoPeople } from "react-icons/go";
import { LuBedSingle } from "react-icons/lu";
import { MdOutlineBathroom, MdOutlineMeetingRoom } from "react-icons/md";

import type { PropertyTypesView } from "../../pages/property/Propertytypes";

import "@/styles/property/viewProperty.css";

const PropertyDetails = ({ property }: { property: PropertyTypesView }) => {
  return (
    <div className="property-details">
      <h2 className="property-title">{property.title}</h2>
      <p className="property-address">{property.address}</p>

      <p className="property-description">{property.description}</p>

      <ul className="view-amenities">
        <li>
          <GoPeople size={28} />
          <span>
            {property.maxGuest} {property.maxGuest > 1 ? "guests" : "guest"}
          </span>
        </li>
        <li>
          <MdOutlineMeetingRoom size={28} />
          <span>
            {property.totalBedroom}{" "}
            {property.totalBedroom > 1 ? "bedrooms" : "bedroom"}
          </span>
        </li>
        <li>
          <LuBedSingle size={28} />
          <span>
            {property.totalBed} {property.totalBed > 1 ? "beds" : "bed"}
          </span>
        </li>
        <li>
          <MdOutlineBathroom size={28} />
          <span>
            {property.totalBath} {property.totalBath > 1 ? "baths" : "bath"}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default PropertyDetails;
