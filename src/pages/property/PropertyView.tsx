import { getPropertyById } from "../../api/property";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  type PropertyTypesView,
  PropertyTypesViewDefaultData,
} from "../../pages/property/Propertytypes";

import PropertySlider from "../../components/property/PropertySlider";
import ToastNotif from "../../components/modals/ToastNotif";
import { bookProperty } from "../../api/bookProperty";
import BookingRequestModal from "../../components/modals/BookingRequestModal";
import { defaultBooking, type Booking } from "../bookings/BookingTypes";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Ensure you import the CSS for DatePicker

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

  // Calculate the total price based on the selected dates
  const calculateTotalPrice = () => {
    if (booking.start && booking.end) {
      const daysDifference = Math.ceil(
        (booking.end.getTime() - booking.start.getTime()) / (1000 * 3600 * 24),
      );
      return property.price * daysDifference;
    }
    return 0;
  };

  if (loading) {
    return (
      <div
        className="s-screen bg-dark-800 min-h-[520px] relative"
        id="sc-detail"
      >
        <h2>Loading property details...</h2>
      </div>
    );
  }

  return (
    <div className="s-screen bg-dark-800 min-h-[520px] relative" id="sc-detail">
      <div className="relative w-full h-[320px] bg-dark-700 overflow-hidden">
        <PropertySlider images={property.image} />
      </div>

      <div
        className="grid gap-6 px-8 py-6"
        style={{ gridTemplateColumns: "1fr 320px" }}
      >
        {/* Left: Property details */}
        <div>
          <h1 className="font-serif text-[26px] font-medium text-[#e8e6e1] mb-1">
            {property.title}
          </h1>
          <div className="text-[13px] text-muted-faint mb-4 flex items-center gap-1">
            📍 {property.address} · ★ 4.9 (24 reviews)
          </div>
          <div className="flex gap-5 mb-5 flex-wrap">
            <div className="flex items-center gap-1.5 text-[13px] text-muted">
              👤 {property.maxGuest}{" "}
              {property.maxGuest > 1 ? "guests" : "guest"}
            </div>
            <div className="flex items-center gap-1.5 text-[13px] text-muted">
              🛏 {property.totalBedroom}{" "}
              {property.totalBedroom > 1 ? "bedrooms" : "bedroom"}
            </div>
            <div className="flex items-center gap-1.5 text-[13px] text-muted">
              🛏 {property.totalBed} {property.totalBed > 1 ? "beds" : "bed"}
            </div>
            <div className="flex items-center gap-1.5 text-[13px] text-muted">
              🚿 {property.totalBath}{" "}
              {property.totalBath > 1 ? "baths" : "bath"}
            </div>
          </div>
          <hr className="border-none border-t border-white/[0.07] my-4" />
          <p className="text-[14px] text-muted-dim leading-[1.7]">
            {property.description}
          </p>
        </div>

        {/* Right: Schedule and Booking */}
        <div className="bg-dark-700 border border-white/[0.09] rounded-[14px] p-5 sticky top-20">
          <div className="font-serif text-[22px] text-[#e8e6e1] mb-1">
            ₱{property.price}{" "}
            <span className="text-[13px] font-sans text-muted-faint font-normal">
              / night
            </span>
          </div>

          <div className="gap-6 w-full">
            <div>
              <label className="text-[#e8e6e1] text-[14px]">Check-in</label>
              <div className="relative w-full">
                {" "}
                {/* Use w-full on the parent container */}
                <DatePicker
                  selected={booking.start}
                  onChange={(date) => {
                    if (!date) return;
                    setBooking((prev) => ({ ...prev, start: date }));
                  }}
                  selectsStart
                  startDate={booking.start}
                  endDate={booking.end}
                  placeholderText="Select date"
                  minDate={new Date()}
                  dateFormat="MMM d, yyyy"
                  className="w-full p-3 bg-transparent border border-white/20 rounded-[10px] text-[#e8e6e1] placeholder:text-muted-faint focus:outline-none focus:ring-2 focus:ring-gold" // w-full ensures input takes up full width
                />
              </div>
            </div>

            <div>
              <label className="text-[#e8e6e1] text-[14px]">Checkout</label>
              <div className="relative w-full">
                {" "}
                {/* Ensure the parent div is w-full */}
                <DatePicker
                  selected={booking.end}
                  onChange={(date) => {
                    if (!date) return;
                    setBooking((prev) => ({ ...prev, end: date }));
                  }}
                  selectsEnd
                  startDate={booking.start}
                  endDate={booking.end}
                  minDate={booking.start || new Date()}
                  placeholderText="Select date"
                  dateFormat="MMM d, yyyy"
                  className="w-[280px] p-3 bg-transparent border border-white/20 rounded-[10px] text-[#e8e6e1] placeholder:text-muted-faint focus:outline-none focus:ring-2 focus:ring-gold" // w-full to ensure the DatePicker takes up full width
                />
              </div>
            </div>
          </div>

          {/* Price Summary */}
          <div className="flex justify-between py-[10px] border-t border-white/[0.07] mt-2 text-[13px]">
            <span className="text-muted-faint">
              ₱{property.price} ×{" "}
              {booking.end && booking.start
                ? Math.ceil(
                    (booking.end.getTime() - booking.start.getTime()) /
                      (1000 * 3600 * 24),
                  )
                : 0}{" "}
              nights
            </span>
            <span className="text-[#e6e6e1] font-medium">
              ₱{calculateTotalPrice().toLocaleString("en-PH")}
            </span>
          </div>
          <div className="flex justify-between py-[10px] border-t border-white/[0.07] text-[13px]">
            <span className="text-muted-faint">Total</span>
            <span className="text-gold font-semibold">
              ₱{calculateTotalPrice().toLocaleString("en-PH")}
            </span>
          </div>

          {/* Rent and Reserve Buttons */}
          <button
            className="w-full bg-gold text-dark-900 border-none rounded-[10px] py-[13px] text-[14px] font-semibold cursor-pointer hover:bg-gold-light transition-colors mb-2"
            onClick={onBook}
          >
            Rent
          </button>
          <button className="w-full bg-transparent text-[#e8e6e1] border border-white/20 rounded-[10px] py-3 text-[14px] cursor-pointer hover:bg-white/[0.06] transition-colors">
            Reserve
          </button>
        </div>
      </div>

      {/* Toast notification */}
      {showModal && (
        <ToastNotif
          message={modalMessage}
          onClose={() => setShowModal(false)}
        />
      )}

      {/* Booking request modal */}
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
