import { memo, useCallback, useEffect, useState } from "react";
import "../../styles/components/bookingRequestModal.css";
import type { PropertyTypesView } from "../../pages/property/Propertytypes";
import {
  defaultBooking,
  type Booking,
  type PaymentType,
} from "../../pages/bookings/BookingTypes";

const BookingRequestModal = ({
  data,
  action,
}: {
  data: {
    property: PropertyTypesView;
    duration: { startDate: Date; endDate: Date };
    paymentType: PaymentType;
  };
  action: {
    handleRequestBooking: () => void;
    handlePaymentType: (payment: PaymentType) => void;
  };
}) => {
  const startDate = new Date(data.duration.startDate);
  const endDate = new Date(data.duration.endDate);

  const [booking, setBooking] = useState<Booking>(defaultBooking);

  const handleAddGuest = () => {
    const hasEmpty = booking.guestNames?.find((guest) => {
      console.log("Guest:", guest);
      return guest.trim() === "";
    });

    if (!hasEmpty) return;

    setBooking((prev) => ({
      ...prev,
      guestNames: [...(prev.guestNames || []), ""],
    }));
  };

  const [timeRemaining, setTimeRemaining] = useState<number>(10);

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

  const formatTime = useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    return `${minutes}:${secondsLeft < 10 ? "0" : ""}${secondsLeft}`;
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="booking-modal-container">
      {/* Booking Request Status */}
      <h3>Booking Details</h3>
      <hr />

      {/* Timer for booking expiration */}
      <h4 className="booking-timer">
        Timer: <span>{formatTime(timeRemaining)} remaining</span>
      </h4>
      <hr />

      {/* Booking Details */}
      <h3>
        Property: <span>{data.property.title}</span>
      </h3>
      <p>{data.property.description}</p>
      <h3>
        Location: <span>{data.property.address}</span>
      </h3>
      <h4>
        Dates:{" "}
        <span>
          {toMonthStr(startDate.getMonth() + 1)} {startDate.getUTCDate()} to{" "}
          {toMonthStr(endDate.getMonth() + 1)} {endDate.getUTCDate()}{" "}
          {endDate.getFullYear()}
        </span>
      </h4>
      <div className="booking-modal-guests">
        <h4>Guests:</h4>
        <div>
          {booking.guestNames?.map((guest, index) => (
            <input value={guest} key={index} />
          ))}
          <button onClick={handleAddGuest}>+</button>
        </div>
      </div>

      {/* Booking Pricing */}
      <div className="booking-request-pricing">
        <h4>
          Total: <span>{formatPHP(data.property.price)}</span>
        </h4>
      </div>

      {/* Booking Request Buttons */}
      <div className="booking-payment-type">
        <button
          className={
            data.paymentType === ("NOW" as unknown as PaymentType)
              ? "booking-payment-type-active"
              : "booking-payment-type-disable"
          }
          onClick={() =>
            action.handlePaymentType("NOW" as unknown as PaymentType)
          }
        >
          Pay Later
        </button>
        <button
          className={
            data.paymentType === ("LATER" as unknown as PaymentType)
              ? "booking-payment-type-active"
              : "booking-payment-type-disable"
          }
          onClick={() =>
            action.handlePaymentType("LATER" as unknown as PaymentType)
          }
        >
          Pay Later
        </button>
      </div>

      <button
        className="booking-modal-proceed"
        onClick={action.handleRequestBooking}
        disabled={timeRemaining === 0}
      >
        Proceed
      </button>
    </div>
  );
};

export default memo(BookingRequestModal);
