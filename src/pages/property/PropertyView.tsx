import { getPropertyById } from "../../utils/property";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  type PropertyTypesView,
  PropertyTypesViewDefaultData,
} from "../../pages/property/Propertytypes";

import "@/styles/property/viewProperty.css";
import PropertySlider from "../../components/property/PropertySlider";
import PropertyDetails from "../../components/property/PropertyDetails";
import ScheduleProperty from "../../components/property/ScheduleProperty";
import ToastNotif from "../../components/ToastNotif";
import { bookProperty } from "../../utils/bookProperty";

const PropertyView = () => {
  const generateEndDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 2);
    return date;
  }, []);

  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [property, setProperty] = useState<PropertyTypesView>(
    PropertyTypesViewDefaultData
  );
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(generateEndDate);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");

  const onBook = async () => {
    if (!id) {
      return;
    }
    const res = await bookProperty(id, startDate, endDate);

    setModalMessage(res.message);
    setShowModal(true);
  };

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        if (!id) throw new Error("Missing property ID");
        const res = await getPropertyById(id);
        if (res.success) setProperty(res.property);
      } catch (e) {
        console.error("Failed to fetch property:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="property-view-loading">
        <h2>Loading property details...</h2>
      </div>
    );
  }

  return (
    <div className="property-view-container">
      <div className="property-slider-wrapper">
        <PropertySlider images={property.image} />
      </div>
      <div className="property-view-grid">
        {/* Left: Details */}
        <PropertyDetails property={property} />

        {/* Right Details (date picker) */}
        <ScheduleProperty
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          onBook={onBook}
          price={property.price}
        />
      </div>

      {showModal && (
        <ToastNotif
          message={modalMessage}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default PropertyView;
