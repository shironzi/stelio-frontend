import "../../styles/mybookings/myBookings.css";
import type { Booking } from "../../pages/bookings/BookingTypes";

const MyBookingCard = ({ booking }: { booking: Booking }) => {
  console.log(booking.images[0]);
  return (
    <div className="my-bookings-container">
      {/* Property Image */}
      <img src={booking.images[0]} alt={``} />

      {/* Booking Details */}
      <div className="my-bookings-details">
        <h3 className="booking-title">{booking.title}</h3>
        <p>{booking.description}</p>
      </div>

      {/* Booking Status */}
      <div className="my-bookings-status">
        <h4 className={`status-text ${booking.status.toLowerCase()}`}>
          {booking.status}
        </h4>
        <button className="cancel-button">Cancel</button>
      </div>
    </div>
  );
};

export default MyBookingCard;
