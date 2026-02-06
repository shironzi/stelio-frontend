import { useEffect, useState } from "react";
import { getMyBookings } from "../../utils/bookProperty";
import type { Booking } from "./BookingTypes";

const MyBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

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
    <div>
      {bookings && bookings.length > 0 ? (
        bookings.map((book) => (
          <div key={book.id}>
            <h1>{book.address}</h1>
          </div>
        ))
      ) : (
        <h1>No Bookings</h1>
      )}
    </div>
  );
};

export default MyBookings;
