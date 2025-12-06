import BookingCard from "./BookingCard";
import "@/styles/booking/bookingList.css";

const BookingList = () => {
  return (
    <div>
      <h2>Bookings</h2>

      <div className="BookingList-navbar">
        <button className="btn-white-outline">
          <span>🟦</span> All
        </button>
        <button className="btn-white-outline">
          <span>🟨</span> Pending
        </button>
        <button className="btn-white-outline">
          <span>🟩</span> Approved
        </button>
        <button className="btn-white-outline">
          <span>🟥</span> Declined
        </button>
        <button className="btn-white-outline">
          <span>⚪</span> Cancelled
        </button>
      </div>

      <BookingCard />
    </div>
  );
};

export default BookingList;
