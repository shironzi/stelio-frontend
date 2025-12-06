import { FaStar } from "react-icons/fa";

import "@/styles/booking/bookingReviews.css";
import BookingReviewCard from "./BookingReviewCard";

const BookingReviews = () => {
  return (
    <div className="bookingReviews">
      {/* Reviews summary */}
      <div className="card-container">
        <h5 className="bookingReviews-summary-header">
          ⭐ 4.8 (128 Reviews) | 12 new this month
        </h5>
        <div className="bookingReviews-summary-star">
          <div>
            <h5>5</h5>
            <FaStar color="#ffff00" />
          </div>
          <h5>20%</h5>
        </div>
      </div>

      {/* Filter */}
      <div className="booking-reviews-filter">
        <button className="btn-white-outline active">
          5
          <FaStar color="#ffff00" />
        </button>
        <button className="btn-white-outline">
          4
          <FaStar color="#ffff00" />
        </button>
        <button className="btn-white-outline">
          3
          <FaStar color="#ffff00" />
        </button>
        <button className="btn-white-outline">
          2
          <FaStar color="#ffff00" />
        </button>
        <button className="btn-white-outline">
          1
          <FaStar color="#ffff00" />
        </button>
        <button className="btn-white-outline">Needs Reply</button>
        <button className="btn-white-outline">Most Recent</button>
      </div>

      <BookingReviewCard />
    </div>
  );
};

export default BookingReviews;
