import { useEffect, useState } from "react";
import { getMyBookings, cancelBooking } from "../../utils/bookProperty";
import type { Booking } from "./BookingTypes";
import MyBookingCard from "../../components/booking/MyBookingCard";
import "../../styles/mybookings/myBookings.css";

const MyBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const handleCancelBooking = async (bookingId: String) => {
    const res = await cancelBooking(bookingId);

    if (res.success) {
      fetchBookings();
    }
  };

  const handlePaymentBooking = async () => {
    console.log("payment");
  };

  const fetchBookings = async () => {
    const res = await getMyBookings();

    if (res.success) {
      setBookings(res.bookings);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="mybookings">
      {bookings && bookings.length > 0 ? (
        bookings.map((book) => (
          <MyBookingCard
            booking={book}
            action={{
              cancel: () => {
                handleCancelBooking(book.id);
              },
              payment: handlePaymentBooking,
            }}
            key={book.id}
          />
        ))
      ) : (
        <h1>No Bookings</h1>
      )}
    </div>
  );
};

export default MyBookings;
