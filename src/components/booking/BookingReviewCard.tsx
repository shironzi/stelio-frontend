import { FaStar } from "react-icons/fa";

import "@/styles/booking/bookingReviews.css";

const BookingReviewCard = () => {
  return (
    <div className="card-container">
      <h5>👤 John Cruz — Stayed Jan 10–12 — Condo A </h5>
      <div className="review-card-stars">
        <FaStar color="#ffff00" />
        <FaStar color="#ffff00" />
        <FaStar color="#ffff00" />
        <FaStar color="#ffff00" />
        <FaStar color="#ffff00" />
      </div>
      <h5>“Amazing stay! Very clean. Smooth check-in.”</h5>
      <h5>Tags: Clean • Fast WiFi</h5>
      <h5>Owner Reply: </h5>
      <button className="btn-outline">Reply</button>
    </div>
  );
};

export default BookingReviewCard;
