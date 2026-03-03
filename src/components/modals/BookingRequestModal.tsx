import { memo, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import "../../styles/components/bookingRequestModal.css";

import type { PropertyTypesView } from "../../pages/property/Propertytypes";
import { useUserData } from "../../context/UserContext";
import { type Booking } from "../../pages/bookings/BookingTypes";

const BookingRequestModal = ({
  data,
  action,
}: {
  data: {
    property: PropertyTypesView;
    booking: Booking;
  };
  action: {
    handleRequestBooking: () => void;
    updateBooking: (booking: Booking) => void;
    onClose: () => void;
  };
}) => {
  const { userData } = useUserData();

  const [emptyGuestName, setEmptyGuestName] = useState<number | null>(null);
  const [error, setError] = useState<string>("");
  const [isClosing, setIsClosing] = useState<boolean>(false);

  const handleAddGuest = () => {
    const hasEmpty = data.booking.guestNames?.some((guest, index) => {
      if (guest.trim() === "") {
        setEmptyGuestName(index);
        return true;
      }
    });

    if (hasEmpty) return;

    action.updateBooking({
      ...data.booking,
      guestNames: [...(data.booking.guestNames || ""), ""],
    });
  };

  const handleGuestInput = (name: string, index: number) => {
    action.updateBooking({
      ...data.booking,
      guestNames: (data.booking.guestNames || []).map((guest, i) =>
        i === index ? name : guest,
      ),
    });

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
      data.booking.guestNames?.findIndex((guest) => guest.trim() === "") ?? -1;
    setEmptyGuestName(emptyIndex !== -1 ? emptyIndex : null);

    if (
      !data.booking.contactPhone ||
      data.booking.contactPhone.trim().length <= 0
    ) {
      setError("contact");
      return;
    }

    action.handleRequestBooking();
  };

  const handleContactInput = (contact: string) => {
    if (contact.trim() === "") return;
    if (error === "contact") setError("");

    action.updateBooking({ ...data.booking, contactPhone: contact });
  };

  useEffect(() => {
    action.updateBooking({
      ...data.booking,
      guestNames: [userData.name],
    });
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
          {toMonthStr(data.booking.start.getMonth() + 1)}{" "}
          {data.booking.start.getUTCDate()} {" - "}
          {toMonthStr(data.booking.end.getMonth() + 1)}{" "}
          {data.booking.end.getUTCDate()} {data.booking.end.getFullYear()}
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
          {data.booking.guestNames?.map((guest, index) => (
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
