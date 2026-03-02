import { memo, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import "../../styles/components/bookingRequestModal.css";

import type { PropertyTypesView } from "../../pages/property/Propertytypes";
import { useUserData } from "../../context/UserContext";
import {
  defaultBooking,
  type Booking,
} from "../../pages/bookings/BookingTypes";

const BookingRequestModal = ({
  data,
  action,
}: {
  data: {
    property: PropertyTypesView;
    duration: { startDate: Date; endDate: Date };
  };
  action: {
    handleRequestBooking: (booking: Booking) => void;
    onClose: () => void;
  };
}) => {
  const startDate = new Date(data.duration.startDate);
  const endDate = new Date(data.duration.endDate);

  const { userData } = useUserData();

  const [booking, setBooking] = useState<Booking>(defaultBooking);
  const [emptyGuestName, setEmptyGuestName] = useState<number | null>(null);
  const [error, setError] = useState<string>("");
  const [isClosing, setIsClosing] = useState<boolean>(false);

  const handleAddGuest = () => {
    const hasEmpty = booking.guestNames?.some((guest, index) => {
      if (guest.trim() === "") {
        setEmptyGuestName(index);
        return true;
      }
    });

    if (hasEmpty) return;

    setBooking((prev) => ({
      ...prev,
      guestNames: [...(prev.guestNames || ""), ""],
    }));
  };

  const handleGuestInput = (name: string, index: number) => {
    setBooking((prev) => ({
      ...prev,
      guestNames: (prev.guestNames || []).map((guest, i) =>
        i === index ? name : guest,
      ),
    }));

    if (emptyGuestName === index && name.trim()) {
      setEmptyGuestName(null);
    }
  };

  const toMonthStr: (month: number) => string = (month) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[month - 1] || "Invalid month";
  };

  const formatPHP = (amount: number) => {
    const formatter = new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    });

    return formatter.format(amount);
  };

  const handleValidation = () => {
    const emptyIndex =
      booking.guestNames?.findIndex((guest) => guest.trim() === "") ?? -1;
    setEmptyGuestName(emptyIndex !== -1 ? emptyIndex : null);

    if (!booking.contactPhone || booking.contactPhone.trim().length <= 0) {
      setError("contact");
      return;
    }

    action.handleRequestBooking(booking);
  };

  const handleContactInput = (contact: string) => {
    if (contact.trim() === "") return;
    if (error === "contact") setError("");

    setBooking((booking) => ({ ...booking, contactPhone: contact }));
  };

  useEffect(() => {
    setBooking((booking) => ({ ...booking, guestNames: [userData.name] }));
  }, []);

  return (
    <div
      className={`booking-modal-container ${
        isClosing ? "booking-modal-exit" : ""
      }`}
    >
      {/* Booking Request Status */}
      <div className="booking-modal-header">
        <h3>Booking Details</h3>
        <IoMdClose
          onClick={() => {
            setIsClosing(true);
            action.onClose;
          }}
          size={25}
          color="red"
          cursor={"pointer"}
        />
      </div>
      <hr />

      {/* Booking Details */}
      <h3>
        Property: <span>{data.property.title}</span>
      </h3>
      <p>{data.property.description}</p>
      <h4>
        Location: <span>{data.property.address}</span>
      </h4>
      <h4>
        Duration:{" "}
        <span>
          {toMonthStr(startDate.getMonth() + 1)} {startDate.getUTCDate()}{" "}
          {" - "}
          {toMonthStr(endDate.getMonth() + 1)} {endDate.getUTCDate()}{" "}
          {endDate.getFullYear()}
        </span>
      </h4>
      <div className="booking-modal-contact">
        <h4>Contact Number:</h4>
        <input
          type="text"
          className={
            error == "contact"
              ? "booking-modal-guests-input-error"
              : "booking-modal-guests-input"
          }
          onChange={(e) => handleContactInput(e.target.value)}
        />
      </div>
      <div className="booking-modal-guests">
        <h4>Guests:</h4>
        <div>
          {booking.guestNames?.map((guest, index) => (
            <input
              value={guest}
              key={index}
              onChange={(e) => handleGuestInput(e.target.value, index)}
              className={
                index === emptyGuestName
                  ? "booking-modal-guests-input-error"
                  : "booking-modal-guests-input"
              }
            />
          ))}
          <button onClick={handleAddGuest} disabled={emptyGuestName !== null}>
            +
          </button>
        </div>
      </div>

      {/* Booking Pricing */}
      <div className="booking-request-pricing">
        <h4>
          Total: <span>{formatPHP(data.property.price)}</span>
        </h4>
      </div>

      <button
        className="booking-modal-proceed"
        onClick={handleValidation}
        disabled={error.trim() !== "" || emptyGuestName !== null}
      >
        Book Now
      </button>
    </div>
  );
};

export default memo(BookingRequestModal);
