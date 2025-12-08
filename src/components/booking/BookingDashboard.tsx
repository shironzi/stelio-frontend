import "@/styles/booking/bookingDashboard.css";
import { useEffect, useState } from "react";
import { defaultPropertyStats, type PropertyStats } from "../../types/booking";
import { useParams } from "react-router-dom";
import { fetchPropertyStats } from "../../utils/propertyStats";

const BookingDashboard = () => {
  const { id } = useParams();

  const [stats, setStats] = useState<PropertyStats>(defaultPropertyStats);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetch = async () => {
      const res = await fetchPropertyStats(id);

      if (res.success) {
        setStats(res.stats);
      }
      setLoading(false);
    };

    fetch();
  }, []);

  if (loading) {
    return (
      <div>
        <h1>Loading......</h1>
      </div>
    );
  }

  return (
    <div className="BookingDashboard-container">
      <div className="bookingDashboard-greetings">
        <h2>👋 Welcome back, {stats.name}</h2>
        <h2>Here’s today’s snapshot of your property performance.</h2>
      </div>

      <h2>📊 Key Metrics</h2>
      <div className="bookingDashboard-metrics">
        <div>
          <h5>💰 Earnings Today </h5>
          <h5>₱ {Number(stats.earningsToday)}</h5>
        </div>
        <div>
          <h5>📅 Upcoming Check-ins</h5>
          <h5>{Number(stats.upcomingBookings)} arriving today</h5>
        </div>
        <div>
          <h5>⭐ Pending Reviews</h5>
          <h5>{Number(stats.pendingReviews)} awaiting reply</h5>
        </div>
      </div>

      <h2>📈 Analytics Overview</h2>
      <div className="bookingDashboard-analytics ">
        <div>
          <h5>Monthly Earnings: ₱{Number(stats.monthlyEarnings)}</h5>
          <h5>Occupancy Rate: {Number(stats.occupancyRate)}%</h5>
        </div>

        <h4>Earnings (Last 30 Days)</h4>
        {/* Line Graph */}
      </div>

      <h2>🛏 Booking Status Summary</h2>
      <div className="bookingDashboard-status-summary ">
        <h5>Pending: {Number(stats.pending)}</h5>
        <h5>Approved: {Number(stats.approved)}</h5>
        <h5>Declined: {Number(stats.declined)}</h5>
        <h5>Cancelled: {Number(stats.cancelled)}</h5>
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
