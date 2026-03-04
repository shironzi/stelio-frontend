import { useCallback, useEffect, useState } from "react";
import {
  getMyBookings,
  cancelBooking,
  payBooking,
} from "../../utils/bookProperty";
import type { Booking } from "./BookingTypes";
import MyBookingCard from "../../components/booking/MyBookingCard";
import "../../styles/mybookings/myBookings.css";
import PaymentModal from "../../components/modals/PaymentModal";
import ToastNotif from "../../components/modals/ToastNotif";

const MyBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [notification, setNotification] = useState<{
    show: Boolean;
    message: string;
  }>({ show: false, message: "" });
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>();

  const handleCancelBooking = async (bookingId: String) => {
    const res = await cancelBooking(bookingId);

    if (res.success) {
      fetchBookings();
      setNotification({ show: true, message: res.message });
    }
  };

  const handlePaymentBooking = async (bookingId: string, amount: number) => {
    const res = await payBooking(bookingId, amount);

    if (res.success) {
      setShowPaymentModal(false);
      setNotification({ show: true, message: res.message });
    }
  };

  const fetchBookings = async () => {
    const res = await getMyBookings();

    if (res.success) {
      setBookings(res.bookings);
    }
  };

  const handlePaymentModal = (booking: Booking) => {
    if (showPaymentModal) {
      setSelectedBooking(null);
    } else {
      setSelectedBooking(booking);
    }

    setShowPaymentModal(!showPaymentModal);
  };

  const handleCoupon = useCallback(
    () => (coupon: string) => {
      if (!selectedBooking) return;

      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === selectedBooking.id ? { ...booking, coupon } : booking,
        ),
      );
    },
    [],
  );

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="mybookings">
      {notification.show && (
        <ToastNotif
          message={notification.message}
          onClose={() => setNotification({ show: false, message: "" })}
        />
      )}
      {bookings && bookings.length > 0 ? (
        bookings.map((book) => (
          <MyBookingCard
            booking={book}
            action={{
              cancel: () => {
                handleCancelBooking(book.id);
              },
              paymentModal: () => {
                handlePaymentModal(book);
              },
            }}
            key={book.id}
          />
        ))
      ) : (
        <h1>No Bookings</h1>
      )}

      {showPaymentModal && selectedBooking && (
        <PaymentModal
          booking={selectedBooking}
          action={{
            payment: handlePaymentBooking,
            coupon: handleCoupon(),
            onClose: () => setShowPaymentModal(!showPaymentModal),
          }}
        />
      )}
    </div>
  );
};

export default MyBookings;
