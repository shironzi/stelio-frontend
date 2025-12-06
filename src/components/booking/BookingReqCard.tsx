import "@/styles/booking/bookingRequest.css";

const BookingReqCard = () => {
  return (
    <div className="booking-request-container">
      <h5>Guest:</h5>
      <h5>Check-in:</h5>
      <h5>Check-out:</h5>
      <h5>Status:</h5>

      <button>View Details</button>
      <div>
        <button>Approve</button>
        <button>Decline</button>
      </div>
    </div>
  );
};

export default BookingReqCard;
