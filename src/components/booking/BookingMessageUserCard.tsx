import "@/styles/booking/bookingMessage.css";

export default function BookingMessageUserCard() {
  return (
    <div className="booking-message-card">
      <img
        className="booking-message-card-img"
        src={
          "https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
        }
      />
      <div>
        <div className="booking-message-card-header">
          <h4>Aaron Josh</h4>
          <h4>Yesterday</h4>
        </div>
        <p>message preview</p>
      </div>
    </div>
  );
}
