import "@/styles/booking/bookingList.css";
import { BookingStatus, type BookingListCard } from "../../types/booking";
import { formatDateMDY, formatDateYear } from "../../utils/DateFormat";
import type { ReactElement } from "react";

interface BookingCardProps {
  bookingInfo: BookingListCard;
  actions: {
    update: (bookingId: string, status: BookingStatus) => void;
  };
}

const BookingCard = ({ bookingInfo, actions }: BookingCardProps) => {
  const nightLabel = bookingInfo.totalNights === 1 ? "night" : "nights";

  const formatPricePHP = (price: number): string =>
    new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(price);

  const statusButtonMap: Record<string, ReactElement | null> = {
    PENDING: (
      <>
        <button
          className="btn-success"
          onClick={() => actions.update(bookingInfo.id, BookingStatus.APPROVED)}
        >
          Approve
        </button>
        <button
          className="btn-danger"
          onClick={() => actions.update(bookingInfo.id, BookingStatus.REJECTED)}
        >
          Decline
        </button>
      </>
    ),
    APPROVED: <button className="btn-success">APPROVED</button>,
    COMPLETED: <button className="btn-success">COMPLETED</button>,
    REJECTED: <button className="btn-rejected">REJECTED</button>,
    NOSHOW: <button className="btn-rejected">NOSHOW</button>,
  };

  return (
    <div className="bookingCard">
      <div className="bookingCard-info">
        <h5>🏠 {bookingInfo.title}</h5>

        <div>
          <h5>renter: {bookingInfo.renterName}</h5>
          <h5>Total Guest: {bookingInfo.totalGuest}</h5>
        </div>

        <div>
          <h5>
            duration: {bookingInfo.totalNights} {nightLabel} •{" "}
            {formatDateMDY(bookingInfo.startDateTime)} -{" "}
            {formatDateMDY(bookingInfo.endDateTime)}{" "}
            {formatDateYear(bookingInfo.endDateTime)}
          </h5>
          <h5>Type: Request to Book </h5>
        </div>

        <div>
          <h5>Payment: {bookingInfo.paymentStatus}</h5>
          <h5>Status: {bookingInfo.status}</h5>
        </div>
        <h5>Total: {formatPricePHP(bookingInfo.totalPrice)}</h5>
        <h5>⭐ Special Requests (1) </h5>
      </div>

      <div className="bookingCard-actions">
        <button className="btn-outline">Message Guest</button>
        <button className="btn-outline">View Details</button>
        {statusButtonMap[bookingInfo.status]}
      </div>
    </div>
  );
};

export default BookingCard;
