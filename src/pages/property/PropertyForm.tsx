import "@/styles/property/propertyForm.css";
import { handleNumeric } from "./PropertyFunc";
import { useNavigate, useParams } from "react-router-dom";
import { useProperty, type PropertyTypes } from "../../context/PropertyContext";
import { useEffect, useState } from "react";
import { getPropertyById } from "../../utils/property";

const PropertyForm = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const { data, setData } = useProperty();

  const [property, setProperty] = useState<PropertyTypes>(data);
  const [loading, setLoading] = useState<boolean>(false);

  const handleNavigation = () => {
    if (id) {
      navigate(`/property/edit/image/${id}`);
      return;
    }
    navigate("/property/image");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setData(property);

    handleNavigation();
  };

  useEffect(() => {
    if (!id) return;

    const fetchProperty = async () => {
      try {
        setLoading(true);

        const res = await getPropertyById(id);
        if (res.success) {
          setData(res.property);
        }
      } catch (e: any) {
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, []);

  if (loading) {
    return (
      <div>
        <h1>Loading....</h1>
      </div>
    );
  }

  return (
    <form className="property-form" onSubmit={handleSubmit}>
      <div>
        <div className="title-price-container">
          <h2 className="property-input-long">Title</h2>
          <h2 className="property-price">Price</h2>
        </div>
        <p>
          Begin by giving your property an appealing title. Make it
          attention-grabbing yet informative
        </p>
        <div className="title-price-container">
          <input
            className="property-input-long"
            type="text"
            value={property.title}
            onChange={(e) =>
              setProperty((prev) => ({ ...prev, title: e.target.value }))
            }
            required
          />
          <input
            className="property-price"
            type="text"
            inputMode="numeric"
            value={property.price}
            onChange={(e) =>
              setProperty((prev) => ({ ...prev, price: handleNumeric(e) }))
            }
            required
          />
        </div>
      </div>
      <div>
        <div className="title-price-container">
          <h2 className="property-input-long">Address</h2>
          <h2 className="property-price">City</h2>
        </div>
        <div className="title-price-container">
          <input
            type="text"
            className="property-input-long"
            value={property.address}
            onChange={(e) =>
              setProperty((prev) => ({ ...prev, address: e.target.value }))
            }
            required
          />
          <input
            type="text"
            className="property-price"
            value={property.city}
            onChange={(e) =>
              setProperty((prev) => ({ ...prev, city: e.target.value }))
            }
            required
          />
        </div>
      </div>
      <div>
        <div className="title-price-container">
          <h2>Property Type</h2>
          <h2>Max Guest</h2>
          <h2>Total Bedroom</h2>
        </div>
        <div className="title-price-container">
          <select
            name="ropertyType"
            id=""
            value={property.propertyType}
            className="property-short-input"
            onChange={(e) =>
              setProperty((prev) => ({
                ...prev,
                propertyType: e.target.value as
                  | "APARTMENT"
                  | "HOUSE"
                  | "VILLA"
                  | "CABIN",
              }))
            }
            required
          >
            <option value="APARTMENT">APARTMENT</option>
            <option value="HOUSE">HOUSE</option>
            <option value="VILLA">VILLA</option>
            <option value="CABIN">CABIN</option>
          </select>
          <input
            type="text"
            inputMode="numeric"
            className="property-short-input"
            value={property.maxGuest}
            onChange={(e) =>
              setProperty((prev) => ({
                ...prev,
                maxGuest: handleNumeric(e),
              }))
            }
            required
          />
          <input
            type="text"
            inputMode="numeric"
            className="property-short-input"
            value={property.totalBedroom}
            onChange={(e) =>
              setProperty((prev) => ({
                ...prev,
                totalBedroom: handleNumeric(e),
              }))
            }
            required
          />
        </div>
      </div>
      <div>
        <h2>Description</h2>
        <textarea
          className="desc"
          value={property.description}
          onChange={(e) =>
            setProperty((prev) => ({ ...prev, description: e.target.value }))
          }
          required
        />
      </div>

      <div className="property-button-container">
        <button onClick={handleNavigation} className="btn-white-outline">
          Next
        </button>
      </div>
    </form>
  );
};

export default PropertyForm;
