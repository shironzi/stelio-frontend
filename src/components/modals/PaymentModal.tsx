import { memo, useCallback, useEffect, useState } from "react";
import type { Booking } from "../../pages/bookings/BookingTypes";
import "../../styles/components/paymentModal.css";

const PaymentModal = ({
  booking,
  action,
}: {
  booking: Booking;
  action: { payment: () => void; coupon: (coupon: string) => void };
}) => {
  const startDate = new Date(booking.startDateTime);
  const endDate = new Date(booking.endDateTime);

  const [timeRemaining, setTimeRemaining] = useState<number>(10);
  const [coupon, setCoupon] = useState<string>(booking.coupon);

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

  useEffect(() => {
    action.coupon(coupon);
  }, [coupon]);

  return (
    <div className="payment-container">
      {/* Payment Status */}
      <h4>Booking Status: {booking.status}</h4>
      <hr />

      {/* Payment expiration */}
      <h4 className="payment-timer">
        Timer: {formatTime(timeRemaining)} remaining
      </h4>
      <hr />

      {/* Booking Details */}
      <h3>Property: {booking.title}</h3>
      <h4>
        Dates:{" "}
        <span>
          {toMonthStr(startDate.getMonth() + 1)} {startDate.getDay()} to{" "}
          {toMonthStr(endDate.getMonth() + 1)} {endDate.getDay()}
        </span>
      </h4>
      <h4>
        Guests: <span>{booking.totalGuests}</span>
      </h4>
      <h4>
        Phone No.: <span>{booking.contactPhone}</span>
      </h4>
      <hr />

      {/* Booking Pricing */}
      <div className="payment-pricing">
        <h4>
          Price: <span>{formatPHP(booking.price)}</span>
        </h4>
        <h4>
          Discount: <span>{formatPHP(booking.discount ?? 0)}</span>
        </h4>
        <div className="payment-coupon">
          <h4>Coupon:</h4>
          <input
            type="text"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
          />
        </div>

        <h4>
          Total: <span>{formatPHP(booking.price)}</span>
        </h4>
      </div>

      <button onClick={action.payment} disabled={timeRemaining === 0}>
        Pay Now
      </button>
    </div>
  );
};

export default memo(PaymentModal);
