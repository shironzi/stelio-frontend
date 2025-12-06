import "@/styles/booking/bookingDashboard.css";

const BookingDashboard = () => {
  return (
    <div className="BookingDashboard-container">
      <div className="bookingDashboard-greetings">
        <h2>👋 Welcome back, Aaron</h2>
        <h2>Here’s today’s snapshot of your property performance.</h2>
      </div>

      <h2>📊 Key Metrics</h2>
      <div className="bookingDashboard-metrics">
        <div>
          <h5>💰 Earnings Today </h5>
          <h5>₱1,250</h5>
        </div>
        <div>
          <h5>📅 Upcoming Check-ins</h5>
          <h5>2 arriving today</h5>
        </div>
        <div>
          <h5>⭐ Pending Reviews</h5>
          <h5>3 awaiting reply</h5>
        </div>
      </div>

      <h2>📈 Analytics Overview</h2>
      <div className="bookingDashboard-analytics ">
        <div>
          <h5>Monthly Earnings: ₱42,350</h5>
          <h5>Occupancy Rate: 78%</h5>
        </div>

        <h4>Earnings (Last 30 Days)</h4>
        {/* Line Graph */}
      </div>

      <h2>🛏 Booking Status Summary</h2>
      <div className="bookingDashboard-status-summary ">
        <h5>Pending: 4</h5>
        <h5>Approved: 12</h5>
        <h5>Declined: 2</h5>
        <h5>Cancelled: 1</h5>
      </div>

      <h2>📅 Upcoming Bookings</h2>
      <div className="dashboard-card">
        <h5> Jan 12 — Maria Santos — CHECK-IN TODAY — 2 nights </h5>
      </div>

      <h2>👥 Recent Guests</h2>
      <div className="dashboard-card">
        <h5>John Cruz — Completed — ★★★★★</h5>
      </div>
    </div>
  );
};

export default BookingDashboard;
