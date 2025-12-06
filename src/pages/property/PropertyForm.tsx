import "@/styles/property/propertyForm.css";
import { handleNumeric } from "./PropertyFunc";
import { useNavigate, useParams } from "react-router-dom";
import { useProperty } from "../../context/PropertyContext";
import { useEffect, useState } from "react";
import { getPropertyById } from "../../utils/property";

const PropertyForm = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const { data, setData } = useProperty();

  const [loading, setLoading] = useState<boolean>(false);

  const handleNavigation = () => {
    if (id) {
      navigate(`/property/edit/image/${id}`);
      return;
    }
    navigate("/property/image");
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
    <div className="property-form">
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
            value={data.title}
            onChange={(e) =>
              setData((prev) => ({ ...prev, title: e.target.value }))
            }
            required
          />
          <input
            className="property-price"
            type="text"
            inputMode="numeric"
            value={data.price}
            onChange={(e) =>
              setData((prev) => ({ ...prev, price: handleNumeric(e) }))
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
            value={data.address}
            onChange={(e) =>
              setData((prev) => ({ ...prev, address: e.target.value }))
            }
            required
          />
          <input
            type="text"
            className="property-price"
            value={data.city}
            onChange={(e) =>
              setData((prev) => ({ ...prev, city: e.target.value }))
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
            value={data.propertyType}
            className="property-short-input"
            onChange={(e) =>
              setData((prev) => ({
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
            value={data.maxGuest}
            onChange={(e) =>
              setData((prev) => ({ ...prev, title: e.target.value }))
            }
            required
          />
          <input
            type="text"
            inputMode="numeric"
            className="property-short-input"
            value={data.totalBedroom}
            onChange={(e) =>
              setData((prev) => ({ ...prev, totalBedroom: handleNumeric(e) }))
            }
            required
          />
        </div>
      </div>
      <div>
        <h2>Description</h2>
        <textarea
          className="desc"
          value={data.description}
          onChange={(e) =>
            setData((prev) => ({ ...prev, description: e.target.value }))
          }
          required
        />
      </div>

      <div className="property-button-container">
        <button onClick={handleNavigation}>
          <h3>Next</h3>
        </button>
      </div>
    </div>
  );
};

export default PropertyForm;
