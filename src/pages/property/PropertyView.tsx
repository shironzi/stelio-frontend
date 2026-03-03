import { getPropertyById } from "../../utils/property";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  type PropertyTypesView,
  PropertyTypesViewDefaultData,
} from "../../pages/property/Propertytypes";

import "@/styles/property/viewProperty.css";
import PropertySlider from "../../components/property/PropertySlider";
import PropertyDetails from "../../components/property/PropertyDetails";
import ScheduleProperty from "../../components/property/ScheduleProperty";
import ToastNotif from "../../components/modals/ToastNotif";
import { bookProperty } from "../../utils/bookProperty";
import BookingRequestModal from "../../components/modals/BookingRequestModal";
import { defaultBooking, type Booking } from "../bookings/BookingTypes";

const PropertyView = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [property, setProperty] = useState<PropertyTypesView>(
    PropertyTypesViewDefaultData,
  );
  const [booking, setBooking] = useState<Booking>(defaultBooking);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [requestBookingModal, setRequestBookingModal] =
    useState<boolean>(false);

  const onBook = async () => {
    if (!id) {
      return;
    }
    console.log(booking);
    const res = await bookProperty(id, booking);

    setRequestBookingModal(!requestBookingModal);
    setModalMessage(res.message);
    setShowModal(true);
  };

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        if (!id) throw new Error("Missing property ID");
        const res = await getPropertyById(id);
        if (res.success) {
          setProperty(res.property);
        }
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
          startDate={booking.start}
          endDate={booking.end}
          setStartDate={(start) =>
            setBooking((prev) => ({ ...prev, start: start }))
          }
          setEndDate={(end) => setBooking((prev) => ({ ...prev, end: end }))}
          onBook={() => setRequestBookingModal(!requestBookingModal)}
          price={property.price}
        />
      </div>

      {showModal && (
        <ToastNotif
          message={modalMessage}
          onClose={() => setShowModal(false)}
        />
      )}

      {requestBookingModal && (
        <BookingRequestModal
          data={{
            property: property,
            booking: booking,
          }}
          action={{
            handleRequestBooking: onBook,
            updateBooking: setBooking,
            onClose: () => setRequestBookingModal(!requestBookingModal),
          }}
        />
      )}
    </div>
  );
};

export default PropertyView;
