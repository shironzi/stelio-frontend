import "@/styles/booking/bookingList.css";

const BookingCard = () => {
  return (
    <div className="bookingCard">
      <div className="bookingCard-info">
        <h5>🏠 Title</h5>

        <div>
          <h5>renter name</h5>
          <h5>Total Guest</h5>
        </div>

        <div>
          <h5>duration: 2 nights • Jan 10 → 12</h5>
          <h5>Type: Request to Book </h5>
        </div>

        <div>
          <h5>Payment: Pending</h5>
          <h5>Status: Pending</h5>
        </div>
        <h5>Total: price</h5>
        <h5>⭐ Special Requests (1) </h5>
      </div>

      <div className="bookingCard-actions">
        <button className="btn-outline">Message Guest</button>
        <button className="btn-outline">View Details</button>
        <button className="btn-success">Approve</button>
        <button className="btn-danger">Decline</button>
      </div>
    </div>
  );
};

export default BookingCard;
