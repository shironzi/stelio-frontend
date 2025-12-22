import { useEffect, useState } from "react";
import BookingCard from "./BookingCard";
import "@/styles/booking/bookingList.css";
import type { BookingListCard, BookingStatus } from "../../types/booking";
import { useParams } from "react-router-dom";
import {
  getBookingsByPropertyId,
  updateBookingStatus,
} from "../../utils/bookProperty";

const BookingList = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState<Boolean>(true);
  const [bookings, setBookings] = useState<BookingListCard[]>();

  const handleBookingStatus = async (
    bookingId: string,
    status: BookingStatus
  ) => {
    const res = await updateBookingStatus(bookingId, status);

    if (res.success) {
      setBookings((bookings) =>
        bookings?.map((bookingInfo) =>
          bookingInfo.id === bookingId
            ? { ...bookingInfo, status }
            : bookingInfo
        )
      );

      // add notification or pop up
    }
  };

  useEffect(() => {
    const fetchBookings = async () => {
      if (!id) return;

      const res = await getBookingsByPropertyId(id);

      if (res.success) {
        setBookings(res.bookings);
      }

      console.log(res.bookings);

      setLoading(false);
    };

    fetchBookings();
  }, []);

  return (
    <div>
      <h2>Bookings</h2>

      <div className="BookingList-navbar">
        <button className="btn-white-outline active">
          <span>🟦</span> All
        </button>
        <button className="btn-white-outline completed">
          <span>🟩</span> Completed
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

      {loading ? (
        <div>
          <h1>Loading....</h1>
        </div>
      ) : bookings?.length ? (
        bookings.map((bookingInfo) => (
          <BookingCard
            key={bookingInfo.id}
            bookingInfo={bookingInfo}
            actions={{ update: handleBookingStatus }}
          />
        ))
      ) : (
        <h3>
          No bookings found right now. We'll let you know when new ones come in!
        </h3>
      )}
    </div>
  );
};

export default BookingList;
