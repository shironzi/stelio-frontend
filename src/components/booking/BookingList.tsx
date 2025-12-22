import { useEffect, useState } from "react";
import BookingCard from "./BookingCard";
import "@/styles/booking/bookingList.css";
import {
  statusMessageMap,
  type BookingListCard,
  type BookingListFilter,
  type BookingStatus,
} from "../../types/booking";
import { useParams } from "react-router-dom";
import {
  getBookingsByPropertyId,
  updateBookingStatus,
} from "../../utils/bookProperty";
import ConfirmationPopUp from "../common/ConfirmationPopUp";
import BookingListNav from "./BookingListNav";

const BookingList = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState<boolean>(true);
  const [bookings, setBookings] = useState<BookingListCard[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null
  );
  const [status, SetStatus] = useState<BookingStatus | null>(null);
  const [filter, setFilter] = useState<BookingListFilter>("ALL");

  const filteredBookings =
    filter === "ALL" ? bookings : bookings.filter((b) => b.status === filter);

  const handleBookingStatus = async () => {
    if (!selectedBookingId || !status) return;

    const res = await updateBookingStatus(selectedBookingId, status);

    if (res.success) {
      setBookings((prev) =>
        prev.map((bookingInfo) =>
          bookingInfo.id === selectedBookingId
            ? { ...bookingInfo, status }
            : bookingInfo
        )
      );
    }

    setIsPopupOpen(false);
  };

  useEffect(() => {
    const fetchBookings = async () => {
      if (!id) return;

      const res = await getBookingsByPropertyId(id);

      if (res.success) {
        setBookings(res.bookings);
      }

      setLoading(false);
    };

    fetchBookings();
  }, [id]);

  return (
    <div>
      <h2>Bookings</h2>

      {/* Confirmation Modal */}
      <ConfirmationPopUp
        isOpen={isPopupOpen}
        message={status ? statusMessageMap[status] : ""}
        onConfirm={handleBookingStatus}
        onCancel={() => setIsPopupOpen(!isPopupOpen)}
      />

      {/* Booking Filters */}
      <BookingListNav update={setFilter} filter={filter} />

      {/* List of Bookings with bookingCard */}
      {loading ? (
        <div>
          <h1>Loading....</h1>
        </div>
      ) : bookings?.length ? (
        filteredBookings.map((bookingInfo) => (
          <BookingCard
            key={bookingInfo.id}
            bookingInfo={bookingInfo}
            actions={{
              update: (bookingId, status) => {
                setIsPopupOpen(true);
                setSelectedBookingId(bookingId);
                SetStatus(status);
              },
            }}
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
