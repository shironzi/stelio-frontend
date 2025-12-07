import "@/styles/booking/bookingMessage.css";
import BookingMessageUserCard from "./BookingMessageUserCard.tsx";

export default function BookingMessages() {
  return (
    <div>
      <div className="booking-message-card-container">
        <BookingMessageUserCard />
        <BookingMessageUserCard />
        <BookingMessageUserCard />
      </div>
    </div>
  );
}
