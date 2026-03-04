import { memo, useCallback, useEffect, useState } from "react";
import type { Booking } from "../../pages/bookings/BookingTypes";
import "../../styles/components/paymentModal.css";
import { IoMdClose } from "react-icons/io";

const PaymentModal = ({
  booking,
  action,
}: {
  booking: Booking;
  action: {
    payment: (bookingId: string, amount: number) => void;
    coupon: (coupon: string) => void;
    onClose: () => void;
  };
}) => {
  const startDate = new Date(booking.start);
  const endDate = new Date(booking.end);

  const [timeRemaining, setTimeRemaining] = useState<number>(600);

  // const [coupon, setCoupon] = useState<string>(booking.coupon);
  const [isClosing, setIsClosing] = useState(false);

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
    const now = new Date();
    const expiresAt = new Date(booking.expiresAt);
    const timeDifferenceMs = expiresAt.getTime() - now.getTime();
    const timeDifferenceSeconds = Math.floor(timeDifferenceMs / 1000);

    if (timeDifferenceSeconds <= 0) {
      setTimeRemaining(0);
      return;
    }

    setTimeRemaining(timeDifferenceSeconds);
  }, []);

  // useEffect(() => {
  //   action.coupon(coupon);
  // }, [coupon]);

  return (
    <div
      className={`payment-container ${isClosing ? "booking-modal-exit" : ""}`}
    >
      <div className="booking-modal-header">
        <h3>Payment Details</h3>
        <IoMdClose
          onClick={() => {
            setIsClosing(true);
            action.onClose();
          }}
          size={25}
          color="red"
          cursor={"pointer"}
        />
      </div>

      <hr />

      {/* Payment Status */}
      <h4>
        Booking Status: <span>{booking.status}</span>
      </h4>
      <hr />

      {/* Payment expiration */}
      <h4 className="payment-timer">
        Timer: <span>{formatTime(timeRemaining)} remaining</span>
      </h4>
      <hr />

      {/* Booking Details */}
      <h3>
        Property: <span>{booking.title}</span>
      </h3>
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
        Contanct Info: <span>{booking.contactPhone}</span>
      </h4>
      <hr />

      {/* Booking Pricing */}
      <div className="payment-pricing">
        <h4>
          Price: <span>{formatPHP(booking.price)}</span>
        </h4>
        <h4>
          Discount: <span>{formatPHP(booking.price - booking.price * 2)}</span>
        </h4>
        {/* <div className="payment-coupon">
          <h4>Coupon:</h4>
          <input
            type="text"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
          />
        </div> */}

        <h4>
          Total: <span>{formatPHP(0)}</span>
        </h4>
      </div>

      <button
        onClick={() => action.payment(booking.id, booking.price)}
        disabled={timeRemaining === 0}
      >
        Pay Now
      </button>
    </div>
  );
};

export default memo(PaymentModal);
