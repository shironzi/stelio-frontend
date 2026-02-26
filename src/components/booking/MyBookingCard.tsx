import "../../styles/mybookings/myBookings.css";
import type { Booking } from "../../pages/bookings/BookingTypes";

const MyBookingCard = ({
  booking,
  action,
}: {
  booking: Booking;
  action: { cancel: () => void; payment: () => void };
}) => {
  console.log(booking.images[0]);
  return (
    <div className="my-bookings-container">
      {/* Property Image */}
      <img src={booking.images[0]} alt={``} />

      {/* Booking Details */}
      <div className="my-bookings-details">
        <h3 className="booking-title">{booking.title}</h3>
        <p>{booking.description}</p>
        <p className="status-text">
          Status:{" "}
          <span className={`${booking.status.toLocaleLowerCase()}`}>
            {booking.status}
          </span>
        </p>
      </div>

      {/* Booking Action button */}
      <div className="my-bookings-status">
        <button
          className="payment-button action-button"
          onClick={action.payment}
        >
          Pay
        </button>
        <button
          className={
            booking.status.toLocaleLowerCase() === "cancelled"
              ? "btn-disable"
              : "cancel-button action-button"
          }
          onClick={action.cancel}
          disabled={booking.status.toLocaleLowerCase() === "cancelled"}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default MyBookingCard;
