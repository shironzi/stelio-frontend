import { Link, useNavigate } from "react-router-dom";
import "@/styles/property/manageProperty.css";
import { useEffect, useState } from "react";
import { deleteProperty, getMyProperties } from "../../utils/property";
import type { PropertyTypesView } from "../../pages/property/Propertytypes";
import PropertyCard from "../../components/property/PropertyCard";
import { propertyData, useProperty } from "../../context/PropertyContext";

const ManageProperty = () => {
  const navigate = useNavigate();

  const { setData } = useProperty();

  const [properties, setProperties] = useState<PropertyTypesView[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const handleOnDelete = async (propertyId: string) => {
    if (!propertyId) {
      throw new Error("Property ID is missing in search params");
    }

    const res = await deleteProperty(propertyId);
    console.log(res);

    if (res.success) {
      setProperties((prev) => prev.filter((p) => p.id !== propertyId));
    }
  };

  const handleOnEdit = (propertyId: string) => {
    navigate(`/property/edit/info/${propertyId}`);
  };

  useEffect(() => {
    setData(propertyData);

    const fetchProperties = async () => {
      const res = await getMyProperties();

      if (res.success) {
        setProperties(res?.properties ?? []);
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return (
      <div>
        <h1>Loading.........</h1>
      </div>
    );
  }

  return (
    <div className="manage-property">
      {/* Header Section */}
      <div className="manage-header">
        <h2>Manage Properties</h2>
        <Link to={"/property/form"} className="add-btn">
          Add Property
        </Link>
      </div>

      {/* Filters */}
      <div className="filters">
        <label>
          Type
          <select>
            <option value="">All</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
          </select>
        </label>
        <label>
          Location
          <select>
            <option value="">All</option>
            <option value="Manila">Manila</option>
            <option value="Cebu">Cebu</option>
          </select>
        </label>
      </div>

      {/* Property List */}
      <div className="manage-property-list">
        {properties.length > 0 ? (
          properties.map((property) => (
            <PropertyCard
              property={property}
              actions={{ onEdit: handleOnEdit, onDelete: handleOnDelete }}
              settings={{ mode: "manage" }}
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

export default ManageProperty;
