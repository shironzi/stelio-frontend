import { useEffect, useState } from "react";
import type { PropertyTypesView } from "../property/Propertytypes";
import { getMyProperties } from "../../api/property";
import PropertyCard from "../../components/property/PropertyCard";

const ManageBookings = () => {
  const [properties, setProperties] = useState<PropertyTypesView[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProperties = async () => {
      const res = await getMyProperties();

      console.log(res);

      if (res.success) {
        setProperties(res?.properties ?? []);
        // setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="manage-property">
      <div className="manage-property-list">
        {properties.length > 0 ? (
          properties.map((property) => (
            <PropertyCard
              property={property}
              actions={{}}
              settings={{ mode: "booking" }}
            />
          ))
        ) : (
          <div>
            <h1>No property</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageBookings;
